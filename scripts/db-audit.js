// Audita la integridad de database/*.json (no necesita MongoDB ni modifica nada).
// Uso: node scripts/db-audit.js        Sale con codigo 1 si encuentra problemas.
const { EJSON } = require('bson');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'database');
const load = (name) => EJSON.parse(fs.readFileSync(path.join(DIR, name + '.json'), 'utf8'));
const NAMES = ['users', 'programs', 'subjects', 'periods', 'students', 'teachers', 'faculties', 'classrooms', 'groups', 'enrollments', 'evaluations', 'grades', 'notifications'];
const db = Object.fromEntries(NAMES.map((n) => [n, load(n)]));
const byId = Object.fromEntries(NAMES.map((n) => [n, new Map(db[n].map((d) => [String(d._id), d]))]));

const issues = [];
const report = (collection, doc, rule, detail) => issues.push({ collection, id: String(doc?._id ?? '-'), rule, detail });
const isNum = (x) => typeof x === 'number' && Number.isFinite(x);
const isDate = (x) => x instanceof Date && !Number.isNaN(x.getTime());
const isOid = (x) => x && x._bsontype === 'ObjectId';
const round = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
const overlap = (a, b) => a.day === b.day && a.startTime < b.endTime && b.startTime < a.endTime;
const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/;
const EMAIL = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

/* ---------- reglas genericas: _id, timestamps, campos desconocidos, unicos y referencias ---------- */
const FIELDS = {
  users: ['name', 'email', 'passwordHash', 'role', 'active', 'passwordChangedAt'],
  programs: ['code', 'name', 'totalCredits', 'faculty', 'active'],
  subjects: ['code', 'name', 'credits', 'program', 'semester', 'prerequisites', 'active'],
  periods: ['code', 'startDate', 'endDate', 'status'],
  students: ['user', 'code', 'program', 'active'],
  teachers: ['user', 'code', 'faculty', 'active'],
  faculties: ['code', 'name', 'campus', 'dean', 'email', 'active'],
  classrooms: ['code', 'building', 'floor', 'capacity', 'type', 'hasProjector', 'active'],
  groups: ['subject', 'teacher', 'period', 'number', 'capacity', 'enrolled', 'schedule', 'active'],
  enrollments: ['student', 'group', 'subject', 'period', 'status', 'finalGrade'],
  evaluations: ['group', 'name', 'weight'],
  grades: ['enrollment', 'evaluation', 'value'],
  notifications: ['user', 'type', 'title', 'message', 'read', 'readAt', 'relatedModel', 'relatedId'],
};
const OPTIONAL = { users: ['passwordChangedAt'], programs: ['faculty'], subjects: ['semester'], faculties: ['dean', 'email'], enrollments: ['finalGrade'], notifications: ['readAt', 'relatedModel', 'relatedId'] };
const UNIQUE = {
  users: [['email']], programs: [['code']], subjects: [['code']], periods: [['code']], students: [['user'], ['code']], teachers: [['user'], ['code']],
  faculties: [['code']], classrooms: [['code']], groups: [['subject', 'period', 'number']], enrollments: [['student', 'group']],
  evaluations: [['group', 'name']], grades: [['enrollment', 'evaluation']],
};
const REFS = {
  programs: { faculty: 'faculties' }, subjects: { program: 'programs' }, students: { user: 'users', program: 'programs' },
  teachers: { user: 'users', faculty: 'faculties' }, faculties: { dean: 'teachers' },
  groups: { subject: 'subjects', teacher: 'teachers', period: 'periods' },
  enrollments: { student: 'students', group: 'groups', subject: 'subjects', period: 'periods' },
  evaluations: { group: 'groups' }, grades: { enrollment: 'enrollments', evaluation: 'evaluations' }, notifications: { user: 'users' },
};
const STRINGS = { users: ['name', 'email'], programs: ['code', 'name'], subjects: ['code', 'name'], periods: ['code'], students: ['code'], teachers: ['code'], faculties: ['code', 'name', 'campus'], classrooms: ['code', 'building'], evaluations: ['name'], notifications: ['title', 'message'] };
const BOOLS = { users: ['active'], programs: ['active'], subjects: ['active'], students: ['active'], teachers: ['active'], faculties: ['active'], classrooms: ['active', 'hasProjector'], groups: ['active'], notifications: ['read'] };

for (const name of NAMES) {
  const seenIds = new Set();
  for (const d of db[name]) {
    if (!isOid(d._id)) report(name, d, '_id', '_id no es ObjectId');
    if (seenIds.has(String(d._id))) report(name, d, '_id duplicado', '');
    seenIds.add(String(d._id));
    if (!isDate(d.createdAt) || !isDate(d.updatedAt)) report(name, d, 'timestamps', `createdAt=${d.createdAt} updatedAt=${d.updatedAt}`);
    const known = new Set([...FIELDS[name], '_id', 'createdAt', 'updatedAt', '__v']);
    for (const k of Object.keys(d)) if (!known.has(k)) report(name, d, 'campo desconocido', k);
    for (const k of FIELDS[name]) if ((d[k] === undefined || d[k] === null) && !(OPTIONAL[name] ?? []).includes(k)) report(name, d, 'campo requerido ausente', k);
    for (const k of STRINGS[name] ?? []) {
      if (typeof d[k] !== 'string') { if (d[k] !== undefined) report(name, d, 'tipo', `${k} deberia ser texto: ${JSON.stringify(d[k])}`); continue; }
      if (d[k].trim() === '') report(name, d, 'texto vacio', k);
      else if (d[k] !== d[k].trim()) report(name, d, 'espacios sobrantes', `${k}=${JSON.stringify(d[k])}`);
    }
    for (const k of BOOLS[name] ?? []) if (d[k] !== undefined && typeof d[k] !== 'boolean') report(name, d, 'tipo', `${k} deberia ser booleano: ${JSON.stringify(d[k])}`);
    for (const [field, target] of Object.entries(REFS[name] ?? {})) {
      if (d[field] === undefined || d[field] === null) continue;
      if (!isOid(d[field])) report(name, d, 'tipo', `${field} no es ObjectId: ${JSON.stringify(d[field])}`);
      else if (!byId[target].has(String(d[field]))) report(name, d, 'referencia rota', `${field} -> ${target} ${d[field]}`);
    }
  }
  for (const keys of UNIQUE[name] ?? []) {
    const seen = new Map();
    for (const d of db[name]) {
      const key = keys.map((k) => String(d[k]).toLowerCase()).join('|');
      if (seen.has(key)) report(name, d, 'indice unico violado', `${keys.join('+')}=${key} (igual que ${seen.get(key)})`);
      else seen.set(key, String(d._id));
    }
  }
}

const get = (col, id) => byId[col].get(String(id));

/* ---------- usuarios ---------- */
const ROLES = ['admin', 'docente', 'estudiante'];
for (const u of db.users) {
  if (!ROLES.includes(u.role)) report('users', u, 'enum', `role=${u.role}`);
  if (typeof u.email === 'string' && (u.email !== u.email.toLowerCase() || !EMAIL.test(u.email))) report('users', u, 'email invalido', u.email);
  if (typeof u.passwordHash !== 'string' || !/^\$2[aby]\$\d\d\$.{53}$/.test(u.passwordHash)) report('users', u, 'passwordHash invalido', String(u.passwordHash).slice(0, 12));
  else if (!bcrypt.compareSync('Secret123!', u.passwordHash)) report('users', u, 'clave distinta a la documentada', u.email);
}
const admins = db.users.filter((u) => u.role === 'admin');
if (admins.length !== 1) report('users', admins[1] ?? null, 'cantidad de admins', String(admins.length));
const profileOf = new Map();
for (const [col, role] of [['students', 'estudiante'], ['teachers', 'docente']]) {
  for (const p of db[col]) {
    const u = get('users', p.user);
    if (!u) continue;
    if (u.role !== role) report(col, p, 'rol del usuario', `usuario ${u.email} tiene rol ${u.role}`);
    if (u.active !== p.active) report(col, p, 'active distinto al del usuario', `perfil=${p.active} usuario=${u.active} (${u.email})`);
    if (profileOf.has(String(p.user))) report(col, p, 'usuario con dos perfiles', u.email);
    profileOf.set(String(p.user), col);
  }
}
for (const u of db.users) if (u.role !== 'admin' && ROLES.includes(u.role) && !profileOf.has(String(u._id))) report('users', u, 'usuario sin perfil', `${u.role} ${u.email}`);
for (const s of db.students) if (typeof s.code === 'string' && !/^(E(2019|202[0-6])\d{4}|\d{7})$/.test(s.code)) report('students', s, 'formato de codigo', s.code);
for (const t of db.teachers) if (typeof t.code === 'string' && !/^DOC-\d{3}$/.test(t.code)) report('teachers', t, 'formato de codigo', t.code);

/* ---------- programas, facultades, materias ---------- */
for (const p of db.programs) {
  if (typeof p.code === 'string' && p.code !== p.code.toUpperCase()) report('programs', p, 'codigo no esta en mayusculas', p.code);
  if (!isNum(p.totalCredits) || p.totalCredits < 1 || !Number.isInteger(p.totalCredits)) report('programs', p, 'rango', `totalCredits=${JSON.stringify(p.totalCredits)}`);
  if (!p.faculty) report('programs', p, 'programa sin facultad', p.code);
}
for (const f of db.faculties) {
  if (typeof f.code === 'string' && !/^FAC-[A-Z]{3}$/.test(f.code)) report('faculties', f, 'formato de codigo', f.code);
  if (f.email !== undefined && (typeof f.email !== 'string' || !EMAIL.test(f.email))) report('faculties', f, 'email invalido', String(f.email));
  const dean = f.dean && get('teachers', f.dean);
  if (!f.dean) report('faculties', f, 'facultad sin decano', f.code);
  if (dean && String(dean.faculty) !== String(f._id)) report('faculties', f, 'decano de otra facultad', `${dean.code}`);
  if (dean && !dean.active) report('faculties', f, 'decano inactivo', dean.code);
}
const deans = new Map();
for (const f of db.faculties) { if (f.dean) { if (deans.has(String(f.dean))) report('faculties', f, 'decano repetido', `${f.code} y ${deans.get(String(f.dean))}`); deans.set(String(f.dean), f.code); } }
for (const s of db.subjects) {
  if (typeof s.code === 'string' && s.code !== s.code.toUpperCase()) report('subjects', s, 'codigo no esta en mayusculas', s.code);
  if (!isNum(s.credits) || s.credits < 1 || s.credits > 10 || !Number.isInteger(s.credits)) report('subjects', s, 'rango', `credits=${JSON.stringify(s.credits)}`);
  if (s.semester !== undefined && (!isNum(s.semester) || s.semester < 1 || s.semester > 12 || !Number.isInteger(s.semester))) report('subjects', s, 'rango', `semester=${JSON.stringify(s.semester)}`);
  if (!Array.isArray(s.prerequisites)) { report('subjects', s, 'tipo', 'prerequisites no es arreglo'); continue; }
  const seen = new Set();
  for (const pre of s.prerequisites) {
    const p = get('subjects', pre);
    if (String(pre) === String(s._id)) report('subjects', s, 'prerrequisito de si misma', s.code);
    else if (!p) report('subjects', s, 'referencia rota', `prerequisites -> subjects ${pre}`);
    else {
      if (String(p.program) !== String(s.program)) report('subjects', s, 'prerrequisito de otro programa', `${s.code} requiere ${p.code}`);
      if (isNum(p.semester) && isNum(s.semester) && p.semester >= s.semester) report('subjects', s, 'prerrequisito de semestre igual o posterior', `${s.code} (sem ${s.semester}) requiere ${p.code} (sem ${p.semester})`);
    }
    if (seen.has(String(pre))) report('subjects', s, 'prerrequisito repetido', String(pre));
    seen.add(String(pre));
  }
  const prog = get('programs', s.program);
  if (prog && s.active && !prog.active) report('subjects', s, 'materia activa en programa inactivo', `${s.code} / ${prog.code}`);
}
// ciclos de prerrequisitos
const reaches = (from, target, seen = new Set()) => {
  for (const pre of get('subjects', from)?.prerequisites ?? []) {
    const k = String(pre);
    if (k === String(target)) return true;
    if (!seen.has(k)) { seen.add(k); if (reaches(k, target, seen)) return true; }
  }
  return false;
};
for (const s of db.subjects) if (Array.isArray(s.prerequisites) && reaches(s._id, s._id)) report('subjects', s, 'ciclo de prerrequisitos', s.code);
for (const s of db.students) { const p = get('programs', s.program); if (p && s.active && !p.active) report('students', s, 'estudiante activo en programa inactivo', `${s.code} / ${p.code}`); }

/* ---------- periodos ---------- */
const PERIOD_STATUS = ['planificado', 'abierto', 'cerrado'];
for (const p of db.periods) {
  if (!PERIOD_STATUS.includes(p.status)) report('periods', p, 'enum', `status=${p.status}`);
  const m = typeof p.code === 'string' && /^(\d{4})-([12])$/.exec(p.code);
  if (!m) { report('periods', p, 'formato de codigo', String(p.code)); continue; }
  if (!isDate(p.startDate) || !isDate(p.endDate)) { report('periods', p, 'tipo', `fechas: ${p.startDate} / ${p.endDate}`); continue; }
  if (p.startDate >= p.endDate) report('periods', p, 'fechas invertidas', `${p.code}: ${p.startDate.toISOString().slice(0, 10)} .. ${p.endDate.toISOString().slice(0, 10)}`);
  const year = Number(m[1]);
  const expStart = m[2] === '1' ? Date.UTC(year, 1, 2) : Date.UTC(year, 7, 3);
  const expEnd = m[2] === '1' ? Date.UTC(year, 5, 20) : Date.UTC(year, 11, 12);
  if (p.startDate.getTime() !== expStart || p.endDate.getTime() !== expEnd) report('periods', p, 'fechas no corresponden al codigo', `${p.code}: ${p.startDate.toISOString().slice(0, 10)} .. ${p.endDate.toISOString().slice(0, 10)}`);
}
const open = db.periods.filter((p) => p.status === 'abierto');
if (open.length !== 1) open.forEach((p) => report('periods', p, 'mas de un periodo abierto (o ninguno)', `${p.code} (total abiertos: ${open.length})`));
const openStart = open.length ? Math.min(...open.map((p) => +p.startDate || Infinity)) : null;
for (const p of db.periods) {
  if (!isDate(p.startDate) || !openStart || p.status === 'abierto') continue;
  if (p.status === 'cerrado' && +p.startDate > openStart) report('periods', p, 'periodo futuro cerrado', p.code);
  if (p.status === 'planificado' && +p.startDate < openStart) report('periods', p, 'periodo pasado planificado', p.code);
}

/* ---------- salones ---------- */
const ROOM_TYPES = ['aula', 'laboratorio', 'auditorio', 'sala de computo'];
for (const c of db.classrooms) {
  if (!ROOM_TYPES.includes(c.type)) report('classrooms', c, 'enum', `type=${c.type}`);
  if (!isNum(c.floor) || c.floor < 1 || c.floor > 30) report('classrooms', c, 'rango', `floor=${JSON.stringify(c.floor)}`);
  if (!isNum(c.capacity) || c.capacity < 5 || c.capacity > 500) report('classrooms', c, 'rango', `capacity=${JSON.stringify(c.capacity)}`);
  const m = typeof c.code === 'string' && /^([A-Z])-(\d)(\d\d)$/.exec(c.code);
  if (!m) report('classrooms', c, 'formato de codigo', String(c.code));
  else if (m[1] !== c.building || Number(m[2]) !== c.floor) report('classrooms', c, 'codigo no coincide con edificio/piso', `${c.code} building=${c.building} floor=${c.floor}`);
}

/* ---------- grupos ---------- */
const DAYS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const seats = new Map();
for (const e of db.enrollments) if (e.status !== 'cancelada') seats.set(String(e.group), (seats.get(String(e.group)) ?? 0) + 1);
for (const g of db.groups) {
  if (!isNum(g.number) || g.number < 1 || !Number.isInteger(g.number)) report('groups', g, 'rango', `number=${JSON.stringify(g.number)}`);
  if (!isNum(g.capacity) || g.capacity < 1 || g.capacity > 100) report('groups', g, 'rango', `capacity=${JSON.stringify(g.capacity)}`);
  if (!isNum(g.enrolled) || g.enrolled < 0) report('groups', g, 'rango', `enrolled=${JSON.stringify(g.enrolled)}`);
  else {
    if (isNum(g.capacity) && g.enrolled > g.capacity) report('groups', g, 'sobrecupo', `enrolled=${g.enrolled} capacity=${g.capacity}`);
    const real = seats.get(String(g._id)) ?? 0;
    if (g.enrolled !== real) report('groups', g, 'contador enrolled inconsistente', `enrolled=${g.enrolled}, matriculas no canceladas=${real}`);
  }
  const teacher = get('teachers', g.teacher);
  if (teacher && !teacher.active && g.active) report('groups', g, 'docente inactivo', teacher.code);
  const subject = get('subjects', g.subject);
  if (subject && !subject.active && g.active) report('groups', g, 'materia inactiva', subject.code);
  if (!Array.isArray(g.schedule)) { report('groups', g, 'tipo', 'schedule no es arreglo'); continue; }
  if (g.schedule.length === 0) report('groups', g, 'grupo sin horario', '');
  g.schedule.forEach((s, i) => {
    if (!DAYS.includes(s.day)) report('groups', g, 'enum', `schedule[${i}].day=${s.day}`);
    if (!HHMM.test(String(s.startTime)) || !HHMM.test(String(s.endTime))) report('groups', g, 'formato de hora', `schedule[${i}] ${s.startTime}-${s.endTime}`);
    else if (s.startTime >= s.endTime) report('groups', g, 'hora de inicio no es anterior a la de fin', `schedule[${i}] ${s.startTime}-${s.endTime}`);
    const room = isOid(s.classroom) ? get('classrooms', s.classroom) : null;
    if (!isOid(s.classroom)) report('groups', g, 'tipo', `schedule[${i}].classroom no es ObjectId: ${JSON.stringify(s.classroom)}`);
    else if (!room) report('groups', g, 'referencia rota', `schedule[${i}].classroom -> classrooms ${s.classroom}`);
    else {
      if (!room.active) report('groups', g, 'salon inactivo', room.code);
      if (isNum(g.capacity) && room.capacity < g.capacity) report('groups', g, 'cupo mayor que el salon', `capacity=${g.capacity} salon ${room.code}=${room.capacity}`);
    }
    for (let j = 0; j < i; j++) if (overlap(s, g.schedule[j])) report('groups', g, 'franjas del mismo grupo se solapan', `schedule[${j}] y schedule[${i}]`);
  });
}
for (let i = 0; i < db.groups.length; i++) {
  for (let j = 0; j < i; j++) {
    const a = db.groups[i], b = db.groups[j];
    if (String(a.period) !== String(b.period) || !Array.isArray(a.schedule) || !Array.isArray(b.schedule)) continue;
    for (const x of a.schedule) for (const y of b.schedule) {
      if (!overlap(x, y)) continue;
      if (String(a.teacher) === String(b.teacher)) report('groups', a, 'cruce de horario del docente', `con grupo ${b._id} (${x.day} ${x.startTime})`);
      if (String(x.classroom) === String(y.classroom)) report('groups', a, 'cruce de horario del salon', `con grupo ${b._id} (${x.day} ${x.startTime})`);
    }
  }
}
// numeracion de grupos por (materia, periodo): 1..n sin huecos
const numbers = new Map();
for (const g of db.groups) { const k = `${g.subject}|${g.period}`; numbers.set(k, [...(numbers.get(k) ?? []), g]); }
for (const list of numbers.values()) {
  const sorted = list.map((g) => g.number).sort((a, b) => a - b);
  if (sorted.some((n, i) => n !== i + 1)) report('groups', list[0], 'numeracion de grupos con huecos', `numeros=${sorted.join(',')}`);
}

/* ---------- evaluaciones ---------- */
const evalsByGroup = new Map();
for (const ev of db.evaluations) {
  if (!isNum(ev.weight) || ev.weight < 1 || ev.weight > 100) report('evaluations', ev, 'rango', `weight=${JSON.stringify(ev.weight)}`);
  evalsByGroup.set(String(ev.group), [...(evalsByGroup.get(String(ev.group)) ?? []), ev]);
}
for (const [groupId, list] of evalsByGroup) {
  const sum = list.reduce((s, e) => s + (isNum(e.weight) ? e.weight : 0), 0);
  if (sum !== 100) report('evaluations', list[0], 'porcentajes del grupo no suman 100', `grupo ${groupId}: ${list.map((e) => `${e.name}=${e.weight}`).join(', ')} (suma ${sum})`);
}

/* ---------- matriculas ---------- */
const ENR_STATUS = ['activa', 'cancelada', 'aprobada', 'reprobada'];
const gradesByEnr = new Map();
for (const g of db.grades) gradesByEnr.set(String(g.enrollment), [...(gradesByEnr.get(String(g.enrollment)) ?? []), g]);
for (const e of db.enrollments) {
  if (!ENR_STATUS.includes(e.status)) report('enrollments', e, 'enum', `status=${e.status}`);
  const group = get('groups', e.group), period = get('periods', e.period), student = get('students', e.student);
  if (group && String(group.subject) !== String(e.subject)) report('enrollments', e, 'materia distinta a la del grupo', `enrollment.subject=${e.subject} group.subject=${group.subject}`);
  if (group && String(group.period) !== String(e.period)) report('enrollments', e, 'periodo distinto al del grupo', `enrollment.period=${e.period} group.period=${group.period}`);
  if (e.finalGrade !== undefined && (!isNum(e.finalGrade) || e.finalGrade < 0 || e.finalGrade > 5)) report('enrollments', e, 'rango', `finalGrade=${JSON.stringify(e.finalGrade)}`);
  const hasFinal = e.finalGrade !== undefined && e.finalGrade !== null;
  if (['aprobada', 'reprobada'].includes(e.status) && !hasFinal) report('enrollments', e, 'matricula finalizada sin nota final', e.status);
  if (['activa', 'cancelada'].includes(e.status) && hasFinal) report('enrollments', e, 'nota final en matricula no finalizada', `${e.status} finalGrade=${e.finalGrade}`);
  if (isNum(e.finalGrade)) {
    if (e.status === 'aprobada' && e.finalGrade < 3) report('enrollments', e, 'aprobada con nota menor a 3.0', `finalGrade=${e.finalGrade}`);
    if (e.status === 'reprobada' && e.finalGrade >= 3) report('enrollments', e, 'reprobada con nota mayor o igual a 3.0', `finalGrade=${e.finalGrade}`);
  }
  if (period) {
    if (period.status === 'cerrado' && e.status === 'activa') report('enrollments', e, 'matricula activa en periodo cerrado', period.code);
    if (period.status !== 'cerrado' && ['aprobada', 'reprobada'].includes(e.status)) report('enrollments', e, 'matricula finalizada en periodo no cerrado', `${period.code} ${e.status}`);
    if (period.status === 'planificado') report('enrollments', e, 'matricula en periodo planificado', period.code);
    if (isDate(e.createdAt) && isDate(period.startDate) && e.createdAt >= period.startDate) report('enrollments', e, 'matricula creada despues de iniciar el periodo', `${period.code} createdAt=${e.createdAt.toISOString().slice(0, 10)}`);
  }
  if (student && !student.active && e.status === 'activa') report('enrollments', e, 'matricula activa de estudiante inactivo', student.code);
  const list = gradesByEnr.get(String(e._id)) ?? [];
  if (e.status === 'cancelada' && list.length) report('enrollments', e, 'matricula cancelada con notas', `${list.length} notas`);
  if (['aprobada', 'reprobada'].includes(e.status) && isNum(e.finalGrade)) {
    const plan = evalsByGroup.get(String(e.group)) ?? [];
    const missing = plan.filter((ev) => !list.some((g) => String(g.evaluation) === String(ev._id)));
    if (missing.length) report('enrollments', e, 'matricula finalizada con evaluaciones sin nota', missing.map((m) => m.name).join(', '));
    else {
      const calc = round(list.reduce((s, g) => s + (isNum(g.value) ? g.value : 0) * ((get('evaluations', g.evaluation)?.weight ?? 0) / 100), 0), 2);
      if (Math.abs(calc - e.finalGrade) > 0.011) report('enrollments', e, 'nota final no coincide con las notas', `finalGrade=${e.finalGrade} calculada=${calc}`);
    }
  }
}
// por estudiante y periodo: materia repetida, limite de 20 creditos, cruce de horario; prerrequisitos aprobados antes
const live = db.enrollments.filter((e) => e.status !== 'cancelada');
const byStudentPeriod = new Map();
for (const e of live) { const k = `${e.student}|${e.period}`; byStudentPeriod.set(k, [...(byStudentPeriod.get(k) ?? []), e]); }
for (const list of byStudentPeriod.values()) {
  const credits = list.reduce((s, e) => s + (get('subjects', e.subject)?.credits ?? 0), 0);
  if (credits > 20) report('enrollments', list[0], 'mas de 20 creditos en un periodo', `${credits} creditos`);
  for (let i = 0; i < list.length; i++) for (let j = 0; j < i; j++) {
    if (String(list[i].subject) === String(list[j].subject)) report('enrollments', list[i], 'misma materia dos veces en el periodo', `con matricula ${list[j]._id}`);
    const a = get('groups', list[i].group), b = get('groups', list[j].group);
    if (a && b && Array.isArray(a.schedule) && Array.isArray(b.schedule) && a.schedule.some((x) => b.schedule.some((y) => overlap(x, y)))) report('enrollments', list[i], 'cruce de horario del estudiante', `con matricula ${list[j]._id}`);
  }
}
const startOf = (e) => +(get('periods', e.period)?.startDate ?? 0);
for (const e of live) {
  const subject = get('subjects', e.subject), student = get('students', e.student);
  if (!subject || !student || !Array.isArray(subject.prerequisites)) continue;
  const earlier = db.enrollments.filter((x) => String(x.student) === String(e.student) && startOf(x) < startOf(e));
  for (const pre of subject.prerequisites) if (!earlier.some((x) => x.status === 'aprobada' && String(x.subject) === String(pre))) report('enrollments', e, 'prerrequisito no aprobado', `${subject.code} requiere ${get('subjects', pre)?.code ?? pre}`);
  if (earlier.some((x) => x.status === 'aprobada' && String(x.subject) === String(e.subject))) report('enrollments', e, 'materia ya aprobada antes', subject.code);
}

/* ---------- notas ---------- */
for (const g of db.grades) {
  if (!isNum(g.value) || g.value < 0 || g.value > 5) report('grades', g, 'rango', `value=${JSON.stringify(g.value)}`);
  else if (round(g.value, 1) !== g.value) report('grades', g, 'nota con mas de un decimal', String(g.value));
  const enr = get('enrollments', g.enrollment), ev = get('evaluations', g.evaluation);
  if (enr && ev && String(enr.group) !== String(ev.group)) report('grades', g, 'evaluacion de otro grupo', `matricula del grupo ${enr.group}, evaluacion del grupo ${ev.group}`);
}

/* ---------- notificaciones ---------- */
const NOTIF_TYPES = ['matricula_confirmada', 'matricula_cancelada', 'nota_final', 'grupo_asignado', 'aviso'];
const MODELS = { Enrollment: 'enrollments', Group: 'groups' };
for (const n of db.notifications) {
  if (!NOTIF_TYPES.includes(n.type)) report('notifications', n, 'enum', `type=${n.type}`);
  if (n.read === true && !n.readAt) report('notifications', n, 'leida sin fecha de lectura', '');
  if (n.read === false && n.readAt) report('notifications', n, 'no leida con fecha de lectura', '');
  if (n.readAt !== undefined && n.readAt !== null && !isDate(n.readAt)) report('notifications', n, 'tipo', `readAt=${JSON.stringify(n.readAt)}`);
  else if (isDate(n.readAt) && isDate(n.createdAt) && n.readAt < n.createdAt) report('notifications', n, 'leida antes de ser creada', `createdAt=${n.createdAt.toISOString()} readAt=${n.readAt.toISOString()}`);
  if ((n.relatedModel === undefined) !== (n.relatedId === undefined)) report('notifications', n, 'relatedModel y relatedId deben ir juntos', `${n.relatedModel} / ${n.relatedId}`);
  if (n.relatedModel === undefined) continue;
  const col = MODELS[n.relatedModel];
  if (!col) { report('notifications', n, 'relatedModel desconocido', String(n.relatedModel)); continue; }
  const rel = get(col, n.relatedId);
  if (!rel) { report('notifications', n, 'referencia rota', `relatedId -> ${col} ${n.relatedId}`); continue; }
  const owner = col === 'enrollments' ? get('students', rel.student)?.user : get('teachers', rel.teacher)?.user;
  if (owner && String(owner) !== String(n.user)) report('notifications', n, 'notificacion de un documento ajeno', `${n.type}: usuario ${n.user}, dueno ${owner}`);
  const expected = { matricula_confirmada: 'Enrollment', matricula_cancelada: 'Enrollment', nota_final: 'Enrollment', grupo_asignado: 'Group' }[n.type];
  if (expected && expected !== n.relatedModel) report('notifications', n, 'tipo no corresponde al modelo relacionado', `${n.type} -> ${n.relatedModel}`);
  if (n.type === 'matricula_cancelada' && rel.status !== 'cancelada') report('notifications', n, 'aviso de cancelacion de matricula no cancelada', rel.status);
  if (n.type === 'matricula_confirmada' && rel.status === 'cancelada') report('notifications', n, 'aviso de confirmacion de matricula cancelada', '');
  if (n.type === 'nota_final' && isNum(rel.finalGrade) && !n.message.includes(rel.finalGrade.toFixed(1))) report('notifications', n, 'nota del mensaje distinta a la nota final', `finalGrade=${rel.finalGrade}: ${n.message}`);
}

/* ---------- salida ---------- */
console.log(NAMES.map((n) => `${n}=${db[n].length}`).join('  '));
if (issues.length === 0) { console.log('\nSin problemas de integridad.'); process.exit(0); }
const grouped = new Map();
for (const i of issues) { const k = `${i.collection} :: ${i.rule}`; grouped.set(k, [...(grouped.get(k) ?? []), i]); }
for (const [k, list] of grouped) {
  console.log(`\n[${list.length}] ${k}`);
  list.slice(0, 8).forEach((i) => console.log(`    ${i.id}  ${i.detail}`));
  if (list.length > 8) console.log(`    ... y ${list.length - 8} mas`);
}
console.log(`\n${issues.length} problemas en ${grouped.size} reglas.`);
process.exit(1);
