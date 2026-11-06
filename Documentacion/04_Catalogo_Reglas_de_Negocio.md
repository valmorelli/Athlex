# Catálogo de Reglas de Negocio

## Plataforma Web PWA de Gestión de Entrenamiento para Atletismo

**Versión:** 1.5 · **Estado:** Borrador para revisión · **Documento anterior en la cadena:** `03_Catalogo_Requerimientos.md`

---

## 1. Cómo Leer este Documento

Este catálogo define **bajo qué condiciones exactas** el sistema debe comportarse de una forma u otra (formato SI/ENTONCES). No repite los Requerimientos Funcionales sin bifurcación.



---

## 2. Categoría A — Planificación y Versionado de Planes

| ID    | Regla                                                                                                                                                                                                                                                                                                   | Origen |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| RN-01 | **SI** el Entrenador Principal presiona "Sincronizar" y la semana seleccionada en Google Sheets **ya tiene registros cargados por los atletas**, **ENTONCES** el sistema debe conservar esos registros (asistencia, sensación, clima, calzado) y re-asociarlos día por día al nuevo contenido parseado. | DK-01  |
| RN-02 | **SI** la sincronización corresponde a una semana futura sin registros previos, **ENTONCES** no aplica migración: el plan simplemente se actualiza en blanco.                                                                                                                                           | DK-01  |
| RN-03 | **SI** la fecha detectada en la pestaña de Google Sheets corresponde a una semana pasada ya bloqueada (posterior al domingo), **ENTONCES** el sistema ignora esos cambios en la base de datos para proteger la inmutabilidad del historial.                                                             | RF-89  |

---

## 3. Categoría B — Registro Diario y Tolerancia Temporal

| ID    | Regla                                                                                                                                                                                                                              | Origen  |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| RN-04 | **SI** la fecha actual está dentro de la misma semana calendario del entrenamiento no registrado (hasta el domingo 23:59 hs de esa semana), **ENTONCES** el atleta puede completar o editar retroactivamente ese registro.         | Alcance |
| RN-05 | **SI** ya comenzó la semana siguiente (a partir del lunes), **ENTONCES** los registros de la semana anterior quedan bloqueados de forma permanente para edición — esto aplica tanto a los registros del Atleta como al Entrenador. | DK-19   |

---

## 4. Categoría C — Torneos Propios: Inscripción, Pago y Cierre

| ID    | Regla                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Origen              |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| RN-06 | **SI** alguien crea cuenta Atleta o Participante externo sin adjuntar apto médico, **ENTONCES** se bloquea el registro. La renovación anual posterior corresponde al usuario desde su perfil; la aplicación no revalida clínicamente ni bloquea automáticamente inscripciones por vencimiento posterior. | OE-04 |
| RN-07 | **SI** un participante elige una categoría elegible para un torneo (propia por año de nacimiento o superior habilitada), **ENTONCES** conserva esa misma categoría en todas las pruebas. No hay máximo general ni bloqueo por horarios simultáneos. | DK-15 |
| RN-08 | **SI** un atleta ya está inscripto en un torneo determinado, **ENTONCES** el sistema debe impedir una segunda inscripción de esa misma persona a ese mismo torneo (una inscripción por atleta por torneo). Aplica a todo tipo de torneo, propio o federativo.                                                                                                                                                                                                                      | DK-13               |
| RN-09 | **SI** Mercado Pago confirma una transacción nueva válida con importe y referencia coincidentes, **ENTONCES** pago=Acreditado e inscripción=Confirmada; los avisos duplicados no generan confirmaciones ni ingresos duplicados. | DK-11 |
| RN-10 | **SI** la inscripción usa transferencia nueva o comprobante de crédito previo, **ENTONCES** pago=Pendiente de verificación e inscripción=Pendiente hasta revisión manual del Organizador del torneo. | DK-11 |
| RN-11 | **SI** el Organizador rechaza el comprobante, **ENTONCES** pago=Rechazado e inscripción=Rechazada; al volver a adjuntarlo ambos regresan a Pendiente. | DK-16 |
| RN-12 | **SI** una inscripción se confirma, rechaza o cancela, **ENTONCES** el sistema notifica al inscripto; los cambios de estado del pago se registran separadamente. | DK-22 |
| RN-13 | Todos los pagos de torneos propios del mismo club se destinan a la única cuenta institucional de ese club, sin depender del grupo ni del Organizador. Los clubes futuros no comparten cuenta. | DK-09 |
| RN-14 | **SI** la fecha/hora actual supera la fecha límite de inscripción del torneo, **ENTONCES** el sistema bloquea nuevas inscripciones a ese torneo. La fecha límite es el miércoles 23:59 hs por defecto, o el martes 12:00 hs si el torneo es Provincial organizado en la pista propia.                                                                                                                                                                                              | DK-07               |
| RN-15 | El Excel de un torneo se genera **una sola vez** el día anterior a la fecha vigente del evento a las 22:00 (Argentina), con todas las inscripciones Confirmadas disponibles en ese instante. | DK-17 |
| RN-16 | **SI** al cierre de inscripciones quedan solicitudes Pendientes, **ENTONCES** se notifica al Organizador para que pueda revisarlas hasta la generación del Excel. | DK-17 |
| RN-17 | **SI** se resuelven solicitudes antes de la generación programada, **ENTONCES** se incluyen en el Excel del día anterior; no se crea ningún archivo previo. | DK-17 |
| RN-18 | **SI** a las 22:00 del día anterior quedan Pendientes, **ENTONCES** el Excel incluye una sección separada de pendientes con categoría y pruebas. Las aprobaciones posteriores se incorporan manualmente por el Organizador a su copia; no hay regeneración automática. | DK-17 |
| RN-19 | Los pagos nuevos Acreditados de un torneo se contabilizan una sola vez como recaudación nueva. Los créditos aplicados desde pagos previos se muestran por separado y no se suman otra vez como nuevos ingresos. | DK-06 |
| RN-20 | **SI** un atleta reutiliza un pago acordado como crédito, **ENTONCES** selecciona «Transferencia», adjunta el comprobante original y el Organizador comprueba manualmente el origen y saldo disponible antes de aprobarlo. No se solicita pago nuevo por Mercado Pago. | DK-02 |
| RN-21 | Los reintegros monetarios y su acuerdo se tramitan fuera de la plataforma. El Organizador puede dejar constancia administrativa de Reintegrado o Aplicado como crédito, con importe y origen; el registro no ejecuta transferencia. | DK-02 |
| RN-22 | El sistema no gestiona la inscripción de equipos a pruebas de relevos (4x100m/4x400m) en esta versión; la conformación del equipo para esas pruebas queda a cargo del Organizador por fuera de la plataforma.                                                                                                                                                                                                                                                                      | Fuera de Alcance §5 |
| RN-23 | El Organizador edita torneo y PDF mientras la inscripción está abierta. **SI** retira una prueba con inscriptos, **ENTONCES** se notifica a sus inscriptos y se explica cómo contactar a organización por pagos conjuntos. Tras el cierre solo se permite cancelar/postergar el torneo. | DK-24 |
| RN-24 | **SI** se cancela/posterga un torneo, **ENTONCES** se notifica a los inscriptos y se permiten registros administrativos de reintegro/crédito acordados, pero sin procesar dinero desde la aplicación. **SI** el Organizador comunica una nueva fecha antes de generar el Excel, **ENTONCES** se recalculan y reprograman el cierre de inscripción y la generación del Excel conforme a esa fecha. | DK-25 / DK-38 |

---

## 5. Categoría D — Torneos Federativos (FAM / CADA)

| ID    | Regla                                                                                                                                                                                                              | Origen |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| RN-25 | Las fechas de torneos federativos se cargan siempre de forma manual por el Administrador/Entrenador, ya que no existe una API pública de estas entidades para automatizar la carga.                                | DK-08  |
| RN-26 | El listado interno de atletas interesados en un torneo federativo es exclusivamente una herramienta de organización propia — en ningún caso constituye una inscripción oficial ante la federación correspondiente. | DK-10  |

---

## 6. Categoría E — Resultados, Marcas y Podios

| ID    | Regla                                                                                                                                                                                                                                   | Origen  |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| RN-27 | El Atleta ingresa manualmente PB y otras marcas en su ficha; el sistema las almacena como autodeclaradas, sin compararlas ni homologarlas automáticamente como récord oficial. | Alcance |
| RN-28 | La modalidad «con Final» determina el podio por resultados de Final **solo como referencia deportiva** para un módulo futuro; la aplicación actual no calcula podios oficiales. | Anexo A |
| RN-29 | La modalidad «sin Final» ordena tiempos del conjunto de series **solo como referencia deportiva** para un módulo futuro; la aplicación actual no calcula podios oficiales. | Anexo A |
| RN-30 | Decatlón y heptatlón mantienen su composición y orden de disciplinas como referencia de modelado futuro; no se implementa cómputo automático de puntajes en esta versión. | Anexo A |



---

## 7. Categoría F — Usuarios y Permisos

| ID    | Regla                                                                                                                                                                                                                                                                                                                                                                                                                                          | Origen    |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| RN-31 | El Entrenador Principal puede asignar o revocar permiso Organizador a una cuenta Atleta/Entrenador para torneos concretos. Este permiso solo habilita información administrativa del torneo asignado y no da acceso adicional a dashboards. | Sección 6 |
| RN-32 | **SI** un usuario tiene el perfil "Participante externo", **ENTONCES** su interfaz debe restringirse únicamente a las secciones de Perfil y Torneos — y dentro de Torneos, solo puede ver y gestionar la inscripción a torneos propios organizados por la institución, sin acceso a la cuenta regresiva ni al listado de torneos federativos, que son exclusivos de Atletas y Entrenadores.                                                    | DK-12     |
| RN-33 | Al crear una cuenta Atleta se exigen nombre, apellido, fecha de nacimiento, email, contraseña, Entrenador Principal y apto médico; foto, peso, historial médico, ficha deportiva y 1RM se completan luego. Participante externo exige datos personales básicos, credenciales y apto. | DK-14 |
| RN-34 | **SI** un usuario intenta registrarse como Entrenador y su DNI/Licencia no figura en el padrón oficial precargado de la federación, **ENTONCES** la cuenta no se activa ni permite asociar atletas.                                                                                                                                                                                                                                            | Alcance   |
| RN-35 | **SI** un usuario solicita restablecer su contraseña, **ENTONCES** el sistema debe enviar un enlace de un solo uso a su email registrado, que deja de ser válido al usarse o al superar el tiempo límite de vigencia (a definir con el equipo técnico, ej. 1 hora).                                                                                                                                                                            | DK-18     |

---

## 8. Categoría G — Sesión y Auditoría

| ID    | Regla                                                                                                                                                                                                                                                                                                                                                           | Origen |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| RN-36 | La sesión de un usuario permanece iniciada indefinidamente y solo se cierra automáticamente tras 2 meses consecutivos sin actividad en la aplicación.                                                                                                                                                                                                           | DK-05  |
| RN-37 | **SI** un Entrenador (o un usuario con permiso de Organizador) realiza un cambio administrativo (aprobación de inscripción, edición de plan, creación de torneo, etc.), **ENTONCES** el sistema debe registrar su ID de usuario junto con la acción realizada y el momento exacto.                                                  | DK-03  |
| RN-38 | Las acciones de un Atleta sobre sus propios datos personales o de entrenamiento no generan registros de auditoría administrativa, ya que no involucran permisos de ese tipo.                                                                                                                                                                                    | DK-03  |
| RN-39 | **SI** se reactiva la cuenta antes de un año de inactividad, **ENTONCES** se restaura su acceso e historial. **SI** transcurre un año, **ENTONCES** se elimina/anonimiza el perfil personal según política de retención, conservando los históricos administrativos/deportivos estrictamente necesarios. | DK-21 |

---

## 9. Categoría H — Asistencia, sensaciones y datos autodeclarados

| ID | Regla | Origen |
| --- | --- | --- |
| RN-40 | Los días esperados de entrenamiento son de lunes a viernes. **Completado** cuenta asistencia; **No realizado** y **Sin registrar** cuentan ambos falta, pero se informan por separado. | DK-31 |
| RN-41 | **SI** el Atleta marca No realizado, **ENTONCES** puede seleccionar motivo: descanso indicado, suspensión por lluvia, enfermedad, lesión, personal u otro; no se requieren sensación ni calzado. | DK-31 |
| RN-42 | **SI** el Atleta entrena por su cuenta, **ENTONCES** puede marcar Completado y explicar en observaciones la rutina efectivamente realizada. | DK-31 |
| RN-43 | El RPE real declarado admite Verde=Muy suave, Amarillo=Suave, Naranja=Medio, Rojo=Fuerte y Violeta=Molestia/dolor/lesión; las estadísticas excluyen los colores orientativos del entrenador y usan como denominador los Completados con sensación. | DK-32 |
| RN-44 | La distribución se calcula como registros Completados con cada sensación / total Completados con sensación × 100; ejemplo: 2 rojos entre 10 completados = 20 %. | DK-32 |
| RN-45 | El Organizador solo administra y consulta los torneos asignados; el Entrenador Secundario puede consultar todos los datos autorizados de atletas asociados, pero no modificar planes. | DK-35 |
| RN-46 | Los créditos requieren origen/monto/saldo; una aplicación reduce el saldo disponible para evitar doble utilización. El reintegro se marca solo tras una operación externa acordada. | DK-02 |
| RN-47 | **SI** una prueba con inscriptos se elimina durante la inscripción abierta, **ENTONCES** se notifica a cada afectado con el texto: «Si hiciste el pago en conjunto con otra prueba, por favor comunicate con los organizadores». | DK-37 |
| RN-48 | La renovación del apto médico después de su carga inicial queda a cargo del usuario; su vencimiento no bloquea automáticamente las inscripciones posteriores en la versión aprobada. | DK-33 |
| RN-49 | En marcas manuales, menor tiempo es mejor en carreras, mayor distancia en saltos/lanzamientos y se conserva unidad, precisión, viento y estados especiales; el sistema no certifica homologación ni validez oficial. | DK-34 |

## Reglas adicionales — Acceso a Sheets y postergaciones

| ID | Regla | Origen |
| --- | --- | --- |
| RN-44 | **SI** la hoja Google Sheets no está configurada como «Cualquier persona con el enlace: Lector» o su enlace no puede leerse, **ENTONCES** el sistema no sincroniza, mantiene el plan publicado y pide al Entrenador corregir la configuración. | DK-36 / RF-118 |
| RN-45 | **SI** un torneo es postergado y se establece una nueva fecha **antes de la generación del Excel**, **ENTONCES** se vuelve a calcular el cierre (miércoles 23:59 o martes 12:00 según tipo de torneo), se cancela la tarea de exportación anterior y se programa una sola para las 22:00 del día anterior a la nueva fecha. | DK-07 / DK-38 |
| RN-46 | **SI** el Excel ya fue generado cuando se posterga el torneo, **ENTONCES** se conserva la exportación existente y se informa al Organizador que no habrá generación automática adicional hasta definir explícitamente cómo proceder. | DK-38 |
