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

## Base de datos

## Frontend
