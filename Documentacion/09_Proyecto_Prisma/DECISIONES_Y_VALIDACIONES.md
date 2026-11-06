# Traducción DER v0.8 → esquema Prisma: revisión técnica

## Decisiones confirmadas respetadas

- Planes semanales ligados al entrenador principal y compartidos entre sus grupos.
- Un solo grupo activo por club y un solo entrenador principal activo para cada atleta (requieren restricciones fuera de Prisma).
- Día planificado guarda texto completo, nota y color orientativo, y no inventa bloques rígidos de especialidad.
- Registro diario autónomo por club/atleta/fecha, conservado aunque cambie el entrenador o el plan.
- Tres estados de registro, con motivo opcional de falta; sensaciones basadas en lo declarado por el atleta.
- Prueba única por disciplina y torneo, categoría única por inscripción y sexo histórico copiado al inscribirse.
- Un solo precio por prueba configurado en Torneo, copiado a cada InscripcionPrueba.
- Marca de referencia opcional independiente de PB/SB: NULL equivale a «Sin marca».
- Series agrupadas por prueba/categoría/sexo, con capacidad 6 o 15, asociadas a exportación.
- Cuenta de cobro por club; permisos de Organizador por club, no por torneo.
- Crédito/reintegro como registro administrativo y no como movimiento bancario real.
- PB actual único y SB opcional por año, con campo vacío al iniciar temporada nueva.
- Documentos médicos vinculados a almacenamiento privado, sin guardar el archivo en la base.
- Fechas de tareas por torneo para desplazar cierre y Excel con la postergación.

## Restricciones técnicas aún NO garantizadas solo con Prisma

1. Una sola membresía de grupo vigente **por club**: la FK a Grupo no incorpora `clubId` en MembresiaGrupo. Se debe exigir mediante transacción serializable/lock por usuario y club o rediseñar con clave controlada y restricción SQL.
2. Evitar solapamientos de membresías históricas; `hasta IS NULL` no alcanza para intervalos temporales.
3. Asegurar que una InscripcionPrueba pertenezca al mismo torneo de Inscripcion, tenga habilitada su categoría, y conserve sexo/categoría correctos en SeriePista.
4. Un atleta puede tener a lo sumo una AsignacionSerie por exportación y prueba, y no superar la capacidad de una serie: validación transaccional/índices adicionales.
5. Un crédito nunca debe aplicarse dos veces ni quedar con saldo negativo; todas las operaciones requieren transacción y bloqueo del saldo.
6. Validación del apto inicial y permisos de acceso a documentos; la responsabilidad posterior de renovación anual permanece en el usuario según lo acordado.
7. El padrón oficial para validación del entrenador deberá definirse como datos de referencia o validación externa/administrativa; no se añadió una tabla sin confirmar su estructura.
8. Comprobación del acceso público **de solo lectura** y formato real de Google Sheets, incluidos colores: prueba técnica necesaria.
9. Políticas de retención/eliminación y privacidad antes de producción, en particular datos médicos.
10. Se usa `sexoCompetencia String` para no inventar opciones o criterios que no fueron aprobados.
11. La regla `12–15` en mediofondo/fondo es objetivo, con máximo 15; las series de 6 se aplican solo a modalidades configuradas para carriles.
12. La política de prorrogación del cierre y Excel por postergación debe aplicarse en el servicio, reprogramando/cancelando tareas anteriores.

## Elecciones técnicas propuestas (no nuevas funcionalidades)

- Claves UUID con `@default(uuid())`.
- Fechas de calendario como `@db.Date`; horarios y eventos como `DateTime` (almacenar en UTC y mostrar según zona del club).
- Importes en `Decimal(12,2)` y marcas en `Decimal(12,3)`: revisar unidades/precisión por disciplina antes de importar resultados reales.
- Algunos estados auxiliares (`estadoLectura`, `modalidadSalida`, `estadoValidacion`) se mantienen como `String` hasta formalizar catálogo de valores.
- El listado de especialidades y palabras clave se implementará primero en lógica de lectura/resaltado, no como una entidad que parta el contenido del entrenamiento.

## Pendiente para la próxima revisión

Antes de aplicar migraciones, conviene decidir si el MVP necesita historial de las membresías y asignaciones o solo el estado actual. La propuesta conserva el historial porque lo contempla el DER original; es más flexible, pero requiere índices y transacciones adicionales.

El SQL proporcionado es **un borrador**, no se comprobó contra una base PostgreSQL ejecutándose. No se ha corrido `prisma validate` ni migraciones dentro de este entorno.
