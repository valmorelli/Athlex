# Catálogo de Requerimientos Funcionales y No Funcionales

## Plataforma Web PWA de Gestión de Entrenamiento para Atletismo

**Versión:** 1.1 · **Estado:** Borrador para revisión · **Documento anterior en la cadena:** `01_Vision_y_Alcance.md`

---

## 1. Cómo Leer este Documento

Este catálogo traduce el alcance definido en el Documento de Visión a requerimientos concretos, numerados y verificables. Cada requerimiento debe poder implementarse y probarse de forma independiente.

### 1.1 Tipos de Requerimiento

- **RF-XX (Requerimiento Funcional):** describe algo que el sistema **debe hacer** — una acción, un cálculo, una validación o un comportamiento concreto y observable.
  
  > Ejemplo: *"El sistema debe permitir al Entrenador sincronizar una hoja de Google Sheets con la planificación semanal."*

- **RNF-XX (Requerimiento No Funcional):** describe una **cualidad o condición general** que el sistema debe cumplir, transversal a varios módulos. No es una acción puntual, sino un atributo de cómo funciona el sistema en su conjunto (qué tan rápido responde, qué tan seguro es, si funciona sin internet, etc.).
  
  > Ejemplo: *"La aplicación debe permitir registrar el entrenamiento del día aunque no haya conexión a internet en ese momento."*

En resumen: **RF = qué hace el sistema. RNF = cómo lo hace** (de bien, rápido, seguro, disponible, etc.).

### 1.2 Campos de cada Requerimiento

| Campo           | Significado                                                                                                                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ID**          | Identificador único (RF-01, RNF-01, etc.). Sirve para que el programador y el tester referencien siempre el mismo requerimiento, sin ambigüedad.                                                                                                          |
| **Descripción** | El requerimiento en sí, redactado siempre como una obligación del sistema ("El sistema debe...").                                                                                                                                                         |
| **Prioridad**   | **Alta:** imprescindible para la primera versión funcional (MVP). **Media:** importante y planificada para la v1, pero no bloquea un lanzamiento si hay que recortar por tiempo. **Baja:** deseable, mejora o *nice-to-have*, candidato a fase posterior. |
| **Origen**      | De dónde sale este requerimiento: un Objetivo Específico (OE-XX) o una Decisión de Diseño (DK-XX) del Documento de Visión. Sirve para rastrear el porqué de cada requerimiento.                                                                           |

---

## 2. Módulo 1 — Gestión de Planificación Semanal (Google Sheets)

**Qué resuelve:** es el corazón del sistema. Permite que el Entrenador siga trabajando con su Google Sheets habitual, y que la app lo transforme automáticamente en las dos vistas del Atleta (semanal panorámica y diaria en tarjetas), conservando los registros ya cargados cuando el plan se actualiza.

| ID    | Descripción                                                                                                                                                                                              | Prioridad | Origen |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ |
| RF-01 | El sistema debe permitir al Entrenador Principal vincular la URL de una hoja Google Sheets configurada como «Cualquier persona con el enlace: Lector», y comprobar que sea legible antes de sincronizar.                                                   | Alta      | OE-01  |
| RF-02 | El sistema debe proveer un botón "Sincronizar Planilla" para que el Entrenador Principal actualice los planes bajo demanda hacia los atletas.                                                            | Alta      | OE-01  |
| RF-03 | Al accionar la sincronización, el sistema debe solicitar al Entrenador Principal seleccionar la pestaña de la Hoja de Cálculo (ej. "Macro 2") de la cual desea extraer los datos.                        | Alta      | OE-01  |
| RF-04 | El sistema debe parsear dinámicamente la hoja de cálculo seleccionada, identificando los bloques semanales al buscar la palabra "semana" y asociándolos a la fecha indicada debajo de dicha celda.       | Alta      | OE-01  |
| RF-05 | El sistema debe presentar la vista semanal panorámica y las tarjetas diarias del contenido interpretado de Google Sheets, sin exigir carga manual de archivos. | Alta | OE-01 |
| RF-06 | El sistema debe interpretar los colores de fondo del plan como intensidad orientativa indicada por el Entrenador, separada de la sensación registrada por el Atleta. | Alta | OE-01 |
| RF-07 | El sistema debe identificar la especialidad del atleta y resaltarla (negrita/recuadro) dentro del bloque general de texto sincronizado.                                                                  | Media     | OE-01  |
| RF-08 | El sistema debe extraer el contenido de la fila "Notas/observaciones" de Google Sheets y mostrarlo como una alerta visual o post-it destacado en la vista diaria del atleta. | Media     | OE-01  |
| RF-09 | Al volver a sincronizar una semana en curso, el sistema debe actualizar el contenido del plan por día y conservar sin alteraciones los estados, sensaciones, observaciones, clima y calzado ya cargados por los atletas. | Alta | DK-01 |
| RF-10 | El sistema debe permitir al Entrenador consultar el historial de sincronizaciones y versiones de planes de una semana.                                                                                   | Media     | DK-01  |
| RF-89 | El sistema debe ignorar sincronizaciones para una semana ya cerrada (posterior al domingo 23:59 hs de esa semana), protegiendo el historial.                                                             | Alta      | DK-19  |

---

## 3. Módulo 2 — Registro Diario del Atleta

**Qué resuelve:** digitaliza lo que hoy el atleta anota "a mano": si entrenó, cómo se sintió, en qué condiciones, con qué calzado. Insumo principal de los dashboards del entrenador.

| ID     | Descripción                                                                                                                                                           | Prioridad | Origen     |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- |
| RF-11  | El sistema debe mostrar al Atleta el plan del día en su Portada Principal.                                                                                            | Alta      | OE-02      |
| RF-12 | El sistema debe permitir seleccionar «Completado» o «No realizado»; la falta de registro se representa como «Sin registrar». | Alta | OE-02 |
| RF-13 | Para un día Completado, el sistema debe exigir sensación: Verde (Muy suave), Amarillo (Suave), Naranja (Medio), Rojo (Fuerte), Violeta (Molestia/dolor/lesión). | Alta | OE-02 |
| RF-103 | El sistema debe representar cada nivel de sensación (RPE) con un ícono o etiqueta de texto además del color, para garantizar accesibilidad a usuarios con daltonismo. | Media     | DK-28      |
| RF-14  | El sistema debe permitir cargar observaciones subjetivas en texto libre.                                                                                              | Alta      | OE-02      |
| RF-15  | El sistema debe permitir registrar condiciones climáticas (temperatura, lluvia, viento).                                                                              | Media     | OE-02      |
| RF-16 | Cuando el día está Completado, el sistema debe exigir seleccionar calzado (zapatillas o clavos); cuando está No realizado, no se exige calzado ni sensación. | Alta | OE-02 |
| RF-17  | El sistema debe permitir editar registros de días anteriores dentro de la semana en curso (hasta domingo 23:59 hs).                                                   | Alta      | Alcance §4 |
| RF-18  | El sistema debe bloquear la edición de semanas pasadas desde el lunes siguiente.                                                                                      | Alta      | Alcance §4 |
| RF-19  | El sistema debe registrar la fecha original del entrenamiento y la fecha/hora exacta de guardado.                                                                     | Alta      | OE-06      |
| RF-20 | Al finalizar un día de lunes a viernes sin intervención, el sistema debe asignar «Sin registrar»; tanto «Sin registrar» como «No realizado» cuentan como falta. Los fines de semana no integran la asistencia semanal esperada. | Alta | Alcance §4 |

---

## 4. Módulo 3 — Panel del Entrenador / Dashboards

**Qué resuelve:** ahorra la revisión manual semanal, dando métricas y alertas ya procesadas.

| ID    | Descripción                                                                                   | Prioridad | Origen |
| ----- | --------------------------------------------------------------------------------------------- | --------- | ------ |
| RF-21 | El sistema debe calcular asistencia diaria como Completados / atletas con entrenamiento esperado de lunes a viernes × 100, diferenciando No realizado y Sin registrar. | Alta | OE-03 |
| RF-22 | El gráfico debe mostrar la proporción de sensaciones reales informadas por atletas con entrenamiento Completado; no incluir los colores orientativos de Google Sheets. | Alta | OE-03 |
| RF-23 | El sistema debe alertar visualmente a los atletas en sensación Violeta.                       | Alta      | OE-03  |
| RF-24 | El sistema debe permitir ver el desglose individual de cada atleta y sus datos del día.       | Alta      | OE-03  |
| RF-25 | El dashboard semanal debe mostrar asistencias y distribución de sensaciones reales, sin equiparar los colores subjetivos a una carga física cuantitativa. | Media | OE-03 |
| RF-26 | El sistema debe mostrar una matriz de rendimiento de todos los atletas.                       | Media     | OE-03  |
| RF-27 | El sistema debe mostrar al Atleta asistencias Completadas sobre cinco días previstos de lunes a viernes y distribución de sus sensaciones registradas. | Media | OE-03 |

---

## 5. Módulo 4 — Gestión de Torneos Propios (UNLP)

**Qué resuelve:** reemplaza la gestión por chat privado. Cubre desde la creación del torneo hasta el cierre de inscripciones y la exportación a Excel.

| ID     | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Prioridad | Origen        |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------- |
| RF-28 | El Organizador debe crear torneos con nombre, fechas, categorías habilitadas, pruebas disponibles por categoría y su configuración específica, asociados al club. | Alta | Alcance §4 |
| RF-29  | El Organizador debe poder adjuntar un archivo PDF que contenga el cronograma de horarios del evento.                                                                                                                                                                                                                                                                                                                                                                | Alta      | Alcance §4    |
| RF-30  | El sistema debe mostrar y permitir la visualización o descarga del PDF del cronograma a los atletas inscriptos.                                                                                                                                                                                                                                                                                                                                                     | Media     | Alcance §4    |
| RF-31  | El sistema debe exigir autenticación para inscribirse a un torneo propio.                                                                                                                                                                                                                                                                                                                                                                                           | Alta      | OE-04         |
| RF-32 | Al inscribirse, el sistema debe comprobar que exista un apto médico cargado en el perfil; el archivo se exige al crear la cuenta. La renovación anual posterior corresponde al usuario, sin validación clínica o bloqueo automático por vencimiento. | Alta | OE-04 |
| RF-33 | El sistema debe bloquear la creación de cuenta de Atleta o Participante externo si no se adjunta apto médico, y permitir renovarlo desde el perfil. | Alta | OE-04 |
| RF-34 | El sistema debe permitir elegir una única categoría elegible (por año de nacimiento, propia o superior habilitada) por torneo, y pruebas solo de esa categoría, sin límite de cantidad ni bloqueo por solapamiento horario. | Alta | OE-04 / DK-15 |
| RF-35 | El sistema debe registrar por separado el estado de inscripción y el estado del pago, exigiendo comprobante en transferencias nuevas o verificación de transacción nueva de Mercado Pago. | Alta | OE-04 |
| RF-36 | El sistema debe mostrar el alias/CBU/CVU de la única cuenta institucional del club para todos sus torneos propios. | Alta | DK-09 |
| RF-37  | El sistema debe redirigir al checkout de Mercado Pago cuando se elija ese medio.                                                                                                                                                                                                                                                                                                                                                                                    | Alta      | DK-11         |
| RF-38 | Ante una transacción nueva de Mercado Pago acreditada y verificada en el servidor, el sistema debe marcar el pago Acreditado y la inscripción Confirmada automáticamente, sin sumar créditos anteriores como ingresos nuevos. | Alta | DK-11 |
| RF-39 | Las transferencias y aplicaciones de crédito deben quedar Pendientes de verificación hasta aprobación manual del Organizador autorizado para el torneo. | Alta | DK-11 |
| RF-40  | El sistema debe bloquear inscripciones tras la fecha límite (miércoles 23:59 hs; martes 12:00 hs para Provinciales en pista propia).                                                                                                                                                                                                                                                                                                                                | Alta      | DK-07         |
| RF-41 | El sistema debe mostrar los importes de pagos nuevos acreditados para el torneo por separado de los créditos de pagos anteriores aplicados, evitando doble conteo. | Media | DK-06 |
| RF-42 | El sistema debe mostrar los importes administrativos de un torneo solo a su Organizador autorizado; el permiso no da acceso a dashboards de entrenamiento. | Media | DK-06 |
| RF-43 | El sistema debe generar automáticamente una única exportación Excel el día anterior a la fecha vigente del torneo a las 22:00 (Argentina), con hojas por categoría y bloques por prueba, incluyendo sección separada de pendientes. | Alta | OE-04 |
| RF-44 | Para reutilizar un pago anterior aprobado como crédito, el participante debe elegir transferencia, adjuntar el comprobante original y someterlo a aprobación manual, con referencia al pago/torneo de origen. | Alta | DK-02 |
| RF-95  | El sistema debe notificar al Atleta cuando el estado de su inscripción a un torneo cambie a "Confirmada" o "Rechazada".                                                                                                                                                                                                                                                                                                                                             | Alta      | DK-22         |
| RF-96  | El sistema debe enviar un recordatorio al Organizador unos días antes de la fecha límite de inscripción de un torneo, indicando cuántas solicitudes siguen pendientes de revisión.                                                                                                                                                                                                                                                                                  | Media     | DK-23         |
| RF-97 | El Organizador puede editar torneos abiertos, incluido el PDF, y retirar pruebas habilitadas; si hay inscriptos en una prueba retirada, el sistema debe notificarles las instrucciones de contacto por pagos conjuntos. | Alta | DK-24 |
| RF-98 | Una vez cerradas las inscripciones no se editan datos ni pruebas del torneo, salvo cancelar o postergar el torneo; toda baja de prueba durante apertura con inscriptos requiere notificación. | Media | DK-24 |
| RF-99  | El sistema debe permitir al Organizador marcar un torneo como "Cancelado" o "Postergado" y, si se fija nueva fecha, recalcular y guardar el nuevo cierre de inscripciones y momento de exportación.                                                                                                                                                                                                                                                                                                                                                                           | Alta      | DK-25         |
| RF-100 | El sistema debe notificar automáticamente a todos los atletas inscriptos cuando un torneo sea marcado como "Cancelado" o "Postergado".                                                                                                                                                                                                                                                                                                                              | Alta      | DK-25         |
| RF-77  | El sistema debe impedir que un mismo atleta se inscriba más de una vez a un mismo torneo (una inscripción por atleta por torneo), sin importar si el torneo es propio o federativo.                                                                                                                                                                                                                                                                                 | Alta      | DK-13         |

---

## 6. Módulo 5 — Torneos Federativos (FAM / CADA)

**Qué resuelve:** da visibilidad y organización sobre torneos que NO organiza la institución, sin prometer una integración imposible (no existe API pública de estas federaciones).

| ID    | Descripción                                                                                                                                        | Prioridad | Origen     |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- |
| RF-45 | El Administrador/Entrenador debe poder cargar manualmente fechas de torneos de FAM/CADA u otras federaciones.                                      | Alta      | DK-08      |
| RF-46 | El sistema debe mostrar cuenta regresiva por torneo federativo cargado, visible para Atleta y Entrenador.                                          | Alta      | DK-08      |
| RF-47 | El Organizador debe poder acceder, al hacer clic en la cuenta regresiva, a un listado interno de atletas interesados (datos, pruebas, categorías). | Media     | DK-10      |
| RF-48 | El sistema debe permitir agregar/quitar atletas de ese listado, sin que constituya inscripción oficial.                                            | Media     | DK-10      |
| RF-49 | El Atleta debe poder cargar manualmente una marca o PB por prueba, registrando valor/unidad, evento, viento si corresponde y estados DNS, DNF, DQ o NM; no existe importación automática. | Alta | Alcance §4 |
| RF-50 | El sistema debe permitir consultar y editar los PB y SB cargados manualmente por el propio Atleta, distinguiendo los datos autodeclarados de resultados oficiales. | Media | Alcance §4 |
| RF-51 | El sistema podrá documentar disciplinas de pruebas combinadas para una fase futura; no se exige cálculo automático de puntajes en la primera versión. | Baja | Anexo A §4 |
| RF-52 | El sistema conserva como referencia los criterios de podio con Final o por tiempos entre series; el cálculo de podios oficiales queda fuera de la primera versión. | Baja | Anexo A §5 |

---

## 7. Módulo 6 — Gimnasio y Calculadoras Técnicas

**Qué resuelve:** da autonomía técnica al atleta, sobre todo a principiantes.

| ID    | Descripción                                                                            | Prioridad | Origen |
| ----- | -------------------------------------------------------------------------------------- | --------- | ------ |
| RF-53 | El sistema debe mostrar una biblioteca de ejercicios categorizada, con videos o fotos. | Media     | OE-05  |
| RF-54 | El sistema debe generar aleatoriamente una rutina de N ejercicios de una categoría.    | Baja      | OE-05  |
| RF-55 | El sistema debe calcular el peso a levantar aplicando % sobre el 1RM del perfil.       | Media     | OE-05  |
| RF-56 | El sistema debe calcular el tiempo objetivo de pasada según % de la marca personal.    | Media     | OE-05  |
| RF-57 | El sistema debe aplicar un coeficiente distinto según calzado (zapatillas o clavos).   | Media     | OE-05  |

---

## 8. Módulo 7 — Usuarios y Perfiles

**Qué resuelve:** define qué datos guarda el sistema de cada usuario y qué puede ver/hacer cada uno.

| ID     | Descripción                                                                                                                                                                                                                                                                                                                                                                               | Prioridad | Origen                    |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------- |
| RF-58  | El sistema debe permitir registro/autenticación diferenciada de Atleta, Entrenador y Participante externo.                                                                                                                                                                                                                                                                                | Alta      | Sección 6                 |
| RF-59 | En el registro de Atleta son obligatorios nombre, apellido, fecha de nacimiento, email, contraseña, Entrenador Principal y apto médico adjunto; foto, peso, historial médico, ficha deportiva y 1RM se completan progresivamente. La categoría se calcula por año de nacimiento. | Alta | Sección 6 / DK-14 / DK-15 |
| RF-60 | El sistema debe exigir el adjunto de apto médico al crear cuentas Atleta y Participante externo, guardar fecha de carga y permitir renovar el documento desde el perfil cada año sin bloquear automáticamente inscripciones posteriores. | Alta | OE-04 |
| RF-61  | El sistema debe almacenar la ficha deportiva (pruebas, PBs, SBs).                                                                                                                                                                                                                                                                                                                         | Media     | Sección 6                 |
| RF-62  | El sistema debe almacenar el historial médico (lesiones, zonas sensibles, tratamientos).                                                                                                                                                                                                                                                                                                  | Media     | Sección 6                 |
| RF-63  | El sistema debe almacenar los valores de test de fuerza (1RM).                                                                                                                                                                                                                                                                                                                            | Media     | OE-05                     |
| RF-64  | El sistema debe ofrecer un checklist de viaje personalizable.                                                                                                                                                                                                                                                                                                                             | Baja      | Sección 6                 |
| RF-65  | El perfil del Entrenador debe incluir nombre, foto, licencia federativa y vencimiento.                                                                                                                                                                                                                                                                                                    | Media     | Sección 6                 |
| RF-66  | El Entrenador debe poder ver su listado de atletas agrupados por especialidad.                                                                                                                                                                                                                                                                                                            | Media     | Sección 6                 |
| RF-67  | El sistema debe mostrar al Entrenador un contador de PBs de su grupo en la temporada.                                                                                                                                                                                                                                                                                                     | Baja      | Sección 6                 |
| RF-68 | El sistema debe almacenar una única cuenta institucional por club (alias/CBU/CVU y datos de Mercado Pago), sin asociar cuentas de cobro individuales a entrenadores. | Alta | DK-09 |
| RF-69  | El sistema debe restringir la interfaz del Participante externo únicamente a las secciones de Perfil y Torneos; dentro de Torneos, debe limitarse a la inscripción a torneos propios organizados por la institución, sin acceso a la sección de torneos federativos (cuenta regresiva, listado interno de atletas, etc.).                                                                 | Alta      | DK-12                     |
| RF-70 | El Entrenador Principal debe poder asignar a una cuenta de Atleta o Entrenador un permiso de Organizador limitado a torneos determinados del club. | Alta | Sección 6 |
| RF-71 | El Entrenador Principal debe poder revocar el permiso de Organizador sobre un torneo; tener este permiso no otorga acceso a dashboards deportivos. | Media | Sección 6 |
| RF-78 | El perfil de Participante externo exige nombre, apellido, fecha de nacimiento, email, contraseña y apto médico adjunto; no exige campos deportivos de Atleta. | Alta | DK-14 |
| RF-79  | El sistema debe permitir omitir la carga de la foto de perfil para cualquier tipo de usuario (Atleta, Entrenador, Participante externo).                                                                                                                                                                                                                                                  | Baja      | DK-14                     |
| RF-80  | El sistema NO debe gestionar la inscripción de equipos a pruebas de relevos (4x100m/4x400m) en esta versión; la conformación del equipo queda a cargo del Organizador por fuera de la plataforma.                                                                                                                                                                                         | Media     | Fuera de Alcance §5       |
| RF-81 | El sistema debe registrar por separado una inscripción Rechazada y un pago Rechazado cuando el comprobante sea inválido, permitiendo adjuntar otro y volver a Pendiente. | Alta | DK-16 |
| RF-82 | El sistema debe programar una única generación de Excel el día anterior a la fecha vigente del torneo a las 22:00; si se posterga antes de generarse, debe cancelar la ejecución anterior y programar la nueva. | Alta | DK-17 |
| RF-83 | Al cerrarse las inscripciones y antes de generar el Excel, el sistema debe avisar al Organizador si existen solicitudes Pendientes de revisión. | Alta | DK-17 |
| RF-84 | El sistema debe generar el Excel el día anterior al torneo a las 22:00 aun con solicitudes Pendientes, sin regeneración automática posterior. | Alta | DK-17 |
| RF-85 | El Excel debe incluir una hoja o sección de «Inscripciones Pendientes de Aprobación» con participante, categoría y pruebas; aprobaciones posteriores se agregan manualmente a la copia exportada. | Alta | DK-17 |
| RF-86  | El sistema debe exigir que todo usuario (Atleta, Entrenador, Participante externo) registre un email válido como parte de su perfil, utilizado tanto para el login como para la recuperación de contraseña.                                                                                                                                                                               | Alta      | DK-18                     |
| RF-87  | El sistema debe permitir a cualquier usuario solicitar el restablecimiento de su contraseña ingresando su email registrado.                                                                                                                                                                                                                                                               | Alta      | DK-18                     |
| RF-88  | El sistema debe enviar al email del usuario un enlace de restablecimiento de contraseña, de un solo uso y con vencimiento a la hora de haber sido generado.                                                                                                                                                                                                                               | Alta      | DK-18                     |
| RF-90 | El Atleta tiene un Entrenador Principal y puede asociar varios Entrenadores Secundarios. El sistema distingue clubes y grupos para permitir otros conjuntos independientes sin mezclar información. | Alta | DK-20 |
| RF-104 | El Entrenador Secundario puede consultar todos los datos, dashboards y documentos médicos autorizados de sus atletas asociados, pero no crear, subir, editar ni sincronizar planes de entrenamiento. | Alta | DK-29 |
| RF-105 | El Entrenador Principal responsable del club puede configurar la única cuenta de cobro institucional para todos los torneos propios de ese club. | Alta | DK-09 |
| RF-91  | El sistema debe permitir al Entrenador marcar la cuenta de un Atleta como "Inactiva" cuando este deja el grupo.                                                                                                                                                                                                                                                                           | Alta      | DK-21                     |
| RF-92  | El sistema debe ocultar a los Atletas con cuenta "Inactiva" de los listados y dashboards activos del Entrenador, conservando su historial completo.                                                                                                                                                                                                                                       | Alta      | DK-21                     |
| RF-93  | El sistema debe permitir al Entrenador reactivar la cuenta de un Atleta "Inactivo", restaurando su acceso y manteniendo intacto su historial previo.                                                                                                                                                                                                                                      | Alta      | DK-21                     |
| RF-94 | Al cumplirse un año de inactividad, el sistema debe eliminar/anonimizar datos personales de la cuenta, preservando solo información histórica administrativa/deportiva necesaria según política de retención. | Alta | DK-21 |
| RF-101 | El sistema debe exigir que toda contraseña tenga un mínimo de 8 caracteres, incluyendo al menos una letra mayúscula, una minúscula y un número.                                                                                                                                                                                                                                           | Alta      | DK-26                     |
| RF-102 | El sistema debe exigir que el usuario ingrese su email dos veces al registrarse (dos campos), validando que ambos coincidan exactamente antes de permitir continuar.                                                                                                                                                                                                                      | Alta      | DK-27                     |

---

## 9. Módulo 8 — Notificaciones y Reglas Temporales

| ID    | Descripción                                                                                  | Prioridad | Origen     |
| ----- | -------------------------------------------------------------------------------------------- | --------- | ---------- |
| RF-72 | El sistema debe enviar push a las 19:00 hs a quien no registró su entrenamiento del día.     | Alta      | Alcance §4 |
| RF-73 | El sistema debe cerrar sesión automáticamente solo tras 2 meses consecutivos de inactividad. | Alta      | DK-05      |

---

## 10. Módulo 9 — Auditoría y Trazabilidad

| ID    | Descripción                                                                                      | Prioridad | Origen |
| ----- | ------------------------------------------------------------------------------------------------ | --------- | ------ |
| RF-74 | El sistema debe registrar el ID del Entrenador responsable de cada cambio administrativo.        | Alta      | DK-03  |
| RF-75 | El sistema debe permitir consultar el historial de cambios administrativos (quién, qué, cuándo). | Media     | DK-03  |
| RF-76 | El sistema NO debe generar logs de auditoría por acciones del Atleta sobre sus propios datos.    | Media     | DK-03  |

---

## 11. Requerimientos No Funcionales (Transversales)

| ID     | Descripción                                                                                                                                                                                                                      | Prioridad | Origen              |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------- |
| RNF-01 | Interfaz operable con una sola mano en mobile.                                                                                                                                                                                   | Alta      | Supuestos §7        |
| RNF-02 | Debe permitir consultar el plan y registrar entrenamiento sin conexión, sincronizando después.                                                                                                                                   | Alta      | Supuestos §7        |
| RNF-03 | Debe instalarse en pantalla de inicio sin pasar por App Store/Google Play.                                                                                                                                                       | Alta      | Fuera de Alcance §5 |
| RNF-04 | La sincronización de Google Sheets debe ofrecer respuesta visible de progreso, éxito o fallo, y rechazar datos estructuralmente inválidos sin borrar el plan vigente; el tiempo objetivo se medirá con una planilla de referencia definida en pruebas. | Media | OE-01 |
| RNF-05 | Debe soportar 50 a 100 inscriptos simultáneos sin degradación.                                                                                                                                                                   | Alta      | Supuestos §7        |
| RNF-06 | Los adjuntos médicos deben estar protegidos por autorización individual: atleta y entrenadores asociados autorizados; para torneos, Organizador solo accede a la información administrativa necesaria y no a historiales médicos completos. | Alta | Fuera de Alcance §5 |
| RNF-07 | Cumplimiento de la Ley de Protección de Datos Personales (Ley 25.326).                                                                                                                                                           | Alta      | Fuera de Alcance §5 |
| RNF-08 | El endpoint de webhook de Mercado Pago debe estar disponible, verificar autenticidad e importe, vincular el pago a la inscripción y procesar eventos duplicados de forma idempotente. | Alta | DK-11 |
| RNF-09 | Los registros de entrenamiento no deben poder eliminarse, solo editarse dentro de la ventana de tolerancia.                                                                                                                      | Alta      | OE-06               |
| RNF-10 | Compatibilidad con Chrome/Safari en sus últimas dos versiones mayores.                                                                                                                                                           | Media     | Supuestos §7        |
| RNF-11 | Interfaz solo en español (Argentina) en esta versión.                                                                                                                                                                            | Baja      | —                   |
| RNF-12 | Las notificaciones push programadas se enviarán desde servidor con soporte PWA/Service Worker cuando el dispositivo y navegador lo permitan; si no hay permiso, el evento quedará visible en la aplicación. | Alta | Alcance §4 |
| RNF-13 | Todo registro debe guardar fecha/hora de creación de forma inmutable.                                                                                                                                                            | Alta      | OE-06               |
| RNF-14 | Debe existir backup periódico de la base de datos.                                                                                                                                                                               | Media     | —                   |
| RNF-15 | Debe validarse el tamaño máximo de archivos adjuntos.                                                                                                                                                                            | Media     | OE-04               |
| RNF-16 | La autenticación persistirá de forma segura hasta 2 meses de inactividad, mediante sesiones renovables, revocables y con protección de credenciales. | Alta | DK-05 |
| RNF-17 | **Edición Parcial:** Todos los formularios de edición (perfil, torneos, configuraciones) deben precargar los datos vigentes en los campos y permitir modificaciones parciales sin exigir la recarga de la información existente. | Alta      | UX                  |

---


### Requerimientos añadidos en la revisión del 06/11/2026

| ID | Descripción | Prioridad | Origen |
| --- | --- | --- | --- |
| RF-106 | El Atleta puede marcar «No realizado» y escoger como motivo descanso indicado, suspensión por lluvia, lesión, enfermedad, personal u otro, con observación opcional; todos cuentan como falta. | Alta | DK-31 |
| RF-107 | El sistema debe permitir registrar un entrenamiento realizado por cuenta propia como Completado y describir la rutina en observaciones. | Alta | DK-31 |
| RF-108 | El Organizador debe registrar administrativamente un pago «Reintegrado» o «Aplicado como crédito», indicando monto, origen y referencia, sin ejecutar movimientos de dinero. | Alta | DK-02 / DK-16 |
| RF-109 | El sistema debe asociar cada crédito con el pago y torneo original e impedir que su saldo sea consumido dos veces. | Alta | DK-02 |
| RF-110 | Si se retira una prueba con inscriptos durante la inscripción abierta, el sistema debe notificarles la baja e incluir el mensaje para quienes pagaron varias pruebas conjuntamente. | Alta | DK-37 |
| RF-111 | Las herramientas que requieren PB o 1RM deben informar qué dato falta y solicitar completarlo en el perfil sin bloquear el registro inicial. | Media | DK-14 |
| RF-112 | El sistema debe verificar que la hoja vinculada sea legible mediante el enlace de acceso público para lectores y mostrar un error accionable si el permiso es insuficiente, la URL es incorrecta, cambia la estructura o los datos son ilegibles; la lectura debe conservar colores y formato. | Alta | DK-36 |
| RF-113 | El sistema debe mostrar estado de pago y de inscripción por separado, incluyendo Cancelada y pagos Reintegrado/Aplicado como crédito, visibles según permiso. | Alta | DK-16 |
| RF-114 | El sistema debe guardar a qué club, grupo y torneo pertenece cada objeto y aplicar filtros de acceso entre clubes sin mezclar sus datos. | Alta | DK-20 / DK-35 |
| RF-115 | El sistema debe permitir al Atleta registrar manualmente resultados con su unidad, precisión, viento cuando aplique y estados DNS, DNF, DQ o NM, sin calcular homologación oficial. | Media | DK-34 |
| RF-116 | El sistema debe conservar el registro de estado de faltas y sus motivos para consulta del Entrenador, separando «No realizado» de «Sin registrar» aunque ambos cuenten ausencia. | Alta | DK-31 |

## 12. Resumen de Trazabilidad

Todo requerimiento debe poder rastrearse a un Objetivo Específico (OE-XX) o Decisión de Diseño (DK-XX) del Documento de Visión. Si aparece un requerimiento sin origen claro, es señal de que se está agregando alcance no acordado — hay que volver primero al Documento de Visión.

### RNF adicionales

| ID | Descripción | Prioridad | Origen |
| --- | --- | --- | --- |
| RNF-18 | Los registros offline pendientes deben sincronizarse sin sobrescribir silenciosamente ediciones posteriores; se informa al usuario cualquier conflicto. | Alta | DK-36 |
| RNF-19 | Se deben validar permisos y aislar por club/grupo/torneo todos los accesos de lectura y escritura en el servidor, no solo ocultar pantallas. | Alta | DK-35 / DK-36 |
| RNF-20 | Los PDF médicos y comprobantes deben almacenarse privadamente, con límites de tipo/tamaño y acceso autenticado, sin URL pública permanente. | Alta | DK-33 / DK-36 |
| RNF-21 | Las operaciones de créditos, reintegros y pagos deben conservar referencias e impedir duplicados, con auditoría administrativa. | Alta | DK-02 / DK-36 |
| RNF-22 | La reprogramación de las tareas de cierre y Excel ante postergaciones debe evitar ejecuciones duplicadas o en fechas obsoletas y registrar la fecha anterior y la nueva. | Alta | DK-25 / DK-38 |

### Nuevos requerimientos sobre postergaciones y permisos de Sheets

| ID | Descripción | Prioridad | Origen |
| --- | --- | --- | --- |
| RF-117 | Si el Organizador posterga un torneo y fija una nueva fecha antes de la exportación, el sistema debe recalcular automáticamente el cierre de inscripción según el tipo de torneo (DK-07), reprogramar la única generación del Excel a las 22:00 de la víspera y anular las tareas de la fecha anterior. | Alta | DK-25 / DK-38 |
| RF-118 | El sistema debe exigir que la hoja vinculada tenga acceso «Cualquier persona con el enlace: Lector», mostrar instrucciones para configurar ese permiso y no intentar leer hojas privadas sin acceso. | Alta | DK-36 |
| RF-119 | Si se posterga un torneo cuyo Excel ya se generó, el sistema debe conservar el archivo y advertir al Organizador que una nueva exportación requiere una decisión explícita; no deberá sobrescribirlo ni duplicarlo automáticamente. | Alta | DK-38 |
