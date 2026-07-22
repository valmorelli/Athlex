# Catálogo de Requerimientos Funcionales y No Funcionales
## Plataforma Web PWA de Gestión de Entrenamiento para Atletismo

**Versión:** 1.0 · **Estado:** Borrador para revisión · **Documento anterior en la cadena:** `01_Vision_y_Alcance.md`

---

## 1. Cómo Leer este Documento

Este catálogo traduce el alcance definido en el Documento de Visión a requerimientos concretos, numerados y verificables. Cada requerimiento debe poder implementarse y probarse de forma independiente.

### 1.1 Tipos de Requerimiento

- **RF-XX (Requerimiento Funcional):** describe algo que el sistema **debe hacer** — una acción, un cálculo, una validación o un comportamiento concreto y observable.
  > Ejemplo: *"El sistema debe permitir al Entrenador cargar un archivo .xlsx con la planificación semanal."*

- **RNF-XX (Requerimiento No Funcional):** describe una **cualidad o condición general** que el sistema debe cumplir, transversal a varios módulos. No es una acción puntual, sino un atributo de cómo funciona el sistema en su conjunto (qué tan rápido responde, qué tan seguro es, si funciona sin internet, etc.).
  > Ejemplo: *"La aplicación debe permitir registrar el entrenamiento del día aunque no haya conexión a internet en ese momento."*

En resumen: **RF = qué hace el sistema. RNF = cómo lo hace** (de bien, rápido, seguro, disponible, etc.).

### 1.2 Campos de cada Requerimiento

| Campo | Significado |
|---|---|
| **ID** | Identificador único (RF-01, RNF-01, etc.). Sirve para que el programador y el tester referencien siempre el mismo requerimiento, sin ambigüedad. |
| **Descripción** | El requerimiento en sí, redactado siempre como una obligación del sistema ("El sistema debe..."). |
| **Prioridad** | **Alta:** imprescindible para la primera versión funcional (MVP). **Media:** importante y planificada para la v1, pero no bloquea un lanzamiento si hay que recortar por tiempo. **Baja:** deseable, mejora o *nice-to-have*, candidato a fase posterior. |
| **Origen** | De dónde sale este requerimiento: un Objetivo Específico (OE-XX) o una Decisión de Diseño (DK-XX) del Documento de Visión. Sirve para rastrear el porqué de cada requerimiento. |

---

## 2. Módulo 1 — Gestión de Planificación Semanal (Excel)

**Qué resuelve:** es el corazón del sistema. Permite que el Entrenador siga trabajando con su Excel de siempre, y que la app lo transforme automáticamente en las dos vistas del Atleta (semanal panorámica y diaria en tarjetas), conservando los registros ya cargados cuando el plan se actualiza.

| ID | Descripción | Prioridad | Origen |
|---|---|---|---|
| RF-01 | El sistema debe permitir al Entrenador cargar un archivo .xlsx desde la sección de planificación semanal. | Alta | OE-01 |
| RF-02 | El sistema debe validar que el archivo respete la estructura estandarizada de celdas (columnas B–F = días, filas 3–9 = bloques) antes de procesarlo. | Alta | OE-01 |
| RF-03 | El sistema debe rechazar el archivo y notificar al Entrenador con un mensaje claro si la estructura no es la esperada, indicando la celda/fila del problema. | Alta | OE-01 |
| RF-04 | El sistema debe parsear automáticamente el contenido validado y almacenarlo en la base de datos, mapeando cada celda a su día y bloque. | Alta | OE-01 |
| RF-05 | El sistema debe generar la Vista Semanal Panorámica, replicando la estética original (colores naranja, rojo, amarillo, verde, azul). | Alta | OE-01 |
| RF-06 | El sistema debe generar la Vista Diaria en tarjetas verticales, extrayendo la columna del día actual. | Alta | OE-01 |
| RF-07 | La Vista Semanal debe permitir desplazamiento horizontal fluido en mobile. | Media | OE-01 |
| RF-08 | El sistema debe resaltar el bloque "Trabajo Específico" si el atleta tiene marcada una especialidad (ej. Fondista). | Media | OE-01 |
| RF-09 | Al reemplazar el plan vigente **de una semana ya en curso**, el sistema debe conservar los registros ya cargados por los atletas y re-asociarlos día por día al nuevo contenido. No aplica al cargar el plan de una semana futura, ya que esta no tiene registros previos que migrar. | Alta | DK-01 |
| RF-10 | El sistema debe permitir al Entrenador consultar el historial de versiones de planes de una semana. | Media | DK-01 |

---

## 3. Módulo 2 — Registro Diario del Atleta

**Qué resuelve:** digitaliza lo que hoy el atleta anota "a mano": si entrenó, cómo se sintió, en qué condiciones, con qué calzado. Insumo principal de los dashboards del entrenador.

| ID | Descripción | Prioridad | Origen |
|---|---|---|---|
| RF-11 | El sistema debe mostrar al Atleta el plan del día en su Portada Principal. | Alta | OE-02 |
| RF-12 | El sistema debe permitir marcar el entrenamiento como "Completado". | Alta | OE-02 |
| RF-13 | El sistema debe exigir un color de sensación (Verde, Amarillo, Naranja, Rojo, Violeta) para completar el registro. | Alta | OE-02 |
| RF-14 | El sistema debe permitir cargar observaciones subjetivas en texto libre. | Alta | OE-02 |
| RF-15 | El sistema debe permitir registrar condiciones climáticas (temperatura, lluvia, viento). | Media | OE-02 |
| RF-16 | El sistema debe exigir la selección obligatoria del calzado (zapatillas o clavos). | Alta | OE-02 |
| RF-17 | El sistema debe permitir editar registros de días anteriores dentro de la semana en curso (hasta domingo 23:59 hs). | Alta | Alcance §4 |
| RF-18 | El sistema debe bloquear la edición de semanas pasadas desde el lunes siguiente. | Alta | Alcance §4 |
| RF-19 | El sistema debe registrar la fecha original del entrenamiento y la fecha/hora exacta de guardado. | Alta | OE-06 |
| RF-20 | El sistema debe asignar estado "Incompleto" (blanco) a un día sin interacción del atleta al cierre (23:59 hs). | Alta | Alcance §4 |

---

## 4. Módulo 3 — Panel del Entrenador / Dashboards

**Qué resuelve:** ahorra la revisión manual semanal, dando métricas y alertas ya procesadas.

| ID | Descripción | Prioridad | Origen |
|---|---|---|---|
| RF-21 | El sistema debe mostrar el % global de asistencia del día. | Alta | OE-03 |
| RF-22 | El sistema debe generar un gráfico circular con la distribución de sensaciones del grupo. | Alta | OE-03 |
| RF-23 | El sistema debe alertar visualmente a los atletas en sensación Violeta. | Alta | OE-03 |
| RF-24 | El sistema debe permitir ver el desglose individual de cada atleta y sus datos del día. | Alta | OE-03 |
| RF-25 | El sistema debe mostrar un dashboard semanal de asistencia acumulada e índice de carga (RPE). | Media | OE-03 |
| RF-26 | El sistema debe mostrar una matriz de rendimiento de todos los atletas. | Media | OE-03 |
| RF-27 | El sistema debe mostrar al Atleta su contador de asistencias semanales y promedio cromático. | Media | OE-03 |

---

## 5. Módulo 4 — Gestión de Torneos Propios (UNLP)

**Qué resuelve:** reemplaza la gestión por chat privado. Cubre desde la creación del torneo hasta el cierre de inscripciones y la exportación a Excel.

| ID | Descripción | Prioridad | Origen |
|---|---|---|---|
| RF-28 | El Organizador debe poder crear un torneo cargando nombre, fechas, categorías y pruebas. | Alta | Alcance §4 |
| RF-29 | El Organizador debe poder cargar manualmente el cronograma del evento (horario por prueba/categoría). | Alta | Alcance §4 |
| RF-30 | El sistema debe mostrar el cronograma a los atletas inscriptos. | Media | Alcance §4 |
| RF-31 | El sistema debe exigir autenticación para inscribirse a un torneo propio. | Alta | OE-04 |
| RF-32 | El sistema debe verificar automáticamente la vigencia del apto médico al inscribirse. | Alta | OE-04 |
| RF-33 | El sistema debe exigir cargar el apto médico si está vencido o ausente, bloqueando el avance. | Alta | OE-04 |
| RF-34 | El sistema debe filtrar las pruebas disponibles según categoría de edad (incluyendo superiores). | Alta | OE-04 |
| RF-35 | El sistema debe exigir comprobante de pago o confirmación de Mercado Pago para completar la inscripción. | Alta | OE-04 |
| RF-36 | El sistema debe mostrar el alias/CBU/CVU de la cuenta única de cobro (Kuki) para pago por transferencia. | Alta | DK-09 |
| RF-37 | El sistema debe redirigir al checkout de Mercado Pago cuando se elija ese medio. | Alta | DK-11 |
| RF-38 | El sistema debe consultar automáticamente el estado del pago vía API/webhooks de Mercado Pago y confirmar la inscripción sin intervención del Organizador. | Alta | DK-11 |
| RF-39 | El sistema debe dejar en estado "Pendiente" las inscripciones por transferencia hasta aprobación manual del Organizador. | Alta | DK-11 |
| RF-40 | El sistema debe bloquear inscripciones tras la fecha límite (miércoles 23:59 hs; martes 12:00 hs para Provinciales en pista propia). | Alta | DK-07 |
| RF-41 | El sistema debe calcular el monto total recaudado sumando solo inscripciones Aprobadas. | Media | DK-06 |
| RF-42 | El sistema debe mostrar ese monto únicamente al perfil con permiso de Organizador de Torneo. | Media | DK-06 |
| RF-43 | El sistema debe generar, al cierre, un Excel organizado en hojas por categoría y bloques por prueba. | Alta | OE-04 |
| RF-44 | El sistema debe exigir la carga de un comprobante de pago al reinscribirse a otro torneo tras una baja, pudiendo el atleta adjuntar el mismo archivo ya presentado anteriormente si el Entrenador decidió conservar ese pago como crédito. En ese caso, el sistema debe forzar que la inscripción se gestione por transferencia bancaria (nunca por Mercado Pago), ya que no existiría una transacción nueva que la API pudiera confirmar. | Alta | DK-02 |
| RF-77 | El sistema debe impedir que un mismo atleta se inscriba más de una vez a un mismo torneo (una inscripción por atleta por torneo), sin importar si el torneo es propio o federativo. | Alta | DK-13 |

---

## 6. Módulo 5 — Torneos Federativos (FAM / CADA)

**Qué resuelve:** da visibilidad y organización sobre torneos que NO organiza la institución, sin prometer una integración imposible (no existe API pública de estas federaciones).

| ID | Descripción | Prioridad | Origen |
|---|---|---|---|
| RF-45 | El Administrador/Entrenador debe poder cargar manualmente fechas de torneos de FAM/CADA u otras federaciones. | Alta | DK-08 |
| RF-46 | El sistema debe mostrar cuenta regresiva por torneo federativo cargado, visible para Atleta y Entrenador. | Alta | DK-08 |
| RF-47 | El Organizador debe poder acceder, al hacer clic en la cuenta regresiva, a un listado interno de atletas interesados (datos, pruebas, categorías). | Media | DK-10 |
| RF-48 | El sistema debe permitir agregar/quitar atletas de ese listado, sin que constituya inscripción oficial. | Media | DK-10 |
| RF-49 | El Atleta debe poder registrar resultados post-competencia (tiempo/distancia, viento, sensación) en torneos federativos y propios. | Alta | Alcance §4 |
| RF-50 | El sistema debe comparar cada marca contra el historial del atleta y detectar PBs. | Media | Alcance §4 |
| RF-51 | El sistema debe soportar Pruebas Combinadas (Decatlón/Heptatlón) acumulando puntaje entre sub-pruebas de ambos días. | Baja | Anexo A §4 |
| RF-52 | El sistema debe permitir definir el podio por Final o por ranking cronométrico entre series (sin Final). | Media | Anexo A §5 |

---

## 7. Módulo 6 — Gimnasio y Calculadoras Técnicas

**Qué resuelve:** da autonomía técnica al atleta, sobre todo a principiantes.

| ID | Descripción | Prioridad | Origen |
|---|---|---|---|
| RF-53 | El sistema debe mostrar una biblioteca de ejercicios categorizada, con videos o fotos. | Media | OE-05 |
| RF-54 | El sistema debe generar aleatoriamente una rutina de N ejercicios de una categoría. | Baja | OE-05 |
| RF-55 | El sistema debe calcular el peso a levantar aplicando % sobre el 1RM del perfil. | Media | OE-05 |
| RF-56 | El sistema debe calcular el tiempo objetivo de pasada según % de la marca personal. | Media | OE-05 |
| RF-57 | El sistema debe aplicar un coeficiente distinto según calzado (zapatillas o clavos). | Media | OE-05 |

---

## 8. Módulo 7 — Usuarios y Perfiles

**Qué resuelve:** define qué datos guarda el sistema de cada usuario y qué puede ver/hacer cada uno.

| ID | Descripción | Prioridad | Origen |
|---|---|---|---|
| RF-58 | El sistema debe permitir registro/autenticación diferenciada de Atleta, Entrenador y Participante externo. | Alta | Sección 6 |
| RF-59 | El perfil del Atleta debe incluir nombre, apellido, fecha de nacimiento, peso, ficha deportiva, historial médico, 1RM y categoría (calculada). Todos estos campos son obligatorios, ya que son insumo directo de las calculadoras de gimnasio y de tiempos de pasada; la única excepción es la foto de perfil, que es opcional. | Alta | Sección 6 / DK-14 |
| RF-60 | El sistema debe permitir cargar el PDF del Apto Médico vigente y su vencimiento. | Alta | OE-04 |
| RF-61 | El sistema debe almacenar la ficha deportiva (pruebas, PBs, SBs). | Media | Sección 6 |
| RF-62 | El sistema debe almacenar el historial médico (lesiones, zonas sensibles, tratamientos). | Media | Sección 6 |
| RF-63 | El sistema debe almacenar los valores de test de fuerza (1RM). | Media | OE-05 |
| RF-64 | El sistema debe ofrecer un checklist de viaje personalizable. | Baja | Sección 6 |
| RF-65 | El perfil del Entrenador debe incluir nombre, foto, licencia federativa y vencimiento. | Media | Sección 6 |
| RF-66 | El Entrenador debe poder ver su listado de atletas agrupados por especialidad. | Media | Sección 6 |
| RF-67 | El sistema debe mostrar al Entrenador un contador de PBs de su grupo en la temporada. | Baja | Sección 6 |
| RF-68 | El sistema debe almacenar el alias/CBU/CVU del Entrenador para cobros. | Alta | DK-09 |
| RF-69 | El sistema debe restringir la interfaz del Participante externo únicamente a las secciones de Perfil y Torneos; dentro de Torneos, debe limitarse a la inscripción a torneos propios organizados por la institución, sin acceso a la sección de torneos federativos (cuenta regresiva, listado interno de atletas, etc.). | Alta | DK-12 |
| RF-70 | El sistema debe permitir asignar el permiso de Organizador de Torneo a cualquier cuenta de Entrenador o Atleta. | Alta | Sección 6 |
| RF-71 | El sistema debe permitir revocar ese permiso. | Media | Sección 6 |
| RF-78 | El sistema debe solicitar al Participante externo únicamente los siguientes datos de perfil: nombre, apellido, fecha de nacimiento y apto médico vigente. No debe solicitarle otros campos propios del perfil de Atleta (peso, ficha deportiva, historial médico, 1RM, etc.). | Alta | DK-14 |
| RF-79 | El sistema debe permitir omitir la carga de la foto de perfil para cualquier tipo de usuario (Atleta, Entrenador, Participante externo). | Baja | DK-14 |

---

## 9. Módulo 8 — Notificaciones y Reglas Temporales

| ID | Descripción | Prioridad | Origen |
|---|---|---|---|
| RF-72 | El sistema debe enviar push a las 19:00 hs a quien no registró su entrenamiento del día. | Alta | Alcance §4 |
| RF-73 | El sistema debe cerrar sesión automáticamente solo tras 2 meses consecutivos de inactividad. | Alta | DK-05 |

---

## 10. Módulo 9 — Auditoría y Trazabilidad

| ID | Descripción | Prioridad | Origen |
|---|---|---|---|
| RF-74 | El sistema debe registrar el ID del Entrenador responsable de cada cambio administrativo. | Alta | DK-03 |
| RF-75 | El sistema debe permitir consultar el historial de cambios administrativos (quién, qué, cuándo). | Media | DK-03 |
| RF-76 | El sistema NO debe generar logs de auditoría por acciones del Atleta sobre sus propios datos. | Media | DK-03 |

---

## 11. Requerimientos No Funcionales (Transversales)

| ID | Descripción | Prioridad | Origen |
|---|---|---|---|
| RNF-01 | Interfaz operable con una sola mano en mobile. | Alta | Supuestos §7 |
| RNF-02 | Debe permitir consultar el plan y registrar entrenamiento sin conexión, sincronizando después. | Alta | Supuestos §7 |
| RNF-03 | Debe instalarse en pantalla de inicio sin pasar por App Store/Google Play. | Alta | Fuera de Alcance §5 |
| RNF-04 | El parseo del Excel no debe demorar más de unos pocos segundos. | Media | OE-01 |
| RNF-05 | Debe soportar 50 a 100 inscriptos simultáneos sin degradación. | Alta | Supuestos §7 |
| RNF-06 | Documentos médicos con acceso restringido (solo Atleta y su Entrenador). | Alta | Fuera de Alcance §5 |
| RNF-07 | Cumplimiento de la Ley de Protección de Datos Personales (Ley 25.326). | Alta | Fuera de Alcance §5 |
| RNF-08 | Backend con endpoint público (webhook) 24 hs para notificaciones de Mercado Pago. | Alta | DK-11 |
| RNF-09 | Los registros de entrenamiento no deben poder eliminarse, solo editarse dentro de la ventana de tolerancia. | Alta | OE-06 |
| RNF-10 | Compatibilidad con Chrome/Safari en sus últimas dos versiones mayores. | Media | Supuestos §7 |
| RNF-11 | Interfaz solo en español (Argentina) en esta versión. | Baja | — |
| RNF-12 | Notificaciones push programables vía Service Workers, con la app cerrada. | Alta | Alcance §4 |
| RNF-13 | Todo registro debe guardar fecha/hora de creación de forma inmutable. | Alta | OE-06 |
| RNF-14 | Debe existir backup periódico de la base de datos. | Media | — |
| RNF-15 | Debe validarse el tamaño máximo de archivos adjuntos. | Media | OE-04 |
| RNF-16 | La sesión debe persistir de forma segura (token) durante los 2 meses de vigencia. | Alta | DK-05 |

---

## 12. Resumen de Trazabilidad

Todo requerimiento debe poder rastrearse a un Objetivo Específico (OE-XX) o Decisión de Diseño (DK-XX) del Documento de Visión. Si aparece un requerimiento sin origen claro, es señal de que se está agregando alcance no acordado — hay que volver primero al Documento de Visión.
