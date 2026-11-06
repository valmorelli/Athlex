# Athlex — estructura inicial

## Carpetas
- `Documentacion/`: documentos aprobados, modelos de datos, wireframes y mockups.
- `Frontend/`: interfaz React + Vite + TypeScript.
- `Backend/`: API Express + PostgreSQL + Prisma.

## Requisitos previos
- Node.js compatible con las versiones instaladas de Vite y Prisma (recomendado Node 22 actual).
- npm.
- Docker Desktop abierto para usar PostgreSQL local.

## 1. Abrir el proyecto
Desde Visual Studio Code, `Archivo > Abrir carpeta...` y elegir `Athlex`.

## 2. Backend (terminal 1, PowerShell)
```powershell
cd Backend
Copy-Item .env.example .env
npm install
docker compose up -d db
npx prisma validate
npx prisma generate
npm run dev
```
API: http://localhost:3000/api/health

**Atención:** el `schema.prisma` proviene del borrador v0.9 previo y todavía necesita una validación real. No ejecutes migraciones en una base con datos antes de revisar los resultados de `prisma validate`.

Para preparar una migración sin aplicarla:
```powershell
npx prisma migrate dev --name inicial --create-only
```
Inspeccioná el SQL y las reglas adicionales de `Backend/sql/restricciones_adicionales.sql` antes de aplicar. Este SQL no se ejecuta automáticamente.

## 3. Frontend (terminal 2, PowerShell, desde Athlex)
```powershell
cd Frontend
Copy-Item .env.example .env
npm install
npm run dev
```
Frontend: http://localhost:5173

Si elegís `Terminal > Nueva terminal` en VS Code, cada terminal mantiene su propia carpeta de trabajo.

## 4. Comprobación
- `/api/health` debe responder JSON con `status: ok`.
- En el frontend debe aparecer `Conexión con el backend correcta`.
- Esta comprobación solo valida la conexión entre frontend y backend, NO la conexión a PostgreSQL.

## Nota
No se incluye autenticación funcional, endpoints de atletas, importación de Google Sheets ni pagos: se desarrollarán después de validar el esquema y los flujos.
