# Bitácora de bugs

Estados: corregido y verificado, corregido sin verificar, sospecha, pendiente.

| ID | Módulo | Problema | Estado | Commit |
|---|---|---|---|---|
| BE-25 | reports | ReportsService no registrado: la API no arranca | corregido y verificado | fix(BE-25) |
| BE-01 | main | Prefijo global api/v1 en vez de api | corregido y verificado | fix(BE-01) |
| BE-03 | main | Puerto leído de APP_PORT con default 3001 | corregido y verificado | fix(BE-03) |
| BE-06 | auth | RolesGuard no registrado: @Roles no se aplica | corregido y verificado | fix(BE-06) |
| BE-07 | auth | Token JWT vence en 3,6 s | corregido y verificado | fix(BE-07) |
| BE-08 | auth | Login exige password de 12+ caracteres | corregido y verificado | fix(BE-08) |
| BE-09 | auth | Login espera 5 s en cada intento | corregido y verificado | fix(BE-09) |
| BE-02 | main | Swagger publicado en /api/doc | corregido y verificado | fix(BE-02) |
| BE-04 | config | .env.example apunta Mongo al puerto 27018 | corregido y verificado | fix(BE-04) |
| BE-05 | config | JWT_SECRET vacío en .env.example | corregido y verificado | fix(BE-05) |
| BE-10 | users | POST /users responde 400 aunque crea el usuario | corregido y verificado | fix(BE-10) |
| BE-11 | users | GET /users/me capturado por GET /users/:id | corregido y verificado | fix(BE-11) |
| BE-12 | users | UpdateUserDto usa el campo namesssss | corregido y verificado | fix(BE-12) |
| BE-13 | users | Cambiar contraseña no guarda la nueva clave | corregido y verificado | fix(BE-13) |
| BE-14 | users | Búsqueda q de usuarios distingue mayúsculas | corregido y verificado | fix(BE-14) |
| BE-15 | users | Filtro active convierte cualquier texto en false | corregido y verificado | fix(BE-15) |
| BE-16 | groups | GET /groups/mine capturado por GET /groups/:id | corregido y verificado | fix(BE-16) |
| BE-17 | groups | assertCanManage no restringe a los docentes | corregido y verificado | fix(BE-17) |
| BE-18 | enrollments | GET /enrollments/mine solo para docentes | corregido y verificado | fix(BE-18) |
| BE-19 | enrollments | Matricular responde 400 aunque la matrícula queda activa | corregido y verificado | fix(BE-19) |
| BE-20 | enrollments | Cancelar matrícula no libera el cupo | corregido y verificado | fix(BE-20) |
| BE-21 | evaluations | Controlador montado en /evaluationslalala | corregido y verificado | fix(BE-21) |
| BE-22 | evaluations | POST /evaluations responde 400 aunque crea | corregido y verificado | fix(BE-22) |
| BE-23 | grades | Nota máxima validada en 4.5 (escala 0–5) | corregido y verificado | fix(BE-23) |
| BE-24 | grades | Nota final 3.0 queda reprobada | corregido y verificado | fix(BE-24) |
| BE-26 | notifications | Marcar como leída no cambia read | corregido y verificado | fix(BE-26) |
| BE-27 | postman | Postman crea/edita docentes con campo department inexistente | corregido y verificado | fix(BE-27) |
| BE-28 | notifications | Filtro read convierte cualquier texto en false | corregido y verificado | fix(BE-28) |
| BE-29 | swagger/auth | Ejemplo de Swagger del login con clave inválida | corregido y verificado | fix(BE-29) |
| BE-30 | periods | Un periodo abierto puede volver a planificado | corregido y verificado | fix(BE-30) |
| BE-31 | postman | La colección de Postman no envía el token: todo da 401 | corregido y verificado | fix(BE-31) |
| DB-01 | users | Email de Laura López con mayúsculas | corregido y verificado | fix(DB-01) |
| DB-02 | users | Rol de Laura López fuera del enum | corregido y verificado | fix(DB-02) |
| DB-03 | users | Laura López inactiva | corregido y verificado | fix(DB-03) |
| DB-04 | users | passwordHash truncado en Juliana Herrera | corregido y verificado | fix(DB-04) |
| DB-05 | users | Administrador sin nombre | corregido y verificado | fix(DB-05) |
| DB-06 | periods | Estado del periodo 2026-2 fuera del enum | corregido y verificado | fix(DB-06) |
| DB-07 | students | Juliana apunta a un programa inexistente | corregido y verificado | fix(DB-07) |
| DB-08 | faculties | Decano inexistente en FAC-COM | corregido y verificado | fix(DB-08) |
| DB-09 | faculties | Sede de FAC-SAL con espacio final | corregido y verificado | fix(DB-09) |
| DB-10 | programs | Programa extra con código DERE repetido | corregido y verificado | fix(DB-10) |
| DB-11 | subjects | ODON105 con 0 créditos | corregido y verificado | fix(DB-11) |
| DB-12 | subjects | MAT101 es prerrequisito de sí misma | corregido y verificado | fix(DB-12) |
| DB-13 | enrollments | Matrícula duplicada de Juliana | corregido y verificado | fix(DB-13) |
| DB-14 | enrollments | Materia y periodo distintos a los del grupo | corregido y verificado | fix(DB-14) |
| DB-15 | enrollments | Matrícula activa con nota final en periodo cerrado | corregido y verificado | fix(DB-15) |
| DB-16 | groups | Inscritos por encima del cupo en MAT101 g1 | corregido y verificado | fix(DB-16) |
| DB-17 | groups | Inscritos por encima del cupo en ODON105 g1 | corregido y verificado | fix(DB-17) |
| DB-18 | groups | Día del horario fuera del enum | corregido y verificado | fix(DB-18) |
| DB-19 | groups | Franja que termina antes de empezar | corregido y verificado | fix(DB-19) |
| DB-20 | evaluations | Porcentajes del grupo suman 110 | corregido y verificado | fix(DB-20) |
| DB-21 | grades | Notas de 5.7 fuera de la escala | corregido y verificado | fix(DB-21) |
| DB-22 | grades | Nota guardada como texto con coma | corregido y verificado | fix(DB-22) |
| DB-23 | grades | Nota ligada a una evaluación de otro grupo | corregido y verificado | fix(DB-23) |
| DB-24 | notifications | Tipo de notificación fuera del enum | corregido y verificado | fix(DB-24) |
| DB-25 | notifications | createdAt guardado como texto | corregido y verificado | fix(DB-25) |
| DB-26 | students | Perfil de estudiante de Juliana inactivo | corregido y verificado | fix(DB-26) |
| DB-27 | classrooms | Salón B-104 marcado inactivo | corregido y verificado | fix(DB-27) |
| DB-28 | groups | MAT101 g1 movido a un salón más pequeño que su cupo | corregido y verificado | fix(DB-28) |
| DB-29 | groups | Grupo 2c99 movido a B-104 y en choque de salón | corregido y verificado | fix(DB-29) |
| DB-30 | grades | Dos notas alteradas de 3.4 a 3 | corregido y verificado | fix(DB-30) |

## Backend

> Nota: BE-25, BE-01, BE-03, BE-06, BE-07, BE-08 y BE-09 impedían arrancar la API o hacer login, así que se corrigieron juntos; su resultado "antes" se deduce del código y el "después" se verificó con curl contra http://localhost:3000/api.

<!--
### BE-01 — Título corto
- Dónde: src/modulo/archivo.ts:línea (función o decorador)
- Problema:
- Solución:
- Cómo demostrarlo: request o pasos, resultado antes → resultado después
- Commit:
-->

### BE-25 — ReportsModule sin provider ReportsService
- Dónde: src/reports/reports.module.ts:14 y :32 (import y providers)
- Problema: El import de ReportsService y `providers: [ReportsService]` estaban comentados; ReportsController no puede resolver su dependencia y Nest aborta el arranque.
- Solución: Descomentar el import y `providers: [ReportsService]`.
- Cómo demostrarlo: `npm run start:dev` → antes: error de dependencia de ReportsController y la app no inicia; después: log `Nest application successfully started` y `ReportsController {/api/reports}` mapeado.
- Commit: fix(BE-25)

### BE-01 — Prefijo global de rutas incorrecto
- Dónde: src/main.ts:10 (app.setGlobalPrefix)
- Problema: El prefijo era `api/v1`; el README define la API en http://localhost:3000/api, así que todas las rutas documentadas daban 404.
- Solución: `app.setGlobalPrefix('api')`.
- Cómo demostrarlo: `curl -X POST http://localhost:3000/api/auth/login -d '{"email":"admin@universidad.edu","password":"Secret123!"}'` → antes 404; después 201 con accessToken. `GET /api/v1/health` ahora 404.
- Commit: fix(BE-01)

### BE-03 — Puerto de la API incorrecto
- Dónde: src/main.ts:27 (const port)
- Problema: Usaba `process.env.APP_PORT ?? 3001`; la variable del .env es `PORT` y el README exige el puerto 3000, así que la API escuchaba en 3001 (choca con el frontend).
- Solución: `Number(process.env.PORT ?? 3000)`.
- Cómo demostrarlo: `curl -X POST http://localhost:3000/api/auth/login ...` → antes conexión rechazada en 3000; después 201.
- Commit: fix(BE-03)

### BE-06 — Falta RolesGuard global
- Dónde: src/auth/auth.module.ts (providers, APP_GUARD)
- Problema: Solo estaba registrado JwtAuthGuard como APP_GUARD; los decoradores `@Roles(...)` no tenían efecto y cualquier usuario autenticado accedía a rutas de admin.
- Solución: Importar RolesGuard y agregar `{ provide: APP_GUARD, useClass: RolesGuard }` después del de JWT.
- Cómo demostrarlo: Token de juliana.herrera147 (estudiante): `GET /api/users` → antes 200 con la lista de usuarios; después 403 `No tienes permisos para esta accion`. Admin sigue con 200.
- Commit: fix(BE-06)

### BE-07 — expiresIn del JWT interpretado como milisegundos
- Dónde: src/auth/auth.module.ts:22 (signOptions.expiresIn)
- Problema: `expiresIn: String(JWT_EXPIRES_IN_SECONDS) as StringValue`: la cadena "3600" sin unidad se interpreta como 3600 ms, el token expiraba a los 3,6 s.
- Solución: `expiresIn: Number(config.getOrThrow('JWT_EXPIRES_IN_SECONDS'))` (segundos) y quitar el import de `ms`.
- Cómo demostrarlo: Decodificar el payload del token de login → después `exp - iat = 3600`; `GET /api/users` con el token 5 s después del login → 200 (antes 401).
- Commit: fix(BE-07)

### BE-08 — @MinLength(12) en LoginDto
- Dónde: src/auth/dto/login.dto.ts:12 (password)
- Problema: `@MinLength(12)` rechazaba con 400 la clave de prueba `Secret123!` (10 caracteres) del README, nadie podía iniciar sesión.
- Solución: Quitar `@MinLength(12)` (y su import) del LoginDto; la longitud se valida al crear/cambiar clave, no en el login.
- Cómo demostrarlo: `POST /api/auth/login {admin@universidad.edu, Secret123!}` → antes 400 `password must be longer than or equal to 12 characters`; después 201 con accessToken (también docente y estudiante de prueba).
- Commit: fix(BE-08)

### BE-09 — slowDownAttempts retrasa todos los logins
- Dónde: src/auth/auth.service.ts:18 (login) y método slowDownAttempts
- Problema: `await this.slowDownAttempts()` hacía un setTimeout de 5000 ms en cada login, correcto o no; el frontend se colgaba 5 s por intento.
- Solución: Quitar la llamada y el método.
- Cómo demostrarlo: `time curl -X POST http://localhost:3000/api/auth/login ...` → antes ≥5 s (por código); después 0,85 s, HTTP 201.
- Commit: fix(BE-09)

### BE-02 — Ruta de Swagger incorrecta
- Dónde: src/main.ts:25 (SwaggerModule.setup)
- Problema: Swagger se montaba en `api/doc`; el README lo documenta en http://localhost:3000/api/docs.
- Solución: `SwaggerModule.setup('api/docs', ...)`.
- Cómo demostrarlo: `curl -o /dev/null -w '%{http_code}' http://localhost:3000/api/docs` → antes 404 (y /api/doc 200); después 200 (y /api/doc 404).
- Commit: fix(BE-02)

### BE-04 — MONGODB_URI de ejemplo con puerto equivocado
- Dónde: .env.example:2 (MONGODB_URI)
- Problema: El ejemplo usaba `localhost:27018`, pero docker-compose.yml publica Mongo en 27017; quien sigue el README (`cp .env.example .env`) no conecta a la base.
- Solución: Usar `mongodb://localhost:27017/universidad?replicaSet=rs0&directConnection=true`.
- Cómo demostrarlo: Script node que conecta con la URI de .env.example → antes `ECONNREFUSED 127.0.0.1:27018`; después `Mongo OK con localhost:27017`.
- Commit: fix(BE-04)

### BE-05 — JWT_SECRET de ejemplo vacío
- Dónde: .env.example:5 (JWT_SECRET)
- Problema: `JWT_SECRET=` vacío; validateEnv exige mínimo 16 caracteres, así que la API no arranca con el .env copiado del ejemplo.
- Solución: Valor de ejemplo de 16+ caracteres (`cambia-este-secreto-de-ejemplo-123456`).
- Cómo demostrarlo: Ejecutar `validateEnv` con los valores de .env.example → antes `JWT_SECRET must be longer than or equal to 16 characters`; después `validateEnv OK`.
- Commit: fix(BE-05)

### BE-10 — @HttpCode(400) en crear usuario
- Dónde: src/users/users.controller.ts:28 (create)
- Problema: `@HttpCode(400)` forzaba 400 Bad Request en una creación exitosa; el usuario sí se guardaba pero el cliente lo veía como error.
- Solución: Quitar `@HttpCode(400)` (Nest devuelve 201 en POST).
- Cómo demostrarlo: `POST /api/users` (admin) con `{name, email: qa.be10@..., password: Secret123!, role: estudiante}` → antes HTTP 400 con el usuario creado en el cuerpo; después HTTP 201 (qa.be10b@...).
- Commit: fix(BE-10)

### BE-11 — Orden de rutas: ':id' antes de 'me'
- Dónde: src/users/users.controller.ts (findOne / me)
- Problema: `@Get(':id')` estaba declarado antes de `@Get('me')`, así que `/users/me` entraba en findOne: el admin recibía 400 `ID invalido` y docente/estudiante 403 (findOne solo es de admin).
- Solución: Mover el handler `me` antes de `:id`.
- Cómo demostrarlo: `GET /api/users/me` → antes admin 400 `ID invalido`, estudiante 403; después 200 con el perfil propio para admin, docente y estudiante. `GET /api/users/<id>` (admin) sigue 200.
- Commit: fix(BE-11)

### BE-12 — Campo mal escrito en UpdateUserDto
- Dónde: src/users/dto/user.dto.ts:14 (UpdateUserDto)
- Problema: El campo se llamaba `namesssss`; con `forbidNonWhitelisted` enviar `name` daba 400 y el admin no podía renombrar usuarios.
- Solución: Renombrar el campo a `name`.
- Cómo demostrarlo: `PATCH /api/users/6ac3d540c095e150a27de5a4` (admin) `{"name":"QA Prueba Diez Editado"}` → antes 400 `property name should not exist`; después 200 con el nombre actualizado.
- Commit: fix(BE-12)

### BE-13 — changePassword no persiste
- Dónde: src/users/users.service.ts (changePassword)
- Problema: Se asignaba el nuevo hash pero se hacía `return user` sin `save()`: la API respondía 200 y la clave seguía siendo la anterior.
- Solución: `return user.save();`.
- Cómo demostrarlo: Usuario de prueba qa.be10b@universidad.edu: `PATCH /api/auth/change-password {currentPassword: Secret123!, newPassword: NuevaClave123}` → 200. Antes: login con Secret123! 200 y con NuevaClave123 401. Después: Secret123! 401 y NuevaClave123 200.
- Commit: fix(BE-13)

### BE-14 — RegExp sin flag i en findAll de usuarios
- Dónde: src/users/users.service.ts (findAll, filtro q)
- Problema: `new RegExp(escapeRegex(q))` sin flag `i`: buscar `JULIANA` no encontraba a `Juliana ...`; el resto de buscadores (findIdsByText, textPattern) sí ignoran mayúsculas.
- Solución: `new RegExp(escapeRegex(query.q.trim()), 'i')`.
- Cómo demostrarlo: `GET /api/users?q=JULIANA` (admin) → antes total 0; después el mismo total que `q=juliana`.
- Commit: fix(BE-14)

### BE-15 — Transform propio en UsersQueryDto.active
- Dónde: src/users/dto/user.dto.ts (UsersQueryDto.active)
- Problema: `@Transform(({ value }) => value === 'true' || value === true)` convertía cualquier valor no válido (`abc`) en `false`, así `IsBoolean` nunca rechazaba y se filtraban inactivos en silencio. Los demás DTO usan el helper `toBoolean`.
- Solución: `@Transform(toBoolean)` importado de common/dto/query-helpers.
- Cómo demostrarlo: `GET /api/users?active=abc` (admin) → antes 200 con usuarios inactivos; después 400 `active must be a boolean value`. `active=true` y `active=false` siguen filtrando bien (200).
- Commit: fix(BE-15)

### BE-16 — Orden de rutas: ':id' antes de 'mine' en grupos
- Dónde: src/groups/groups.controller.ts (findOne / mine)
- Problema: `@Get(':id')` estaba antes de `@Get('mine')` (pese al comentario), así que `/groups/mine` caía en findOne y el ParseObjectIdPipe respondía 400.
- Solución: Mover el handler `mine` antes de `:id`.
- Cómo demostrarlo: `GET /api/groups/mine` con token de laura.lopez89 (docente) → antes 400 `ID invalido`; después 200 con la paginación de sus grupos (0 en los datos actuales, coincide con Mongo). Con estudiante → 403.
- Commit: fix(BE-16)

### BE-17 — assertCanManage valida el rol equivocado
- Dónde: src/groups/groups.service.ts (assertCanManage)
- Problema: La condición era `user.role === Role.Estudiante`; los docentes nunca pasaban por la verificación de propiedad y podían gestionar (nómina, planilla, notas, evaluaciones) grupos que no son suyos.
- Solución: `if (user.role === Role.Docente)`: el docente solo gestiona grupos cuyo `teacher` es su perfil; el admin gestiona todos.
- Cómo demostrarlo: `GET /api/groups/6abf0b8bfead57fb41c12c37/roster` con token de laura.lopez89 (no es su grupo) → antes pasaba la verificación (terminaba en 500 por datos); después 403 `El grupo no esta a tu cargo`. Nota: con admin ese grupo da 500 porque su `subject` no existe en la colección actual (importación incompleta por DB-10).
- Commit: fix(BE-17)

### BE-18 — Rol incorrecto en Mis matrículas
- Dónde: src/enrollments/enrollments.controller.ts:34 (mine)
- Problema: `@Roles(Role.Docente)` en el endpoint de matrículas propias: el estudiante (único que tiene matrículas) recibía 403.
- Solución: `@Roles(Role.Estudiante)`.
- Cómo demostrarlo: `GET /api/enrollments/mine` con token de juliana.herrera147 → antes 403; después 200 con su paginación. Con docente → 403.
- Commit: fix(BE-18)

### BE-19 — Condición invertida al confirmar matrícula
- Dónde: src/enrollments/enrollments.service.ts:79 (enroll)
- Problema: `if (created.status === EnrollmentStatus.Active) throw` lanzaba 400 justo cuando la matrícula sí se creó; la matrícula y el cupo ya estaban guardados, así que el estudiante veía error pero quedaba matriculado.
- Solución: Invertir la condición: `if (created.status !== EnrollmentStatus.Active) throw`.
- Cómo demostrarlo: Datos QA creados por API: periodo QA-2099-1 (abierto) y grupo 6ac3d68d2470a6c9903e0dfe (MAT101, docente Laura). `POST /api/enrollments {groupId}` con juliana.herrera147 → antes 400 `No se pudo confirmar la matricula` pero en Mongo la matrícula quedó `activa` y `enrolled` 1; después 201 con `status: activa`.
- Commit: fix(BE-19)

### BE-20 — cancel no decrementa group.enrolled
- Dónde: src/enrollments/enrollments.service.ts (cancel, transacción)
- Problema: Al cancelar solo se cambiaba `status` a `cancelada`; `groups.enrolled` no se decrementaba, el cupo quedaba ocupado para siempre y el grupo se llenaba con matrículas canceladas.
- Solución: Dentro de la misma transacción: `await this.groupModel.updateOne({ _id: enrollment.group }, { $inc: { enrolled: -1 } }, { session });`.
- Cómo demostrarlo: Grupo QA 6ac3d68d2470a6c9903e0dfe, matrícula 6ac3d6922470a6c9903e0e0f de juliana.herrera147: `POST /api/enrollments/<id>/cancel` → antes status `cancelada` y `enrolled` seguía en 1; después status `cancelada` y `enrolled` pasó de 2 a 1 (`GET /api/groups/<id>`).
- Commit: fix(BE-20)

### BE-21 — Ruta base de evaluaciones incorrecta
- Dónde: src/evaluations/evaluations.controller.ts:14 (@Controller)
- Problema: `@Controller('evaluationslalala')`: todos los endpoints de evaluaciones daban 404 en /api/evaluations (ruta usada por Postman, Swagger y el frontend).
- Solución: `@Controller('evaluations')`.
- Cómo demostrarlo: `GET /api/evaluations?limit=1` (admin) → antes 404 (y /api/evaluationslalala 200); después 200 con total 100.
- Commit: fix(BE-21)

### BE-22 — @HttpCode(BAD_REQUEST) en crear evaluación
- Dónde: src/evaluations/evaluations.controller.ts:21 (create)
- Problema: `@HttpCode(HttpStatus.BAD_REQUEST)` forzaba 400 en una creación exitosa: la evaluación se guardaba pero el cliente lo trataba como error (y podía reintentar duplicándola).
- Solución: Quitar el decorador (y los imports que quedaron sin uso); el POST responde 201.
- Cómo demostrarlo: Docente laura.lopez89 en su grupo QA 6ac3d68d2470a6c9903e0dfe: `POST /api/evaluations {group, name: QA Parcial 1, weight: 40}` → antes 400 con la evaluación creada en el cuerpo; después 201 (`QA Parcial 2`). Estudiante → 403.
- Commit: fix(BE-22)

### BE-23 — @Max(4.5) en UpsertGradeDto
- Dónde: src/grades/dto/grade.dto.ts:18 (value)
- Problema: `@Max(4.5)` rechazaba notas válidas entre 4.5 y 5.0, aunque la propia doc Swagger dice `maximum: 5` (`Nota de 0.0 a 5.0`).
- Solución: `@Max(5)`.
- Cómo demostrarlo: Docente Laura, matrícula QA 6ac3d6922470a6c9903e0e0f, evaluación QA Parcial 1: `PUT /api/grades {value: 4.8}` → antes 400 `value must not be greater than 4.5`; después 200. Con `value: 5.1` → 400 `must not be greater than 5`.
- Commit: fix(BE-23)

### BE-24 — Comparación estricta con PASSING_GRADE
- Dónde: src/grades/grades.service.ts:132 (finalize)
- Problema: `finalGrade > PASSING_GRADE` (3.0): un estudiante con exactamente 3.0 quedaba `reprobada`, cuando la nota mínima aprobatoria es 3.0.
- Solución: `finalGrade >= PASSING_GRADE`.
- Cómo demostrarlo: Grupo QA 6ac3d68d2470a6c9903e0dfe con evaluaciones 40/40/20 y nota 3 en todas. `POST /api/grades/finalize/<matrícula>` (docente Laura) → antes matrícula 6ac3d6922470a6c9903e0e0f: `finalGrade 3, status reprobada`; después matrícula 6ac3d75e070dfa76b6f1f611: `finalGrade 3, status aprobada`.
- Commit: fix(BE-24)

### BE-26 — markRead no pone read = true
- Dónde: src/notifications/notifications.service.ts (markRead)
- Problema: Solo se asignaba `readAt`; `read` seguía en `false`, así que la notificación seguía contando como no leída en la bandeja.
- Solución: Agregar `notification.read = true;` antes de `readAt`.
- Cómo demostrarlo: Estudiante juliana.herrera147: `PATCH /api/notifications/<id>/read` → antes 200 con `read:false` y `readAt` puesto (6ac3d753070dfa76b6f1f5f9); después 200 con `read:true` (6ac3d72db604514b766ae4a5). Con token de otro usuario → 403.
- Commit: fix(BE-26)

### BE-27 — Colección de Postman desalineada con CreateTeacherDto
- Dónde: postman/proyecto1-simple.postman_collection.json (Teachers: POST /api/teachers y PATCH /api/teachers/:id)
- Problema: Los cuerpos de ejemplo envían `department`, pero el DTO/esquema de docentes usa `faculty` (ObjectId requerido). Con `forbidNonWhitelisted` la petición de la colección siempre falla.
- Solución: Cambiar `department` por `faculty: PEGA_AQUI_EL_ID_DE_LA_FACULTAD` en ambos cuerpos (igual que los demás placeholders de la colección).
- Cómo demostrarlo: Usuario QA docente 6ac3d80e5593b9da19ca2c38: `POST /api/teachers {user, code: DOC-QA-1, department: Ingenieria}` (cuerpo antiguo) → 400 `property department should not exist`, `faculty must be a mongodb id`; con el cuerpo corregido y la facultad 6abf0b8bfead57fb41c12b01 → 201.
- Commit: fix(BE-27)

### BE-28 — Transform propio en NotificationsQueryDto.read
- Dónde: src/notifications/dto/notification.dto.ts (NotificationsQueryDto.read)
- Problema: Mismo defecto que BE-15: `@Transform(({ value }) => value === 'true' || value === true)` convierte `read=abc` en `false`, IsBoolean nunca rechaza y se devuelven las no leídas en silencio.
- Solución: `@Transform(toBoolean)` de common/dto/query-helpers, como el resto de filtros booleanos.
- Cómo demostrarlo: `GET /api/notifications/mine?read=abc` (juliana.herrera147) → antes 200 con total 5 (= read=false); después 400 `read must be a boolean value`. `read=true` (1) y `read=false` (5) siguen igual.
- Commit: fix(BE-28)

### BE-29 — Ejemplo de password en LoginDto no coincide con los usuarios de prueba
- Dónde: src/auth/dto/login.dto.ts:9 (@ApiProperty example de password)
- Problema: Swagger precarga `admin@universidad.edu` / `Admin12345`; según el README la clave de los usuarios de prueba es `Secret123!`, así que el "Try it out" del login en /api/docs siempre da 401.
- Solución: `@ApiProperty({ example: 'Secret123!' })`.
- Cómo demostrarlo: `POST /api/auth/login {admin@universidad.edu, Admin12345}` (ejemplo anterior) → 401 `Credenciales invalidas`. Después, `GET /api/docs-json` muestra `LoginDto.password.example = Secret123!` y ese cuerpo da 200.
- Commit: fix(BE-29)

### Sospechas y observaciones (sin cambio de código)
- **`POST /api/enrollments/:id/cancel` responde 201**: las demás acciones POST que no crean recursos (`/periods/:id/close`, `/grades/finalize/:id`, `/groups/:id/finalize`, `/users/:id/reset-password`) usan `@HttpCode(200)`. Sin requisito explícito. Estado: sospecha.
- **Entorno**: durante la corrección, `npm run db:import` se detenía en `programs` (DB-10) y varios endpoints daban 500 por datos desalineados; BE-17 a BE-24 se probaron con datos QA creados por la API. Tras integrar los arreglos de base de datos (commit f1eccbb) la importación es completa: progress, history, roster y grade-sheet responden 200, y BE-17 se re-verificó con datos reales (Laura en el grupo ajeno 6abf0b8bfead57fb41c12c37 → 403).

### BE-30 — PATCH /periods permite retroceder abierto → planificado
- Dónde: src/periods/periods.service.ts (update, validación del ciclo de vida)
- Problema: El propio servicio define el ciclo `planificado → abierto → cerrado` y bloquea reabrir un cerrado, pero no bloqueaba `abierto → planificado`. Con el periodo 2026-2 (49 matrículas activas) en planificado: no hay periodo actual (`GET /periods/current` 404) y los estudiantes no pueden cancelar (`El periodo ya no esta abierto`).
- Solución: En update, si el periodo está abierto y se pide `planificado`, lanzar 400 `Un periodo abierto no puede volver a planificado`.
- Cómo demostrarlo: Admin `PATCH /api/periods/6abf0b8bfead57fb41c12a35 {status: planificado}` → antes 200 (luego `POST /api/enrollments/6ac3dc3a5362fba6e951bdce/cancel` de juliana → 400 y `GET /periods/current` → 404); después 400 `Un periodo abierto no puede volver a planificado`, el periodo sigue abierto y la cancelación responde 201. Planificado → abierto y editar fechas siguen funcionando (200). Datos reales restaurados.
- Commit: fix(BE-30)

### BE-31 — Colección de Postman sin autenticación
- Dónde: postman/proyecto1-simple.postman_collection.json (auth de la colección y request Login)
- Problema: Ninguna petición lleva `Authorization` ni el login guarda el `accessToken`; como todas las rutas salvo health y login exigen JWT, la colección tal cual responde 401 en /users, /programs, /periods, etc.
- Solución: Auth Bearer a nivel de colección con `{{token}}`, variable `token` y un script de test en `POST /api/auth/login` que hace `pm.collectionVariables.set("token", body.accessToken)`.
- Cómo demostrarlo: Antes: `GET /api/users?page=1&limit=20` sin token (como la colección) → 401 (igual /programs y /periods). Después, ejecutando las peticiones GET de la colección en orden con un mini-runner en node que aplica la auth y el script del login: health, login, auth/me, users, programs, subjects, periods, students y teachers → 200; students/me y teachers/me → 403 (correcto con token de admin). No se ejecutó en la app de Postman.
- Commit: fix(BE-31)

## Base de datos

Los 30 bugs estaban en los datos de `database/*.json`; los esquemas de `src/**/schemas` se revisaron y no tienen errores. La configuración de Mongo en `.env.example` está registrada como BE-04 y BE-05.

- **Cómo se encontraron:** `scripts/db-audit.js` cruza las 13 colecciones (referencias, únicos, enums, rangos, tipos y coherencia entre colecciones). Los valores correctos salen de regenerar los datos con `scripts/db-seed.js`, que es determinista, y compararlos campo a campo.
- **Commits:** un commit por bug, `fix(DB-NN)`. Primero se corrigieron todos juntos en `f1eccbb`, porque DB-10 impedía completar `npm run db:import`; después se revirtió solo `database/` (`revert(bd)`) y se rehízo la misma corrección bug por bug, con resultado final idéntico.
- **Verificación global:** auditoría de 63 avisos a ninguno (salidas en `evidencias/`), importación completa de las 13 colecciones y login 200 de los tres usuarios de prueba. Cada consulta de "Cómo demostrarlo" se ejecutó sobre los datos originales y sobre los corregidos.
- **Abreviaturas:** los `_id` escritos como `…xxxx` llevan el prefijo `6abf0b8bfead57fb41c1`.

### DB-01 — Email con mayúsculas
- Dónde: database/users.json, usuario Laura López (`…2a90`), campo `email`
- Problema: El email estaba como `Laura.Lopez89@universidad.edu`. El esquema guarda los emails en minúsculas y el login busca en minúsculas, así que la docente de prueba no se encuentra.
- Solución: `laura.lopez89@universidad.edu`.
- Cómo demostrarlo: `db.users.findOne({email: "laura.lopez89@universidad.edu"})` → antes: null; después: devuelve el usuario. Login de Laura → 200.
- Commit: fix(DB-01)

### DB-02 — Rol fuera del enum
- Dónde: database/users.json, usuario Laura López (`…2a90`), campo `role`
- Problema: Valor `Docente`; el enum `Role` solo admite `admin`, `docente`, `estudiante`. Los guards de rol no la reconocen como docente.
- Solución: `docente`.
- Cómo demostrarlo: `db.users.findOne({_id: ObjectId("6abf0b8bfead57fb41c12a90")})` → antes: `role: "Docente"`; después: `role: "docente"`.
- Commit: fix(DB-02)

### DB-03 — Usuario de prueba inactivo
- Dónde: database/users.json, usuario Laura López (`…2a90`), campo `active`
- Problema: `active: false` en un usuario de prueba del README, mientras su perfil en `teachers` (DOC-088) está activo. El login la rechaza como usuario inactivo.
- Solución: `active: true` (valor original del seed).
- Cómo demostrarlo: Login de Laura → antes: 401; después: 200. `db.users.findOne(...).active` → true.
- Commit: fix(DB-03)

### DB-04 — Hash de contraseña truncado
- Dónde: database/users.json, usuario Juliana Herrera (`…2aca`), campo `passwordHash`
- Problema: El hash tenía 59 caracteres en vez de 60 (bcrypt inválido): la estudiante de prueba no puede iniciar sesión. El hallazgo inicial apuntaba a Laura, pero el hash distinto era el de Juliana.
- Solución: Copiar el hash común de los otros 200 usuarios (misma clave documentada).
- Cómo demostrarlo: Login de Juliana → antes: 401; después: 200. `node scripts/db-audit.js` → antes: `users :: passwordHash invalido`.
- Commit: fix(DB-04)

### DB-05 — Nombre vacío
- Dónde: database/users.json, usuario `admin@universidad.edu` (`…2a38`), campo `name`
- Problema: `name: ""`; el campo es requerido y el README lo llama "Administrador".
- Solución: `Administrador`.
- Cómo demostrarlo: `db.users.findOne({email: "admin@universidad.edu"})` → antes: `name: ""`; después: `name: "Administrador"`.
- Commit: fix(DB-05)

### DB-06 — Estado fuera del enum
- Dónde: database/periods.json, periodo `2026-2` (`…2a35`), campo `status`
- Problema: Valor `Abierto`; el enum es `planificado`, `abierto`, `cerrado`. No existía ningún periodo abierto, así que no se podía matricular.
- Solución: `abierto`.
- Cómo demostrarlo: `db.periods.countDocuments({status: "abierto"})` → antes: 0; después: 1.
- Commit: fix(DB-06)

### DB-07 — Referencia rota a programa
- Dónde: database/students.json, estudiante `E20210046` (`…2b9c`), campo `program`
- Problema: `program` apuntaba a `6ac057b232f78f9b9e14f3c4`, que no existe en `programs`.
- Solución: Programa original según el seed: Derecho, `DERE` (`…292d`).
- Cómo demostrarlo: `db.programs.findOne({_id: db.students.findOne({code: "E20210046"}).program})` → antes: null; después: Derecho.
- Commit: fix(DB-07)

### DB-08 — Referencia rota a decano
- Dónde: database/faculties.json, facultad `FAC-COM` (`…2b0a`), campo `dean`
- Problema: `dean` apuntaba a `6ac057b232f78f9b9e14f3c3`, que no existe en `teachers`.
- Solución: Decano original según el seed: docente `DOC-050` (`…2b3c`), activo y de esa misma facultad.
- Cómo demostrarlo: `db.teachers.findOne({_id: db.faculties.findOne({code: "FAC-COM"}).dean})` → antes: null; después: DOC-050.
- Commit: fix(DB-08)

### DB-09 — Espacio sobrante en la sede
- Dónde: database/faculties.json, facultad `FAC-SAL` (`…2b02`), campo `campus`
- Problema: `"Bogotá "` con un espacio al final; no coincide con `"Bogotá"` al filtrar o agrupar por sede.
- Solución: `"Bogotá"`.
- Cómo demostrarlo: `db.faculties.distinct("campus")` → antes: incluye `"Bogotá"` y `"Bogotá "`; después: solo `"Bogotá"`.
- Commit: fix(DB-09)

### DB-10 — Código de programa duplicado
- Dónde: database/programs.json, documento `6ac03d4229a649e6df069ebb` ("Derecho (jornada nocturna)")
- Problema: Documento añadido con `code: "DERE"`, igual al del programa Derecho. Viola el índice único de `code` y hacía que `npm run db:import` se cortara con `E11000 duplicate key`, sin cargar las colecciones siguientes.
- Solución: Eliminar el documento duplicado (no existe en el seed y ningún estudiante ni materia lo referencia).
- Cómo demostrarlo: `npm run db:import` → antes: `E11000 ... code: "DERE"`; después: 13 colecciones importadas. `db.programs.countDocuments({code: "DERE"})` → 2 → 1.
- Commit: fix(DB-10)

### DB-11 — Créditos fuera de rango
- Dónde: database/subjects.json, materia `ODON105` (`…299d`), campo `credits`
- Problema: `credits: 0`; el esquema exige entre 1 y 10. Además no suma al límite de créditos por periodo.
- Solución: `2` (valor original del seed).
- Cómo demostrarlo: `db.subjects.findOne({code: "ODON105"})` → antes: `credits: 0`; después: `credits: 2`.
- Commit: fix(DB-11)

### DB-12 — Prerrequisito circular
- Dónde: database/subjects.json, materia `MAT101` (`…2970`), campo `prerequisites`
- Problema: La lista contenía su propio `_id`: nadie puede cumplir el prerrequisito, así que nadie podría matricular Cálculo 1.
- Solución: `prerequisites: []` (es de primer semestre).
- Cómo demostrarlo: `db.subjects.findOne({code: "MAT101"})` → antes: prerequisites con su propio _id; después: `[]`.
- Commit: fix(DB-12)

### DB-13 — Matrícula duplicada
- Dónde: database/enrollments.json, documento `6ac057b232f78f9b9e14f3c2`
- Problema: Documento añadido con el mismo estudiante y grupo que la matrícula `…2dfb`. Viola el índice único `student + group`.
- Solución: Eliminar el duplicado.
- Cómo demostrarlo: `db.enrollments.countDocuments({student: ObjectId("6abf0b8bfead57fb41c12b9c"), group: ObjectId("6abf0b8bfead57fb41c12c3e")})` → antes: 2; después: 1.
- Commit: fix(DB-13)

### DB-14 — Materia y periodo no coinciden con el grupo
- Dónde: database/enrollments.json, matrículas `…2dfb` (campo `subject`) y `…2e1a` (campo `period`)
- Problema: En `…2dfb` la materia era ARQU181 pero su grupo es de ODON105. En `…2e1a` el periodo era 2026-1 pero su grupo es de 2026-2. Esos campos son copia de los del grupo y se usan para validar prerrequisitos, créditos y cruces.
- Solución: Igualarlos a los del grupo: `subject` → ODON105 (`…299d`); `period` → 2026-2 (`…2a35`).
- Cómo demostrarlo: Comparar `enrollment.subject/period` con `group.subject/period` de cada una → antes: distintos; después: iguales.
- Commit: fix(DB-14)

### DB-15 — Estado incoherente con la nota final
- Dónde: database/enrollments.json, matrícula `…2d25`, campo `status`
- Problema: Estado `activa` con `finalGrade: 3.38` en el periodo 2025-1, que está cerrado y tiene sus 4 notas registradas.
- Solución: `status: "aprobada"` (valor original; la nota final es correcta y ≥ 3.0).
- Cómo demostrarlo: `db.enrollments.findOne({_id: ObjectId("6abf0b8bfead57fb41c12d25")})` → antes: `status: "activa"`; después: `"aprobada"`. El historial de Juliana muestra la materia aprobada.
- Commit: fix(DB-15)

### DB-16 — Contador de inscritos incorrecto
- Dónde: database/groups.json, grupo `…2c3a` (MAT101, grupo 1, 2026-2), campo `enrolled`
- Problema: `enrolled: 35` con `capacity: 32`, y solo hay 9 matrículas no canceladas. El grupo aparece sin cupos.
- Solución: `enrolled: 9`.
- Cómo demostrarlo: `db.enrollments.countDocuments({group: ObjectId("6abf0b8bfead57fb41c12c3a"), status: {$ne: "cancelada"}})` → 9; `enrolled` → antes: 35; después: 9.
- Commit: fix(DB-16)

### DB-17 — Contador de inscritos incorrecto
- Dónde: database/groups.json, grupo `…2c3e` (ODON105, grupo 1, 2026-2), campo `enrolled`
- Problema: `enrolled: 42` con `capacity: 39`; las matrículas reales son 9 tras quitar la duplicada (DB-13).
- Solución: `enrolled: 9`.
- Cómo demostrarlo: Mismo conteo que DB-16 sobre el grupo `…2c3e` → 9; `enrolled` → antes: 42; después: 9.
- Commit: fix(DB-17)

### DB-18 — Día fuera del enum
- Dónde: database/groups.json, grupo `…2c3a`, campo `schedule[0].day`
- Problema: Valor `Miércoles`; el enum `Day` usa minúsculas sin tilde. La detección de cruces compara el texto exacto y no veía el choque.
- Solución: `miercoles`.
- Cómo demostrarlo: `db.groups.findOne({_id: ObjectId("6abf0b8bfead57fb41c12c3a")})` → antes: `day: "Miércoles"`; después: `"miercoles"`.
- Commit: fix(DB-18)

### DB-19 — Horas invertidas
- Dónde: database/groups.json, grupo `…2c64`, campo `schedule[0]`
- Problema: Franja del jueves de `09:00` a `07:00`.
- Solución: `07:00` a `09:00` (valor original).
- Cómo demostrarlo: `db.groups.findOne({_id: ObjectId("6abf0b8bfead57fb41c12c64")})` → antes: 09:00–07:00; después: 07:00–09:00.
- Commit: fix(DB-19)

### DB-20 — Pesos que no suman 100
- Dónde: database/evaluations.json, evaluación "Taller" (`…2dd4`) del grupo `…2c3a`, campo `weight`
- Problema: Taller tenía peso 30: 25 + 25 + 30 + 30 = 110. La nota final ponderada puede pasar de 5.0.
- Solución: `weight: 20` (suma 100).
- Cómo demostrarlo: `db.evaluations.aggregate([{$match: {group: ObjectId("6abf0b8bfead57fb41c12c3a")}}, {$group: {_id: null, total: {$sum: "$weight"}}}])` → antes: 110; después: 100.
- Commit: fix(DB-20)

### DB-21 — Notas fuera de rango
- Dónde: database/grades.json, notas `…2df0` y `…2dfc`, campo `value`
- Problema: `value: 5.7`; la escala es 0.0 a 5.0.
- Solución: Valores originales del seed: `2.7` y `2.6`.
- Cómo demostrarlo: `db.grades.countDocuments({value: {$gt: 5}})` → antes: 2; después: 0.
- Commit: fix(DB-21)

### DB-22 — Tipo de dato incorrecto
- Dónde: database/grades.json, nota `…2e1b`, campo `value`
- Problema: `value: "4,2"` (texto con coma) en vez de número; rompe promedios y el cálculo de la nota final.
- Solución: Número `2.7` (valor original del seed).
- Cómo demostrarlo: `db.grades.countDocuments({value: {$type: "string"}})` → antes: 1; después: 0.
- Commit: fix(DB-22)

### DB-23 — Evaluación de otro grupo
- Dónde: database/grades.json, nota `…2dfd`, campo `evaluation`
- Problema: La nota es de la matrícula `…2dfb` (grupo `…2c3e`) pero apuntaba a la evaluación `…2e11`, que pertenece al grupo `…2c73`.
- Solución: `evaluation` → `…2df2` (Parcial 2 del grupo de la matrícula).
- Cómo demostrarlo: Comparar `evaluation.group` con `enrollment.group` de esa nota → antes: distintos; después: iguales.
- Commit: fix(DB-23)

### DB-24 — Tipo fuera del enum
- Dónde: database/notifications.json, notificación `…2eb7`, campo `type`
- Problema: Valor `aviso_urgente`, que no existe en `NotificationType`.
- Solución: `matricula_confirmada` (valor original; el título es "Matrícula confirmada").
- Cómo demostrarlo: `db.notifications.findOne({_id: ObjectId("6abf0b8bfead57fb41c12eb7")})` → antes: `type: "aviso_urgente"`; después: `"matricula_confirmada"`.
- Commit: fix(DB-24)

### DB-25 — Fecha con tipo incorrecto
- Dónde: database/notifications.json, notificación `…2ec0`, campo `createdAt`
- Problema: `createdAt: "ayer"` (texto) en vez de fecha; rompe el orden por fecha de las notificaciones.
- Solución: `{"$date": "2026-08-02T00:00:00Z"}` (valor original).
- Cómo demostrarlo: `db.notifications.countDocuments({createdAt: {$type: "string"}})` → antes: 1; después: 0.
- Commit: fix(DB-25)

### DB-26 — Perfil inactivo con usuario activo
- Dónde: database/students.json, estudiante `E20210046` (`…2b9c`), campo `active`
- Problema: `active: false` aunque su usuario está activo y tiene matrículas activas en el periodo abierto.
- Solución: `active: true` (valor original).
- Cómo demostrarlo: `db.students.findOne({code: "E20210046"})` → antes: `active: false`; después: `true`.
- Commit: fix(DB-26)

### DB-27 — Salón inactivo
- Dónde: database/classrooms.json, salón `B-104` (`…2bef`), campo `active`
- Problema: `active: false`; en el seed solo hay dos salones en mantenimiento (B-204 y D-101) y B-104 estaba activo.
- Solución: `active: true`.
- Cómo demostrarlo: `db.classrooms.find({active: false}, {code: 1})` → antes: B-104, B-204, D-101; después: B-204, D-101.
- Commit: fix(DB-27)

### DB-28 — Salón incorrecto
- Dónde: database/groups.json, grupo `…2c3a`, campo `schedule[0].classroom`
- Problema: El salón era B-104 (capacidad 22) para un grupo con cupo 32.
- Solución: Salón original `…2bf9`.
- Cómo demostrarlo: Comparar `classroom.capacity` con `group.capacity` → antes: 22 < 32; después: capacidad suficiente.
- Commit: fix(DB-28)

### DB-29 — Salón incorrecto y cruce de salón
- Dónde: database/groups.json, grupo `…2c99`, campo `schedule[0].classroom`
- Problema: La franja del miércoles 09:00–11:00 estaba en B-104 (capacidad 22, cupo 25), el mismo salón, día y hora que el grupo `…2c3a` en el mismo periodo.
- Solución: Salón original `…2be1`.
- Cómo demostrarlo: `db.groups.countDocuments({period: ObjectId("6abf0b8bfead57fb41c12a35"), schedule: {$elemMatch: {day: "miercoles", startTime: "09:00", classroom: ObjectId("6abf0b8bfead57fb41c12bef")}}})` → antes: 1 (2 contando el día mal escrito de DB-18); después: 0.
- Commit: fix(DB-29)

### DB-30 — Notas alteradas
- Dónde: database/grades.json, notas `…2dd7` y `…2dd8`, campo `value`
- Problema: Ambas tenían `3`; el seed determinista genera `3.4` para las dos. Valor dentro de rango, solo detectable comparando con los datos regenerados.
- Solución: `3.4` en las dos.
- Cómo demostrarlo: `db.grades.findOne({_id: ObjectId("6abf0b8bfead57fb41c12dd7")})` y `…2dd8` → antes: `value: 3`; después: `3.4`.
- Commit: fix(DB-30)

## Frontend
