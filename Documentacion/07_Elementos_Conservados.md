# Registro de elementos conservados — 06/11/2026

Se preservan los elementos originales no incompatibles con las decisiones aprobadas. En particular:

## Visión y alcance
- Propósito de reemplazar planillas/WhatsApp; objetivos OE-01 a OE-06; PWA mobile-first, operación offline y notificaciones.
- Biblioteca de ejercicios, calculadora 1RM, tiempos de pasada, cuenta regresiva federativa, inscripciones administrativas a torneos propios.
- Exclusión de procesamiento real de cobros, reintegros automáticos, scraping federativo, publicación en tiendas y relevos como inscripción de equipos.
- Persistencia de sesión con cierre tras dos meses de inactividad; bloqueo de edición tras domingo 23:59.

## Anexo
- Catálogo de pruebas de sábado y domingo, disciplinas de decatlón/heptatlón y distinción entre series y Final.

## Requerimientos
- Estructura RF/RNF, prioridades y orígenes; lectura cromática orientativa de Sheets, post-its de Notas, realce de especialidad, dashboard de alertas violeta, calculadoras y biblioteca.
- Registro del clima, calzado y observaciones; control retroactivo de la semana; notificaciones; logs administrativos; recuperación de contraseña.
- Modelo híbrido de Mercado Pago/transferencia, fechas de cierre de inscripción, Excel por categoría y prueba, cuenta regresiva federativa.

## Reglas de negocio
- Sincronización en semana vigente que conserva registros diarios del atleta (RN-01 a RN-05), una inscripción por atleta/torneo, límites temporales, aprobación manual de transferencias, gestión de torneos federativos solamente interna.
- Cuenta externa con interfaz restringida y permisos de organizador adicionales, no rol independiente; bloqueo de semanas cerradas.

## Casos de uso
- Todos los CU-01 a CU-50 conservan su identificación; los no afectados mantienen sus flujos detallados.
- CU-37 conserva exclusivamente carga/consulta del PDF oficial; CU-41 listado interno federativo, CU-47 recordatorio de cierre, CU-50 cierre por inactividad.

**Nota:** «conservado» no implica que toda línea textual sea idéntica: se armonizó terminología donde la definición aprobada requería aclaración.

## Se conserva tras la actualización sobre Sheets y postergaciones

- Sincronización manual bajo demanda, a partir de la URL de Sheets y sin alterar registros de atletas ya cargados.
- Un único Excel por torneo, generado en la víspera a las 22:00, con solicitudes pendientes en sección aparte y sin regeneración automática rutinaria.
- Criterios de cierre del torneo por tipo de competencia, ahora recalculados frente a postergaciones.
- Reembolsos y movimientos reales de dinero fuera de la plataforma; los registros administrativos se mantienen.
- Renovación anual del apto a cargo del usuario y cuestiones legales pendientes de validación.

