# Documento de Visión y Alcance del Proyecto

## Plataforma Web PWA de Gestión de Entrenamiento para Atletismo

**Versión:** 1.0
**Estado:** Borrador para revisión
**Última actualización:** 20/07/2026

---

## 1. Información General

| Campo | Detalle |
|---|---|
| Nombre del proyecto | Plataforma Web PWA de Gestión de Entrenamiento para Atletismo |
| Contexto de aplicación | Grupo de entrenamiento de atletismo (ej. UNLP) |
| Tipo de solución | Sitio Web Responsivo con capacidades PWA (instalable, offline-first, notificaciones push) |
| Documento siguiente en la cadena | Catálogo de Requerimientos Funcionales y No Funcionales |
| Anexos | Anexo A — Catálogo de Pruebas por Torneo (`02_Anexo_Catalogo_Pruebas.md`) |

---

## 2. Propósito del Proyecto

El proyecto busca reemplazar un flujo de trabajo manual y fragmentado (planificación semanal por Excel + captura de imagen por WhatsApp, seguimiento de sensaciones en una planilla secundaria, e inscripciones a torneos gestionadas por chat privado) por una plataforma centralizada que automatice la distribución de planes de entrenamiento, el registro y análisis de cargas, y la gestión administrativa de torneos, respetando el flujo de trabajo tradicional del entrenador (carga de Excel) para minimizar la curva de adopción.

---

## 3. Objetivos

### 3.1 Objetivo General

Desarrollar una PWA que centralice la gestión técnica, logística y de rendimiento de un grupo de entrenamiento de atletismo, reduciendo el tiempo operativo del cuerpo técnico y mejorando la calidad y trazabilidad de la información registrada por los atletas.

### 3.2 Objetivos Específicos

- **OE-01:** Automatizar la distribución del plan semanal a partir del archivo Excel que ya utiliza el entrenador, sin cambiar su forma de trabajo habitual.
- **OE-02:** Digitalizar el registro diario de asistencia, sensación (RPE cromático), observaciones y condiciones de entrenamiento (clima, calzado).
- **OE-03:** Generar reportes y dashboards automáticos de asistencia, carga y alertas de lesión para el entrenador.
- **OE-04:** Automatizar el proceso de inscripción a torneos (validación de apto médico, comprobante de pago, filtrado por categoría) y su exportación a Excel para la mesa de control.
- **OE-05:** Brindar herramientas de apoyo técnico al atleta (biblioteca de ejercicios, calculadoras de 1RM y de tiempos de pasada).
- **OE-06:** Garantizar la trazabilidad de todos los registros y cambios administrativos del sistema.

---

## 4. Alcance del Proyecto (Incluye)

- Carga y parseo automático de planificación semanal en formato Excel (.xlsx).
- Vista semanal panorámica (estética del Excel original) y vista diaria en tarjetas (mobile-first).
- Registro diario del atleta: asistencia, escala cromática de sensación, observaciones, clima, calzado utilizado.
- Panel del entrenador: métricas de asistencia, distribución cromática de carga, alertas de atletas con sensación en zona de alerta (violeta).
- Gestión de torneos propios (UNLP): inscripción con usuario autenticado, verificación de apto médico, carga obligatoria de comprobante de pago, aprobación administrativa, exportación a Excel por categorías/pruebas.
- Fecha límite de inscripción por torneo (a confirmar su regla exacta — ver DK-07), pasada la cual el sistema bloquea nuevas inscripciones.
- Cálculo automático del monto total recaudado por torneo (suma de inscripciones aprobadas), visible exclusivamente para el perfil Administrador.
- Redirección a medios de pago externos (Mercado Pago) o exhibición de alias/CBU/CVU para que el atleta realice el pago por fuera de la plataforma.
- Verificación automática del estado de pago cuando se realiza vía Mercado Pago (API/webhooks), confirmando la inscripción sin intervención del Organizador. Para pagos por transferencia bancaria, la verificación sigue siendo manual (ver DK-11).
- Sección de torneos generales/federativos: cuenta regresiva, registro de marcas post-competencia y detección automática de récords personales (PBs).
- Carga manual, por parte del Administrador/Entrenador, de fechas de torneos organizados por FAM/CADA u otras federaciones, para alimentar la cuenta regresiva del atleta.
- Listado interno de atletas interesados en participar de un torneo federativo (FAM/CADA), gestionado por el Organizador de Torneo, con sus datos, pruebas y categorías — como apoyo organizativo, sin constituir inscripción oficial ante la federación.
- Permiso de "Organizador de Torneo" asignable a cualquier cuenta de Entrenador o Atleta, habilitando la gestión administrativa de torneos propios (ver sección 6 y DK-06/DK-09/DK-10).
- Creación de torneo por parte del Organizador: carga de los datos base del evento (nombre, fechas, categorías habilitadas, pruebas, etc.).
- Cronograma de organización del evento: horario de cada prueba y categoría correspondiente, cargado manualmente por el Organizador, visible para los atletas inscriptos en la sección de Torneos.
- Biblioteca de ejercicios técnicos categorizada, con generador aleatorio de rutinas.
- Calculadora de cargas de gimnasio (% sobre 1RM) y calculadora de tiempos de pasada (con coeficiente según calzado).
- Perfiles de usuario diferenciados: Atleta, Entrenador, Participante externo (registrado igual que un atleta pleno).
- Sistema de notificaciones push (aviso a las 19:00 hs si no se registró el entrenamiento del día).
- Reglas de tolerancia temporal para edición retroactiva dentro de la semana en curso, y bloqueo de semanas pasadas.
- Versionado de planes semanales: al actualizar un plan, se conservan los registros ya cargados por los atletas y se les asocia al nuevo contenido del plan.
- Auditoría de cambios administrativos, identificando qué entrenador realizó cada modificación.

---

## 5. Fuera de Alcance (Explícitamente Excluido)

- **Gestión y procesamiento de pagos:** la plataforma no cobra, retiene ni transfiere dinero — eso lo hace siempre Mercado Pago o el banco. Cuando el pago es vía Mercado Pago, el sistema solo *consulta* el estado de la transacción a través de su API oficial para confirmar la inscripción automáticamente; no maneja el dinero en ningún momento. Para transferencias bancarias, no existe una API equivalente para consultar movimientos de cuenta, por lo que la verificación de ese medio de pago sigue siendo manual.
- **Reembolsos y bajas de inscripción a torneos:** la política de devolución o retención del pago ante una baja es una decisión y gestión que toma el entrenador por fuera de la aplicación. La plataforma no automatiza reembolsos.
- **Publicación en tiendas de aplicaciones** (App Store / Google Play): la instalación es exclusivamente vía PWA (agregar a pantalla de inicio).
- **Gestión médica clínica:** la plataforma almacena el PDF del apto médico y su vigencia, pero no reemplaza ni interpreta diagnósticos médicos.
- **Federaciones externas (CADA, FAM, World Athletics):** no existe una vía oficial (API pública) para que la plataforma se integre con los sistemas de estas entidades. Por lo tanto, queda fuera de alcance: (a) la inscripción automática a torneos de FAM/CADA desde nuestra app —el atleta debe seguir inscribiéndose directamente en la web de la federación correspondiente—, y (b) la obtención automática (scraping) de sus fechas de torneos. Las fechas de estos eventos se cargan manualmente por el Administrador/Entrenador.

---

## 6. Actores / Stakeholders

| Actor | Descripción |
|---|---|
| **Atleta** | Usuario que recibe el plan de entrenamiento, registra su ejecución diaria y puede inscribirse a torneos. |
| **Entrenador** | Usuario que sube la planificación, supervisa métricas del grupo, aprueba inscripciones a torneos y realiza cambios administrativos. |
| **Participante externo** | Persona ajena al grupo que se inscribe a un torneo organizado por la institución. Se registra como usuario pleno en la base de datos (mismo tratamiento de datos que un atleta, dado que suele repetir participación en futuros eventos), pero su **acceso a la interfaz queda restringido únicamente a la sección de su Perfil y a la inscripción de torneos propios** — no visualiza plan de entrenamiento, gimnasio, cuenta regresiva de torneos federativos, ni otras secciones propias de los atletas del grupo. |
| **Organizador de Torneo** (permiso, no rol fijo) | Permiso adicional que se le puede asignar a cualquier cuenta existente (Entrenador o Atleta), habilitando la gestión administrativa de un torneo propio: aprobación de inscripciones, visualización del monto recaudado, y gestión del listado interno de atletas para torneos federativos. Actualmente lo poseen Kuki (Entrenador), una Entrenadora y un Atleta. |

> ~~Pregunta abierta sobre acceso de externos~~ — **Resuelta:** todas las personas que colaboran en la organización de torneos ya son usuarios del sistema (Entrenador o Atleta), por lo que no se necesita un rol externo adicional. Alcanza con el permiso "Organizador de Torneo" descripto arriba.

---

## 7. Supuestos y Restricciones

- El entrenador continuará usando su plantilla tradicional de Excel; el sistema exige que respete una estructura estandarizada de celdas para poder parsearla correctamente.
- El uso principal ocurre en pista/gimnasio, con conectividad variable y operación a una sola mano — por eso la arquitectura PWA con caché offline y mobile-first.
- La sesión del usuario permanece iniciada indefinidamente; solo se cierra automáticamente tras **2 meses consecutivos sin actividad** en la aplicación.
- Se asume un volumen de inscripciones a torneos que puede superar los 50 participantes, por lo que los procesos de validación deben estar preparados para ese volumen.

---

## 8. Decisiones de Diseño Clave ya Registradas

*(Se detallarán formalmente con ID de Regla de Negocio en el catálogo del Paso 3. Se listan aquí para no perder trazabilidad.)*

- **DK-01 — Versionado de planes:** al subirse un nuevo Excel que reemplaza al vigente, los registros ya cargados por los atletas (asistencia, sensación, observaciones, clima, calzado) se conservan y se re-asocian al plan actualizado, día por día. Solo se actualiza el contenido del entrenamiento mostrado.
- **DK-02 — Baja de inscripción a torneo:** decisión de reembolso o retención queda a criterio del entrenador, gestionada fuera de la plataforma. Si el atleta se reinscribe a otro torneo, debe volver a adjuntar un comprobante de pago para completar el flujo de inscripción — pudiendo ser el mismo archivo ya presentado anteriormente, si el Entrenador decidió conservar ese pago como crédito para la nueva inscripción. En ese caso, la inscripción debe hacerse siempre por la vía de **transferencia bancaria** (comprobante + aprobación manual del Organizador) y nunca por Mercado Pago: al no existir una transacción nueva, la API de Mercado Pago jamás podría confirmarla automáticamente, y la solicitud quedaría pendiente indefinidamente.
- **DK-03 — Auditoría:** todo cambio de tipo administrativo (aprobación de inscripción, edición de plan, etc.) registra el ID del entrenador responsable. Los atletas no generan este tipo de log, ya que sus permisos se limitan a sus propios datos personales y de entrenamiento.
- **DK-04 — Registro de externos:** no existe modalidad de "invitado" simplificada. Todo participante externo se registra como usuario pleno en la base de datos.
- **DK-05 — Persistencia de sesión:** cierre de sesión automático únicamente después de 2 meses de inactividad continua.
- **DK-06 — Recaudación de torneos:** el sistema suma automáticamente el monto de cada inscripción aprobada dentro de un torneo, mostrando el total recaudado únicamente al perfil con permiso de Organizador de Torneo (no visible para Entrenadores/Atletas sin ese permiso).
- **DK-09 — Cuenta de cobro única:** todos los pagos de inscripción se dirigen siempre al mismo CVU/alias/Mercado Pago de Kuki, sin importar qué Organizador gestione el torneo, ya que no existe cuenta institucional propia de la UNLP.
- **DK-10 — Listado interno para torneos federativos:** el Organizador de Torneo, al ingresar a la sección de torneos federativos (FAM/CADA) y hacer clic en la cuenta regresiva de un evento, puede ver y gestionar un listado de sus atletas interesados en participar (datos, pruebas, categorías). Esto es una herramienta interna de organización — no constituye inscripción real ante la federación (ver DK-08).
- **DK-11 — Confirmación automática de pago (modelo híbrido):** las inscripciones pagadas vía Mercado Pago se confirman automáticamente al recibir la notificación de pago aprobado desde la API oficial de Mercado Pago, sin intervención del Organizador. Las inscripciones pagadas por transferencia (alias/CVU) mantienen el flujo manual: comprobante adjunto → estado Pendiente → aprobación del Organizador.
- **DK-12 — Acceso restringido de Participante externo:** aunque se registra con los mismos datos que un Atleta, su interfaz solo habilita las secciones de Perfil y Torneos — y dentro de Torneos, únicamente la inscripción a torneos propios organizados por la institución. No tiene acceso a la sección de torneos federativos (cuenta regresiva, listado interno de atletas, etc.), que es exclusiva de Atletas y Entrenadores.
- **DK-14 — Datos obligatorios de perfil:** el **Atleta** debe completar todos los campos de su perfil como obligatorios (nombre, apellido, fecha de nacimiento, peso, ficha deportiva, historial médico, 1RM, etc.), ya que son insumo directo de las calculadoras de gimnasio y de tiempos de pasada. La única excepción opcional es la foto de perfil. El **Participante externo**, en cambio, solo completa nombre, apellido, fecha de nacimiento y apto médico vigente — no se le solicitan los demás campos, propios del seguimiento de un Atleta que entrena con el grupo. La foto de perfil es opcional para todos los tipos de usuario (Atleta, Entrenador, Participante externo).
- **DK-13 — Inscripción única por atleta/torneo:** un mismo atleta no puede inscribirse más de una vez a un mismo torneo. Esta regla aplica tanto a torneos propios como a los listados internos de torneos federativos.
- **DK-07 — Fecha límite de inscripción *(confirmado con Kuki)*:** la fecha límite general es el **miércoles a las 23:59 hs**. Excepción: los torneos **Provinciales organizados en la pista propia** cierran antes, el **martes a las 12:00 hs**. Todos los torneos (propios y federativos) se realizan siempre **sábado y domingo**, por lo que una única inscripción cubre las pruebas de ambos días.
- **DK-08 — Torneos federativos (FAM/CADA):** al no existir API pública de estas entidades, la cuenta regresiva se alimenta con fechas cargadas manualmente por el Administrador/Entrenador. No se realiza inscripción ni scraping automático hacia esos sistemas externos.

---

## 9. Glosario Breve

| Término | Significado |
|---|---|
| RPE | Rating of Perceived Exertion (escala de esfuerzo percibido, representada por colores) |
| PB | Personal Best (récord personal) |
| SB | Season Best (mejor marca de la temporada) |
| 1RM | Una Repetición Máxima (fuerza máxima registrada en un ejercicio de gimnasio) |
| CADA | Confederación Argentina de Atletismo |
| FAM | Federación Atlética Metropolitana |
