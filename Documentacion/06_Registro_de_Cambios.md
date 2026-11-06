# Registro de cambios — 06/11/2026

**Base:** cinco documentos originales aportados por la usuaria. **Resultado:** revisión por decisiones aprobadas, no rediseño del producto.

## 01 Visión y Alcance
- DK-02, 06, 09, 11, 14, 15, 16, 17, 20, 21 y 24 revisadas; DK-31 a DK-37 incorporadas.
- Apto obligatorio en registro, resto del perfil progresivo; asistencia con motivo; 5 colores reales.
- Multi-grupo/multi-club previsto, cobro único por club y permiso Organizador acotado.
- Pagos/acreditaciones separados de inscripciones, crédito/reintegro administrativos sin ejecutar transacciones.
- Exportación única el día anterior 22:00; marcas manuales.

## 02 Anexo de Pruebas
- Nueva sección 6: categoría única, múltiples pruebas y horarios superpuestos, habilitación por torneo, baja de prueba, resultados autodeclarados.
- Podios y combinadas preservados como referencia futura, no módulo de cálculo oficial actual.

## 03 Catálogo de Requerimientos
- Corregidos RF-04/RF-05 duplicados: RF-05 ahora exige las vistas panorámica y diaria. RF-09 corregido en formato.
- Actualizados RF diarios 12, 13, 16, 20-22, 25, 27; torneos 28, 32-44, 81-85, 97-98; resultados 49-52; perfiles 59-60, 68, 70-71, 78, 90, 94, 104-105.
- Nuevos RF-106 a RF-116: falta/motivos, entrenamiento propio, crédito y reintegro, bajas de prueba, datos progresivos, errores de Sheets, aislamiento de clubes, resultados.
- Mejoras técnicas RNF-04, 06, 08, 12, 16 y nuevos RNF-18 a RNF-21.

## 04 Reglas de Negocio
- Reescritas reglas afectadas RN-06-24, 27-31, 33, 39; nuevas RN-40 a RN-49.
- Se eliminó la generación anticipada y las referencias al cómputo automático de podios/PB oficiales.
- Recaudación nueva separada de créditos aplicados y auditoría de movimientos administrativos.

## 05 Casos de Uso
- Reescritos flujos de registro, asistencia, inscripción, resultados, Sheets, torneos, créditos y exportación manteniendo IDs originales.
- CU-23 y CU-24 unificados con Google Sheets y preservación de registros.
- CU-37 conservado como adjunto PDF; no carga horaria estructurada.
- Nuevos CU-51 y CU-52. Matriz de permisos incorporada.

## Precisiones técnicas agregadas sin modificar la propuesta funcional
- Google Sheets privado necesita permiso de acceso inicial; presionar Sincronizar ejecuta la lectura, no otorga por sí mismo acceso a una hoja privada.
- Webhooks de Mercado Pago verificados e idempotentes; datos de salud protegidos; conflictos offline informados; sesiones seguras.
- Limitaciones: no hay interpretación médica, homologación oficial de PB, cómputo de podios ni ejecución de reintegros.

## Puntos explícitos de implementación aún abiertos (no inventados)
- **Resuelto:** el entrenador debe habilitar «Cualquier persona con el enlace: Lector» en Google Sheets. Ya no se exige OAuth del entrenador; el equipo técnico elegirá la lectura apropiada que conserve colores de celdas.
- Política concreta de conservación de datos históricos y acceso médico compatible con Ley 25.326: validar antes de producción.
- En la versión acordada, la renovación anual de apto es responsabilidad del usuario y no bloquea automáticamente inscripción; revisar riesgo administrativo con el club.
- **Resuelto:** cuando el torneo se posterga y se define nueva fecha antes de la exportación, se trasladan conjuntamente el cierre de inscripciones y la tarea de Excel, anulando la anterior. Si el archivo ya existe, no se regenera automáticamente sin decisión explícita.

## Actualización adicional — Decisiones confirmadas por el usuario

- Hoja Sheets accesible mediante permiso de lectura «Cualquier persona con el enlace», sin OAuth del Entrenador. Se agregaron DK-36, RF-01, RF-112, RF-118, RN-44 y CU-23 en coherencia.
- Postergación de torneo: recalcular fecha de cierre y Excel a partir de la nueva fecha del torneo, respetando la generación única de la víspera a las 22:00. Se actualizaron DK-17, DK-25, DK-38, RF-43, RF-82, RF-99, RF-117, RF-119, RN-15, RN-24, RN-45, RN-46, CU-40 y CU-46.
- Permanece pendiente la política de conservación de datos y acceso médico según Ley 25.326; también permanece a validar con el club la renovación anual del apto sin bloqueo automático.
- Precaución: una hoja accesible por enlace puede ser consultada por cualquier persona con la URL; evitar información sensible en esa hoja.

