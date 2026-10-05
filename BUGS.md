# Bitácora de bugs

Estados: corregido y verificado, corregido sin verificar, sospecha, pendiente.

| ID | Módulo | Problema | Estado | Commit |
|---|---|---|---|---|
| BE-25 | reports | ReportsService no registrado: la API no arranca | corregido y verificado | fix(BE-25) |
| BE-01 | main | Prefijo global api/v1 en vez de api | corregido y verificado | fix(BE-01) |
| BE-03 | main | Puerto leído de APP_PORT con default 3001 | corregido y verificado | fix(BE-03) |

## Backend

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

## Base de datos

## Frontend
