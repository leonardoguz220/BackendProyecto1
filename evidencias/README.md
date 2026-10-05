# Evidencias de base de datos

El detalle de cada bug (dónde, problema, solución y cómo demostrarlo) está en la sección **Base de datos** de [`BUGS.md`](../BUGS.md). Esta carpeta solo guarda las salidas que lo respaldan.

| Archivo | Qué es |
|---|---|
| `bd-auditoria-antes.txt` | Salida de `scripts/db-audit.js` sobre los datos originales del examen (commit `edd8a7d`): 63 avisos |
| `bd-auditoria-despues.txt` | La misma auditoría sobre los datos corregidos: sin avisos |

## Cómo repetir la verificación

```
node scripts/db-audit.js        # audita database/*.json; no necesita MongoDB
npm run db:import               # importa las 13 colecciones sin error
```

Un bug puede producir varios avisos en la auditoría (por ejemplo, el día `Miércoles` de DB-18 también ocultaba el cruce de salón de DB-29), por eso 63 avisos corresponden a 30 bugs.
