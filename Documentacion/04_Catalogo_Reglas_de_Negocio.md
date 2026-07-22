# Catálogo de Reglas de Negocio

## Plataforma Web PWA de Gestión de Entrenamiento para Atletismo

**Versión:** 1.1 · **Estado:** Borrador para revisión · **Documento anterior en la cadena:** `03_Catalogo_Requerimientos.md`

---

## 1. Cómo Leer este Documento

Mientras el Catálogo de Requerimientos (Paso 2) define **qué debe hacer** el sistema, este catálogo define **bajo qué condiciones exactas** debe comportarse de una forma u otra.

### 1.1 Cuándo corresponde el formato SI/ENTONCES

Este catálogo **no repite** los Requerimientos Funcionales (RF) con otras palabras. Una Regla de Negocio solo se redacta en formato SI/ENTONCES cuando existe una **bifurcación real**: el sistema se comporta distinto según una condición (ej. paga por Mercado Pago vs. paga por transferencia; hay Final programada vs. no la hay). Si una regla no tiene ninguna bifurcación —es una sola acción sin ramas—, ya está correctamente cubierta por su RF correspondiente y no se duplica acá.

> **SI** <condición> **ENTONCES** <efecto>

### 1.2 Campos de cada regla

| Campo | Significado |
|---|---|
| **ID** | Identificador único (RN-01, RN-02, etc.). |
| **Regla** | La condición y su efecto (o un enunciado directo, cuando la regla es una restricción fija sin bifurcación pero que igual necesita quedar explícita por su impacto transversal). |
| **Origen** | Decisión de Diseño (DK-XX) o sección del Documento de Visión de la cual surge. |

---

## 2. Categoría A — Planificación y Versionado de Planes

| ID | Regla | Origen |
|---|---|---|
| RN-01 | **SI** el Entrenador sube un nuevo Excel que reemplaza el plan vigente de una semana **que ya tiene registros cargados por los atletas**, **ENTONCES** el sistema debe conservar esos registros (asistencia, sensación, observaciones, clima, calzado) y re-asociarlos día por día al nuevo contenido del plan. | DK-01 |
| RN-02 | **SI** el Excel corresponde a una semana futura sin registros previos, **ENTONCES** no aplica ninguna migración de datos: el plan simplemente se carga como nuevo. | DK-01 (aclaración) |
| RN-03 | **SI** el archivo Excel cargado no respeta la estructura de celdas estandarizada (columnas B–F = días, filas 3–9 = bloques), **ENTONCES** el sistema debe rechazarlo y notificar al Entrenador el motivo específico (celda o fila con problema), sin procesar ningún dato. | RF-02/RF-03 |

---

## 3. Categoría B — Registro Diario y Tolerancia Temporal

| ID | Regla | Origen |
|---|---|---|
| RN-04 | **SI** la fecha actual está dentro de la misma semana calendario del entrenamiento no registrado (hasta el domingo 23:59 hs de esa semana), **ENTONCES** el atleta puede completar o editar retroactivamente ese registro. | Alcance §4 |
| RN-05 | **SI** ya comenzó la semana calendario siguiente (a partir del lunes), **ENTONCES** los registros de la semana anterior quedan bloqueados de forma permanente para edición. | Alcance §4 |

---

## 4. Categoría C — Torneos Propios: Inscripción y Pago

| ID | Regla | Origen |
|---|---|---|
| RN-06 | **SI** un usuario intenta inscribirse a un torneo propio y su apto médico está vencido o no existe, **ENTONCES** el sistema bloquea el avance de la inscripción hasta que se adjunte un apto médico vigente. | OE-04 |
| RN-07 | El sistema debe filtrar las pruebas disponibles para el usuario según su categoría de edad, permitiendo anotarse también en categorías **superiores** a la propia — nunca en categorías inferiores. | OE-04 |
| RN-08 | **SI** un atleta ya está inscripto en un torneo determinado, **ENTONCES** el sistema debe impedir una segunda inscripción de esa misma persona a ese mismo torneo (una inscripción por atleta por torneo). Aplica a todo tipo de torneo, propio o federativo. | DK-13 |
| RN-09 | **SI** el usuario elige pagar por Mercado Pago, **ENTONCES** el sistema consulta el estado de la transacción vía la API/webhooks oficiales y, al recibir la confirmación de pago aprobado, cambia automáticamente el estado de la inscripción a "Confirmado" — sin intervención del Organizador. | DK-11 |
| RN-10 | **SI** el usuario elige pagar por transferencia bancaria (alias/CVU), **ENTONCES** la inscripción queda en estado "Pendiente" hasta que el Organizador revise el comprobante adjunto y la apruebe manualmente. | DK-11 |
| RN-11 | El destino de todos los pagos de inscripción (vía Mercado Pago o transferencia) es siempre la misma cuenta (Kuki), sin importar qué Organizador gestione el torneo. | DK-09 |
| RN-12 | **SI** la fecha/hora actual supera la fecha límite de inscripción del torneo, **ENTONCES** el sistema bloquea nuevas inscripciones a ese torneo. La fecha límite es el miércoles 23:59 hs por defecto, o el martes 12:00 hs si el torneo es Provincial organizado en la pista propia. | DK-07 |
| RN-13 | El monto total recaudado de un torneo se calcula sumando únicamente las inscripciones en estado "Aprobado"/"Confirmado", y es visible únicamente para el usuario con permiso de Organizador de Torneo de ese torneo específico. | DK-06 |
| RN-14 | **SI** un atleta se reinscribe a un torneo reutilizando un pago ya realizado y conservado como crédito por el Entrenador (sin una transacción nueva), **ENTONCES** la inscripción debe gestionarse siempre por transferencia bancaria (adjuntando el comprobante ya presentado, con aprobación manual del Organizador) — **nunca** por Mercado Pago, ya que la API no tendría ninguna transacción nueva que confirmar y la solicitud quedaría pendiente para siempre. | DK-02 |
| RN-15 | La decisión de reembolsar o retener el pago ante una baja de inscripción queda fuera del sistema, a criterio exclusivo del Entrenador/Organizador, gestionada por fuera de la plataforma. | DK-02 |

---

## 5. Categoría D — Torneos Federativos (FAM / CADA)

| ID | Regla | Origen |
|---|---|---|
| RN-16 | Las fechas de torneos federativos se cargan siempre de forma manual por el Administrador/Entrenador, ya que no existe una API pública de estas entidades para automatizar la carga. | DK-08 |
| RN-17 | El listado interno de atletas interesados en un torneo federativo es exclusivamente una herramienta de organización propia — en ningún caso constituye una inscripción oficial ante la federación correspondiente. | DK-10 |

---

## 6. Categoría E — Resultados, Marcas y Podios

| ID | Regla | Origen |
|---|---|---|
| RN-18 | **SI** se carga una marca de un atleta en cualquier prueba (propia o federativa), **ENTONCES** el sistema debe compararla automáticamente contra el historial personal de esa prueba y marcarla como Récord Personal (PB) si la supera. | Alcance §4 |
| RN-19 | **SI** una prueba tiene instancia de Final programada, **ENTONCES** el podio se define por el resultado de esa Final. | Anexo A §5 |
| RN-20 | **SI** una prueba no tiene instancia de Final (solo Series), **ENTONCES** el podio se define por el ranking cronométrico directo entre los resultados de todas las series. | Anexo A §5 |
| RN-21 | Las pruebas combinadas (Decatlón, Heptatlón) deben registrarse como una entidad propia que acumula el puntaje de cada sub-prueba disputada a lo largo de ambos días de competencia — nunca como una prueba simple aislada. | Anexo A §4 |

> ⚠️ **Pendiente de confirmación con Kuki:** el cálculo de puntaje de las pruebas combinadas suele basarse en las tablas oficiales de puntuación de World Athletics. Hay que definir si el sistema va a usar esa tabla oficial o un criterio propio simplificado, antes de diseñar el módulo de resultados.

---

## 7. Categoría F — Usuarios y Permisos

| ID | Regla | Origen |
|---|---|---|
| RN-22 | El permiso de "Organizador de Torneo" puede asignarse a cualquier cuenta existente de tipo Entrenador o Atleta. No es un rol de base del sistema, sino un permiso adicional que se otorga o revoca. | Sección 6 |
| RN-23 | **SI** un usuario tiene el perfil "Participante externo", **ENTONCES** su interfaz debe restringirse únicamente a las secciones de Perfil y Torneos — y dentro de Torneos, solo puede ver y gestionar la inscripción a torneos propios organizados por la institución, sin acceso a la cuenta regresiva ni al listado de torneos federativos, que son exclusivos de Atletas y Entrenadores. | DK-12 |
| RN-28 | El perfil del Atleta exige todos sus campos como obligatorios (nombre, apellido, fecha de nacimiento, peso, ficha deportiva, historial médico, 1RM, etc.), salvo la foto, que es opcional — son insumo directo de las calculadoras de gimnasio y de tiempos de pasada. El perfil de Participante externo, en cambio, solo incluye nombre, apellido, fecha de nacimiento y apto médico vigente; no incluye los demás campos propios del Atleta. | DK-14 |
| RN-24 | No existe una modalidad de registro "invitado" simplificada: todo Participante externo debe completar el registro completo de usuario, con los mismos datos que un Atleta. | DK-04 |

---

## 8. Categoría G — Sesión y Auditoría

| ID | Regla | Origen |
|---|---|---|
| RN-25 | La sesión de un usuario permanece iniciada indefinidamente y solo se cierra automáticamente tras 2 meses consecutivos sin actividad en la aplicación. | DK-05 |
| RN-26 | **SI** un Entrenador (o un usuario con permiso de Organizador) realiza un cambio administrativo (aprobación de inscripción, edición de plan, creación de torneo, etc.), **ENTONCES** el sistema debe registrar su ID de usuario junto con la acción realizada y el momento exacto. | DK-03 |
| RN-27 | Las acciones de un Atleta sobre sus propios datos personales o de entrenamiento no generan registros de auditoría administrativa, ya que no involucran permisos de ese tipo. | DK-03 |

---

## 9. Reglas Removidas por Duplicar un RF sin Bifurcación

Estas reglas estaban en la versión 1.0 de este catálogo y se removieron porque no aportaban ninguna condición nueva sobre su RF de origen — quedan cubiertas totalmente por ese RF:

| Regla removida | Motivo | Cubierta por |
|---|---|---|
| "Si a las 19:00 hs el atleta no registró, se envía push" | Acción única, sin bifurcación real. | RF-72 |
| "Si el día termina sin registro, se marca Incompleto" | Acción única, sin bifurcación real. | RF-20 |
| "Todo registro guarda fecha original y fecha de guardado" | Acción única, sin bifurcación real. | RF-19 |

---

## 10. Resumen de Trazabilidad

Toda regla de este catálogo debe poder rastrearse a una Decisión de Diseño (DK-XX) del Documento de Visión, o a un Requerimiento Funcional ya definido en el Paso 2. Las reglas marcadas como "pendientes de confirmación" (ver RN-21) no deben darse por cerradas hasta validarlas con Kuki, y deben resolverse antes de avanzar al diseño del Modelo de Datos (Paso 5).
