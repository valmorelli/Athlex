# Base de datos Atletismo — implementación inicial (borrador v0.9)

Fuente: `08_DER_Logico_Modular_v0.8.md`. Este repositorio es el **primer esquema técnico**, no una base de datos ya migrada o validada. No modifica la documentación funcional existente.

## Requisitos

- Node.js compatible con Prisma ORM 7 (recomendada versión 22 LTS actualizada).
- Docker Desktop y Docker Compose.
- npm.

## Preparar entorno de desarrollo

```bash
npm install
cp .env.example .env
# En Windows PowerShell: Copy-Item .env.example .env
docker compose up -d db
npx prisma validate
npx prisma migrate dev --name inicial
npx prisma generate
npx prisma studio
```

**Antes de ejecutar la primera migración definitiva**: generar la migración con `npx prisma migrate dev --name inicial --create-only`, revisar el SQL, incorporar `sql/restricciones_adicionales.sql` al final del archivo `migration.sql`, y ejecutar `npx prisma migrate dev`. No uses las dos variantes consecutivamente sin revisar el estado de migraciones.

Si usás la variante `--create-only`, no ejecutes primero la variante automática del bloque inicial. Ambas se ofrecen como caminos alternativos.

El proyecto no contiene contraseñas de producción: `.env` debe permanecer fuera de Git. Las credenciales incluidas en Docker son únicamente para el entorno local.

## Estructura

- `prisma/schema.prisma`: modelos y relaciones Prisma (propuesta inicial).
- `prisma.config.ts`: conexión Prisma v7 desde `DATABASE_URL`.
- `src/prisma.ts`: instancia del cliente con adaptador PostgreSQL.
- `docker-compose.yml`: PostgreSQL local.
- `sql/restricciones_adicionales.sql`: SQL pendiente de insertar en una migración revisada.
- `DECISIONES_Y_VALIDACIONES.md`: límites y diferencias respecto al DER.

## No cubierto todavía

No hay servidor Express, endpoints, autorización, seed de datos, implementación del lector Google Sheets, planificador de tareas, integración Mercado Pago ni generador de Excel. Son etapas posteriores.
