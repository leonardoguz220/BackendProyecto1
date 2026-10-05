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

## Base de datos

## Frontend
