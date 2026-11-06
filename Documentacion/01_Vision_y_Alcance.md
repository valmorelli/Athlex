# Documento de Visión y Alcance del Proyecto

## Plataforma Web PWA de Gestión de Entrenamiento para Atletismo

**Versión:** 2.1
**Estado:** Borrador para revisión
**Última actualización:** 06/11/2026

---

## 1. Información General

| Campo                            | Detalle                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| Nombre del proyecto              | Plataforma Web PWA de Gestión de Entrenamiento para Atletismo                             |
| Contexto de aplicación           | Grupo de entrenamiento de atletismo (ej. UNLP)                                            |
| Tipo de solución                 | Sitio Web Responsivo con capacidades PWA (instalable, offline-first, notificaciones push) |
| Documento siguiente en la cadena | Catálogo de Requerimientos Funcionales y No Funcionales                                   |
| Anexos                           | Anexo A — Catálogo de Pruebas por Torneo (`02_Anexo_Catalogo_Pruebas.md`)                 |

---

## 2. Propósito del Proyecto

El proyecto busca reemplazar un flujo de trabajo manual y fragmentado (planificación semanal por planillas desconectadas + captura de imagen por WhatsApp, seguimiento de sensaciones en una planilla secundaria, e inscripciones a torneos gestionadas por chat privado) por una plataforma centralizada que automatice la distribución de planes de entrenamiento, el registro y análisis de cargas, y la gestión administrativa de torneos, respetando el flujo de trabajo tradicional del entrenador (uso de Google Sheets) para minimizar la curva de adopción mediante una sincronización directa.

---

## 3. Objetivos

### 3.1 Objetivo General

Desarrollar una PWA que centralice la gestión técnica, logística y de rendimiento de un grupo de entrenamiento de atletismo, reduciendo el tiempo operativo del cuerpo técnico y mejorando la calidad y trazabilidad de la información registrada por los atletas.

### 3.2 Objetivos Específicos

- **OE-01:** Automatizar la distribución del plan semanal mediante la vinculación y sincronización directa con la Hoja de Cálculo de Google (Google Sheets) del entrenador, sin cambiar su forma de trabajo habitual ni requerir subida de archivos manuales.
- **OE-02:** Digitalizar el registro diario de asistencia, sensación (RPE cromático), observaciones y condiciones de entrenamiento (clima, calzado).
- **OE-03:** Generar reportes y dashboards automáticos de asistencia, carga y alertas de lesión para el entrenador.
- **OE-04:** Automatizar el proceso de inscripción a torneos (validación de apto médico, comprobante de pago, filtrado por categoría), simplificando la carga del cronograma mediante archivos PDF, y su exportación a Excel para la mesa de control.
- **OE-05:** Brindar herramientas de apoyo técnico al atleta (biblioteca de ejercicios, calculadoras de 1RM y de tiempos de pasada).
- **OE-06:** Garantizar la trazabilidad de todos los registros y cambios administrativos del sistema.

---

## 4. Alcance del Proyecto (Incluye)

- Vinculación de una hoja Google Sheets configurada por el Entrenador Principal como «Cualquier persona con el enlace: Lector»; al pulsar «Sincronizar Planilla» se relee la pestaña seleccionada. No se requiere iniciar sesión con la cuenta de Google del Entrenador para conceder acceso a la hoja.
- Detección automática en Google Sheets de bloques buscando la palabra clave "semana" y la fecha, lectura del color de fondo para la intensidad (RPE), extracción de "Notas" como post-its y resaltado automático de la especialidad del atleta.
- Vista semanal panorámica y vista diaria en tarjetas (mobile-first).
- Registro diario del atleta: asistencia, escala cromática de sensación, observaciones, clima, calzado utilizado.
- Panel del entrenador (Principal y Secundarios): métricas de asistencia, distribución cromática de carga, alertas de atletas con sensación en zona de alerta (violeta).
- Gestión de torneos propios (UNLP): inscripción con usuario autenticado, apto médico obligatorio al crear la cuenta, control de existencia de documentación, carga de comprobante para transferencias y aprobación administrativa, exportación a Excel por categorías/pruebas.
- Fecha límite de inscripción por torneo según DK-07, pasada la cual el sistema bloquea nuevas inscripciones.
- Cálculo del monto efectivamente acreditado por torneo sin contar por duplicado créditos de pagos anteriores, visible exclusivamente para el perfil Organizador de Torneo.
- Redirección a medios de pago externos (Mercado Pago) o exhibición de alias/CBU/CVU de la cuenta institucional configurada por el Entrenador Principal.
- Verificación automática del estado de pago cuando se realiza vía Mercado Pago (mediante su integración oficial), confirmando la inscripción sin intervención del Organizador. Para pagos por transferencia bancaria, la verificación sigue siendo manual (ver DK-11).
- Sección de torneos generales/federativos: cuenta regresiva, registro de marcas post-competencia y detección automática de récords personales (PBs).
- Carga manual, por parte del Entrenador Principal, de fechas de torneos organizados por FAM/CADA u otras federaciones, para alimentar la cuenta regresiva del atleta.
- Listado interno de atletas interesados en participar de un torneo federativo (FAM/CADA), gestionado por el Organizador de Torneo, con sus datos, pruebas y categorías — como apoyo organizativo, sin constituir inscripción oficial ante la federación.
- Permiso de "Organizador de Torneo" asignable por el Entrenador Principal a cuentas de Atleta o Entrenador, con acceso administrativo acotado a los torneos asignados, habilitando la gestión administrativa de torneos propios.
- Creación de torneo por parte del Organizador: carga de los datos base del evento (nombre, fechas, categorías habilitadas, pruebas, etc.).
- Cronograma de organización del evento: adjuntado mediante un archivo PDF cargado por el Organizador, visible para los atletas inscriptos en la sección de Torneos.
- Validación de Entrenadores mediante un padrón oficial precargado (CADA/FAM) cruzando DNI/Licencia para aprobar automáticamente la cuenta.
- Diferenciación de permisos entre Entrenador Principal (gestiona planes, permisos y cuentas institucionales) y Entrenador Secundario (lectura de métricas y dashboards).
- Biblioteca de ejercicios técnicos categorizada, con generador aleatorio de rutinas.
- Calculadora de cargas de gimnasio (% sobre 1RM) y calculadora de tiempos de pasada (con coeficiente según calzado).
- Perfiles de usuario diferenciados: Atleta, Entrenador, Participante externo (registrado igual que un atleta pleno).
- Edición parcial en todos los formularios del sistema (precarga de datos existentes).
- Sistema de notificaciones push (aviso a las 19:00 hs si no se registró el entrenamiento del día).
- Reglas de tolerancia temporal para edición retroactiva dentro de la semana en curso, y bloqueo de semanas pasadas.
- Versionado de planes semanales: al sincronizar un plan, se conservan los registros ya cargados por los atletas y se les asocia al nuevo contenido del plan.
- Auditoría de cambios administrativos, identificando qué entrenador realizó cada modificación.
- Recuperación de contraseña olvidada, mediante el envío de un enlace de restablecimiento al email registrado del usuario.
- Notificación al Atleta cuando el estado de su inscripción a un torneo cambie a "Confirmada" o "Rechazada".
- Recordatorio al Organizador, unos días antes del cierre de inscripción, indicando cuántas solicitudes siguen pendientes de revisión.
- Edición de los datos de un torneo ya creado (fechas, categorías, pruebas, cronograma PDF), mientras su inscripción siga abierta.
- Cancelación o postergación de un torneo por parte del Organizador, con notificación automática a todos los atletas ya inscriptos. Si se posterga con nueva fecha, el cierre de inscripción y la generación del Excel se reprograman en función de esa fecha.
- Política de seguridad de contraseña (mínimo 8 caracteres, con mayúsculas, minúsculas y números) y confirmación de email por duplicado de campo al registrarse.
- Representación de la escala de sensación (RPE) con ícono o etiqueta de texto además del color, para garantizar accesibilidad a usuarios con daltonismo.

---

## 5. Fuera de Alcance (Explícitamente Excluido)

- **Gestión y procesamiento de pagos:** la plataforma no cobra, retiene ni transfiere dinero — eso lo hace siempre Mercado Pago o el banco. Cuando el pago es vía Mercado Pago, el sistema solo *consulta*, a través de su integración oficial, el estado de la transacción para confirmar la inscripción automáticamente; no maneja el dinero en ningún momento. Para transferencias bancarias, no existe un mecanismo equivalente para consultar movimientos de cuenta, por lo que la verificación de ese medio de pago sigue siendo manual.
- **Reembolsos y bajas de inscripción a torneos:** la política de devolución o retención del pago ante una baja es una decisión y gestión que toma el entrenador por fuera de la aplicación. La plataforma no automatiza reembolsos.
- **Publicación en tiendas de aplicaciones** (App Store / Google Play): la instalación es exclusivamente vía PWA (agregar a pantalla de inicio).
- **Gestión médica clínica:** la plataforma almacena el PDF del apto médico y su vigencia, pero no reemplaza ni interpreta diagnósticos médicos.
- **Federaciones externas (CADA, FAM, World Athletics):** no existe una vía oficial (API pública) para que la plataforma se integre con los sistemas de estas entidades. Por lo tanto, queda fuera de alcance: (a) la inscripción automática a torneos de FAM/CADA desde nuestra app —el atleta debe seguir inscribiéndose directamente en la web de la federación correspondiente—, y (b) la obtención automática (scraping) de sus fechas de torneos. Las fechas de estos eventos se cargan manualmente por el Entrenador Principal, y los Entrenadores se validan contra un padrón estático.
- **Inscripción a pruebas de relevos (4x100m / 4x400m):** en esta primera versión, la plataforma no gestiona la inscripción de equipos a relevos. Estas pruebas se siguen corriendo en el torneo, pero la conformación del equipo queda a cargo del Organizador por fuera del sistema. Se evalúa incorporar un flujo de inscripción de equipos en una fase posterior.

---

## 6. Actores / Stakeholders

| Actor                                            | Descripción                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Atleta**                                       | Usuario que recibe el plan de entrenamiento, registra su ejecución diaria y puede inscribirse a torneos. Selecciona obligatoriamente a su Entrenador Principal al registrarse, y puede sumar Entrenadores Secundarios desde su perfil.                                                                                       |
| **Entrenador Principal**                         | Usuario (validado contra padrón oficial) que vincula su Google Sheets, sincroniza la planificación, supervisa métricas del grupo, aprueba inscripciones a torneos, asigna permisos de Organizador y configura cuentas institucionales.                                                                                       |
| **Entrenador Secundario**                        | Usuario (validado contra padrón) asociado por el atleta. Puede visualizar todas las métricas y dashboards de sus atletas asignados, pero tiene bloqueada la carga o sincronización de planificación.                                                                                                                         |
| **Participante externo**                         | Persona ajena al grupo que se inscribe a un torneo organizado por la institución. Se registra como usuario pleno en la base de datos, pero su **acceso a la interfaz queda restringido únicamente a la sección de su Perfil y a la inscripción de torneos propios**.                                                         |
| **Organizador de Torneo** (permiso, no rol fijo) | Permiso adicional que se le puede asignar a cualquier cuenta existente (Atleta o Entrenador Secundario) **por parte del Entrenador Principal**, habilitando la gestión administrativa de un torneo propio: aprobación de inscripciones, carga del PDF del cronograma, visualización del monto recaudado y listados internos. |

---

## 7. Supuestos y Restricciones

- El Entrenador Principal continuará usando su plantilla en Google Sheets; el sistema exige que respete una estructura visual (etiqueta "semana", fecha y colores de fondo) para poder parsearla dinámicamente. El entrenador debe configurar el permiso del documento como «Cualquier persona con el enlace: Lector» antes de vincularlo. Esto permite leer el documento sin autenticación del entrenador, pero cualquier persona que obtenga el enlace también podrá verlo: no deben colocarse allí datos personales o médicos sensibles.
- La cuenta de un Entrenador se aprueba solo si su DNI/Licencia coincide con el padrón oficial precargado.
- El uso principal ocurre en pista/gimnasio, con conectividad variable y operación a una sola mano — por eso la arquitectura PWA con caché offline y mobile-first.
- La sesión del usuario permanece iniciada indefinidamente; solo se cierra automáticamente tras **2 meses consecutivos sin actividad** en la aplicación.
- Se asume un volumen de inscripciones a torneos que puede superar los 50 participantes, por lo que los procesos de validación deben estar preparados para ese volumen.

---

## 8. Decisiones de Diseño Clave ya Registradas

- **DK-01 — Versionado de planes:** al sincronizar Google Sheets, los registros ya cargados por los atletas (asistencia, sensación, observaciones, clima, calzado) se conservan y se re-asocian al plan actualizado, día por día. Solo se actualiza el contenido del entrenamiento mostrado.
- **DK-02 — Créditos y devoluciones: el reintegro monetario se acuerda y ejecuta fuera de la plataforma. El Organizador puede registrar «Reintegrado» o «Aplicado como crédito» con origen, monto y referencia; la reutilización de un comprobante anterior exige elegir la vía transferencia y aprobación manual sin generar un cobro nuevo.
- **DK-03 — Auditoría:** todo cambio de tipo administrativo registra el ID del responsable. Los atletas no generan este tipo de log por acciones sobre sus propios datos.
- **DK-04 — Registro de externos:** no existe modalidad de "invitado" simplificada. Todo participante externo se registra como usuario pleno.
- **DK-05 — Persistencia de sesión:** cierre de sesión automático únicamente después de 2 meses de inactividad continua.
- **DK-06 — Recaudación de torneos: mostrar al Organizador los pagos nuevos acreditados para su torneo y, por separado, los créditos de pagos previos aplicados; evitar contabilizar dos veces el mismo importe.
- **DK-09 — Cuenta institucional única del club: el Entrenador Principal configura una sola cuenta de cobro (alias/CBU/CVU/Mercado Pago) compartida por todos los grupos y torneos propios del club, aunque los gestione otro Organizador.
- **DK-10 — Listado interno para torneos federativos:** el Organizador de Torneo, al ingresar a la sección de torneos federativos, puede ver y gestionar un listado de sus atletas interesados. Es una herramienta interna.
- **DK-11 — Pago híbrido: Mercado Pago confirma automáticamente por integración oficial únicamente transacciones nuevas verificadas; transferencia bancaria y reutilización de créditos quedan sujetos a revisión manual del Organizador.
- **DK-12 — Acceso restringido de Participante externo:** su interfaz solo habilita Perfil y la inscripción a torneos propios, sin acceso a torneos federativos.
- **DK-14 — Registro progresivo: el Atleta debe aportar datos básicos, Entrenador Principal y apto médico al crear la cuenta; peso, ficha deportiva, marcas, historial médico y 1RM se completan posteriormente. El Participante externo registra solo datos básicos y apto médico.
- **DK-15 — Categoría por año de nacimiento: el participante elige una sola categoría elegible (propia o superior, si el torneo la habilita) para todas las pruebas del torneo. No hay límite general de cantidad de pruebas y puede haber superposición horaria.
- **DK-16 — Estados separados de inscripción y pago: inscripción Pendiente/Confirmada/Rechazada/Cancelada; pago Pendiente de verificación/Acreditado/Rechazado/Reintegrado/Aplicado como crédito, con la vía de pago identificada.
- **DK-17 — Excel único:** se genera el día anterior a la **fecha vigente** del torneo a las 22:00 (hora argentina), con inscripciones confirmadas por categoría y prueba; las pendientes se muestran en una sección separada para eventual agregado manual posterior, sin regeneración automática. Una postergación anterior a la generación reemplaza la fecha programada; el Excel no se genera en la víspera de la fecha anterior.
- **DK-18 — Recuperación de contraseña:** envío de enlace de único uso al email registrado.
- **DK-19 — Bloqueo de edición de plan en semanas cerradas:** el Entrenador no puede sincronizar cambios para semanas cerradas (posterior al domingo 23:59 hs).
- **DK-20 — Grupos: cada atleta tiene un Entrenador Principal y puede añadir Entrenadores Secundarios. En el club inicial conviven dos grupos y un entrenador publica el plan y consulta métricas del conjunto; la arquitectura permite otros grupos y clubes independientes sin compartir sus datos.
- **DK-21 — Inactividad y retención: la cuenta inactiva puede reactivarse dentro de un año; transcurrido ese plazo se elimina o anonimiza el perfil personal, pero se conservan los resultados y registros administrativos históricos estrictamente necesarios, conforme a la política de retención.
- **DK-22 — Notificación de estado de inscripción:** notificación automática al Atleta al confirmarse o rechazarse.
- **DK-23 — Recordatorio de cierre:** notificación al Organizador días antes del límite.
- **DK-24 — El Organizador puede editar torneo y PDF mientras esté abierta la inscripción; si elimina una prueba con inscriptos debe notificarles y explicar cómo contactar al Organizador para resolver fuera del sistema pagos conjuntos o devoluciones.
- **DK-25 — Cancelación o postergación:** notificación automática a inscriptos; reembolsos fuera del sistema. Cuando el Organizador establece una nueva fecha para el torneo postergado, se recalcula el cierre de inscripciones conforme a DK-07 y se reprograma la generación única del Excel para la víspera de la nueva fecha a las 22:00; no se ejecuta la tarea anterior.
- **DK-26 — Política de contraseña:** mínimo 8 caracteres, mayúscula, minúscula y número.
- **DK-27 — Confirmación de email:** doble ingreso de email al registrarse.
- **DK-28 — Accesibilidad RPE:** ícono o etiqueta de texto acompañando el color.
- **DK-29 — Asignación de Entrenador Principal:** obligatorio seleccionarlo de la lista oficial al registrarse.
- **DK-30 — Entrenadores Secundarios:** el atleta gestiona la incorporación de entrenadores secundarios (solo lectura) desde su perfil personal.
- **DK-13 — Inscripción única por atleta/torneo.**
- **DK-07 — Fecha límite de inscripción:** miércoles 23:59 hs general, martes 12:00 hs Provinciales pista propia. Todos los torneos son sábado y domingo.
- **DK-08 — Torneos federativos:** fechas cargadas manualmente por el Entrenador Principal.

---

## 9. Glosario Breve

| Término | Significado                                                                           |
| ------- | ------------------------------------------------------------------------------------- |
| RPE     | Rating of Perceived Exertion (escala de esfuerzo percibido, representada por colores) |
| PB      | Personal Best (récord personal)                                                       |
| SB      | Season Best (mejor marca de la temporada)                                             |
| 1RM     | Una Repetición Máxima (fuerza máxima registrada en un ejercicio de gimnasio)          |
| CADA    | Confederación Argentina de Atletismo                                                  |
| FAM     | Federación Atlética Metropolitana                         |

## 10. Decisiones complementarias aprobadas (06/11/2026)

- **DK-31 — Estados diarios:** lunes a viernes son días esperados de entrenamiento; «Completado» cuenta asistencia y «No realizado» o «Sin registrar» cuentan falta. «No realizado» permite indicar motivo (descanso indicado, lluvia/suspensión, lesión, enfermedad, personal u otro), sin alterar el cómputo. Un entrenamiento por cuenta propia puede marcarse Completado y describirse en observaciones.
- **DK-32 — Sensaciones reales:** verde=Muy suave, amarillo=Suave, naranja=Medio, rojo=Fuerte y violeta=Molestia/dolor/lesión. Los colores del plan son orientativos y no alimentan los dashboards; el reparto se calcula sobre registros Completados con sensación.
- **DK-33 — Apto médico:** es obligatorio adjuntarlo al registrarse para Atleta y Participante externo. El usuario renueva desde su perfil al año; no se implementa bloqueo automático de la inscripción por vencimiento posterior, conforme a la decisión de alcance. La aplicación muestra la fecha/estado documental sin diagnosticar ni validar clínicamente el archivo.
- **DK-34 — Marcas:** el atleta carga manualmente sus marcas/PB. El sistema no importa resultados oficiales ni determina automáticamente PB, podios o validez de marcas; guarda disciplina, unidad, estado especial y viento cuando corresponda.
- **DK-35 — Permisos:** el permiso Organizador habilita exclusivamente datos y acciones del torneo asignado, no dashboards de entrenamiento por sí mismo. El Entrenador Secundario accede a los datos y dashboards de atletas asociados, incluidos los médicos conforme a los controles de acceso, pero no sincroniza planes.
- **DK-36 — Control técnico:** la hoja vinculada debe tener acceso de lectura «Cualquier persona con el enlace», sin OAuth del entrenador ni cuenta de servicio compartida con él. El backend debe usar un método de lectura que preserve formatos y colores de celdas (p. ej., Google Sheets API), validar parseo, mostrar errores claros, proteger datos médicos, verificar pagos y resolver conflictos offline. No basta con descargar un CSV si se pierden los colores.
- **DK-37 — Baja de prueba:** si una prueba se elimina o cancela, se notifica a los inscriptos de esa prueba, incluyendo «Si hiciste el pago en conjunto con otra prueba, por favor comunicate con los organizadores». La gestión monetaria queda fuera de la plataforma.

**Nota de alcance:** el concepto «única cuenta del club» corresponde a cada club/institución, no a una cuenta bancaria común entre clubes futuros.

**DK-38 — Reprogramación por postergación:** el Organizador define una nueva fecha de torneo; el sistema recalcula las fechas de cierre y de Excel como un conjunto, cancela la programación anterior y registra el cambio. Si el Excel ya fue generado antes de la postergación, no se sobrescribe ni se genera otro automáticamente: se debe resolver expresamente con la organización antes de anunciar una nueva exportación.
