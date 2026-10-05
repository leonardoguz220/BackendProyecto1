# Bugs de base de datos

Rama: `bd`. Estado general: **corregidos y verificados** (auditoría sin avisos, `db:import` completo, API con `database: up`). Sin commit todavía.

## Cómo se encontraron

1. `node scripts/db-audit.js` revisa `database/*.json` contra las reglas de los esquemas Mongoose (requeridos, enums, rangos, índices únicos, referencias) y las reglas de negocio (cupos, horarios, notas, prerrequisitos). Salida inicial: `evidencias/bd-auditoria-antes.txt` (110 avisos en 36 reglas).
2. `scripts/db-seed.js` es determinista (semilla fija 2026). Se regeneraron los datos originales sin tocar la base y se compararon campo a campo con los JSON. De ahí sale el **valor original** de cada dato alterado.
3. `npm run db:import` falla con los datos tal como vienen: `E11000 duplicate key error collection: universidad.programs index: code_1 dup key: { code: "DERE" }`. La importación se corta y no carga `programs` completo, `students`, `subjects`, `teachers` ni `users`.

## Configuración

| ID | Archivo | Problema | Corrección | Estado |
|---|---|---|---|---|
| BD-C1 | `.env.example` | `MONGODB_URI` apunta al puerto 27018; `docker-compose.yml` publica Mongo en 27017, la API no conecta | 27017 | corregido |
| BD-C2 | `.env.example` | `JWT_SECRET=` vacío; `env.validation.ts` exige 16 caracteres y la API no arranca al copiar el ejemplo | valor de ejemplo de 16+ caracteres | corregido |

## Datos (`database/*.json`)

Los `_id` se abrevian a sus últimos 4 caracteres (prefijo `6abf0b8bfead57fb41c1`).

| ID | Colección | Documento | Problema | Valor encontrado | Valor corregido |
|---|---|---|---|---|---|
| BD-01 | users | `2a38` admin | `name` vacío (campo requerido) | `""` | `Administrador` |
| BD-02 | users | `2a90` Laura López | email con mayúsculas (el esquema guarda en minúsculas; el login no la encuentra) | `Laura.Lopez89@…` | `laura.lopez89@…` |
| BD-03 | users | `2a90` Laura López | `role` fuera del enum | `Docente` | `docente` |
| BD-04 | users | `2a90` Laura López | usuario de prueba inactivo, y distinto de su perfil docente (`active: true`) | `false` | `true` |
| BD-05 | users | `2aca` Juliana Herrera | `passwordHash` truncado (59 caracteres en vez de 60): no puede iniciar sesión | hash inválido | hash bcrypt de la clave documentada |
| BD-06 | subjects | `2970` MAT101 | es prerrequisito de sí misma: nadie puede matricularla | `[MAT101]` | `[]` |
| BD-07 | subjects | `299d` ODON105 | `credits` fuera de rango (mínimo 1) | `0` | `2` |
| BD-08 | periods | `2a35` 2026-2 | `status` fuera del enum: no hay ningún periodo abierto | `Abierto` | `abierto` |
| BD-09 | programs | `6ac03d42…9ebb` | documento extra con `code` repetido (`DERE`), viola el índice único y rompe `db:import` | "Derecho (jornada nocturna)" | eliminar el duplicado |
| BD-10 | students | `2b9c` Juliana | `program` apunta a un programa que no existe | `6ac057b2…f3c4` | `292d` (Derecho) |
| BD-11 | students | `2b9c` Juliana | perfil inactivo con usuario activo y matrículas activas | `false` | `true` |
| BD-12 | classrooms | `2bef` B-104 | salón marcado inactivo | `false` | `true` |
| BD-13 | faculties | `2b02` FAC-SAL | `campus` con espacio al final (rompe filtros por sede) | `"Bogotá "` | `"Bogotá"` |
| BD-14 | faculties | `2b0a` FAC-COM | `dean` apunta a un docente que no existe | `6ac057b2…f3c3` | `2b3c` (DOC-050) |
| BD-15 | groups | `2c3a` MAT101 g1 | `schedule[0].day` fuera del enum | `Miércoles` | `miercoles` |
| BD-16 | groups | `2c3a` MAT101 g1 | salón cambiado a B-104 (capacidad 22 < cupo 32) | `2bef` | `2bf9` |
| BD-17 | groups | `2c3a` MAT101 g1 | `enrolled` mayor que `capacity` (32) y distinto de las matrículas reales | `35` | `9` |
| BD-18 | groups | `2c3e` ODON105 g1 | `enrolled` mayor que `capacity` (39) y distinto de las matrículas reales | `42` | `9` |
| BD-19 | groups | `2c64` | franja con hora de inicio posterior a la de fin | `09:00–07:00` | `07:00–09:00` |
| BD-20 | groups | `2c99` | salón del miércoles cambiado a B-104 (capacidad 22 < cupo 25; choca con el grupo `2c3a`) | `2bef` | `2be1` |
| BD-21 | enrollments | `2d25` | matrícula de periodo cerrado (2025-1) con nota final 3.38 pero estado `activa` | `activa` | `aprobada` |
| BD-22 | enrollments | `2dfb` | `subject` distinto al de su grupo | `29c0` (ARQU181) | `299d` (ODON105) |
| BD-23 | enrollments | `2e1a` | `period` distinto al de su grupo | `2a34` (2026-1) | `2a35` (2026-2) |
| BD-24 | enrollments | `6ac057b2…f3c2` | matrícula extra repetida (mismo estudiante y grupo), viola el índice único | documento duplicado | eliminar el duplicado |
| BD-25 | evaluations | `2dd4` Taller | los porcentajes del grupo `2c3a` suman 110 | `30` | `20` |
| BD-26 | grades | `2dd7`, `2dd8` | notas alteradas | `3` | `3.4` |
| BD-27 | grades | `2df0` | nota fuera de la escala 0–5 | `5.7` | `2.7` |
| BD-28 | grades | `2dfc` | nota fuera de la escala 0–5 | `5.7` | `2.6` |
| BD-29 | grades | `2dfd` | `evaluation` pertenece a otro grupo que la matrícula | `2e11` | `2df2` |
| BD-30 | grades | `2e1b` | `value` guardado como texto con coma | `"4,2"` | `2.7` |
| BD-31 | notifications | `2eb7` | `type` fuera del enum | `aviso_urgente` | `matricula_confirmada` |
| BD-32 | notifications | `2ec0` | `createdAt` guardado como texto | `"ayer"` | `2026-08-02T00:00:00Z` |

## Verificación tras corregir (ejecutada)

1. `node scripts/db-audit.js` sin avisos (guardar en `evidencias/bd-auditoria-despues.txt`).
2. `npm run db:import` importa las 13 colecciones sin error.
3. La API arranca, `/health` responde `database: up` y los tres usuarios de prueba inician sesión.

Resultado:

- Auditoría: `Sin problemas de integridad` (`evidencias/bd-auditoria-despues.txt`). En la salida inicial, los 47 avisos `grades :: timestamps` eran un falso positivo de la regla (el seed genera notas con fecha futura) y la regla se retiró; el resto eran reales.
- Comparación con los datos regenerados por `db-seed.js`: sin diferencias, salvo fechas `readAt` que dependen del día de ejecución.
- `npm run db:import`: 13 colecciones importadas sin error; índices únicos creados (`programs.code_1`, `enrollments.student_1_group_1`, `users.email_1`).
- `GET /api/v1/health` → `{"status":"ok","database":"up"}`.
- Login por API **no verificado**: `POST /auth/login` devuelve 400 `password must be longer than or equal to 12 characters` (bug de backend en `login.dto.ts`). A nivel de datos, la auditoría confirma que los 201 hashes corresponden a la clave documentada.

## Bugs de backend vistos de paso (para la rama `be`)

| Archivo | Problema |
|---|---|
| `src/reports/reports.module.ts` | `ReportsService` comentado: la API no arranca. **Corregido aquí** porque bloqueaba el arranque. |
| `src/main.ts` | Escucha en `APP_PORT`/3001 en vez de `PORT`/3000; prefijo `api/v1` en vez de `api`; Swagger en `api/doc` en vez de `api/docs`. |
| `src/auth/dto/login.dto.ts` | Exige clave de 12 caracteres; la documentada tiene 10 y nadie puede iniciar sesión. |
