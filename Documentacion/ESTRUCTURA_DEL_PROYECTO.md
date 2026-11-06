# Dónde se guarda cada archivo

| Archivo del paquete Prisma anterior | Nueva ubicación |
|---|---|
| `package.json` | `Backend/package.json` (ampliado para Express) |
| `docker-compose.yml` | `Backend/docker-compose.yml` |
| `.env.example` | `Backend/.env.example` (se agregó PORT/FRONTEND_URL) |
| `prisma.config.ts` | `Backend/prisma.config.ts` |
| `prisma/schema.prisma` | `Backend/prisma/schema.prisma` |
| `src/prisma.ts` | `Backend/src/prisma.ts` |
| `sql/restricciones_adicionales.sql` | `Backend/sql/restricciones_adicionales.sql` |
| `README.md` y `DECISIONES_Y_VALIDACIONES.md` | `Documentacion/09_Proyecto_Prisma/` |

El frontend es independiente del backend: **cada carpeta tiene su propio `package.json`, `node_modules` y `.env`**.

Los documentos funcionales y DER no se guardan bajo `src`, ya que no son código ejecutable.

El `schema.prisma` es un borrador traído del proyecto previo. Algunas restricciones y reglas (como armados de series) se implementarán en servicios de backend y deben probarse antes de producción.
