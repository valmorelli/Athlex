# Anexo A — Catálogo de Pruebas por Torneo

**Documento de referencia** para: Modelo de Datos (Paso 5) y Reglas de Negocio del generador de Excel de inscriptos (Paso 3).

Aplica a los torneos propios organizados por la institución. Todos se desarrollan en **sábado y domingo**; la inscripción es única y cubre las pruebas de ambos días.

---

## 1. Estructura del Excel de Inscriptos (post-cierre)

El archivo generado al cerrar la inscripción se organiza:

1. **Hoja por Categoría** (ej. U18, U20, U23, Mayores).
2. Dentro de cada hoja, **bloques por Prueba** (ej. 100m llanos, Salto en largo, etc.), agrupando a los inscriptos de esa categoría en esa prueba específica.

---

## 2. Pruebas del Día Sábado

| Grupo | Prueba | Formato |
|---|---|---|
| Velocidad y Vallas | 100 metros llanos | Series y Final |
| Velocidad y Vallas | 400 metros llanos | Series |
| Velocidad y Vallas | 100m vallas (fem.) / 110m vallas (masc.) | Series |
| Medio Fondo y Fondo | 800 metros llanos | Series o Final |
| Medio Fondo y Fondo | 1500 metros llanos | Final |
| Medio Fondo y Fondo | 3000 metros con obstáculos | Final |
| Medio Fondo y Fondo | 10.000 metros llanos | Final |
| Saltos | Salto en largo | Final |
| Saltos | Salto con garrocha | Final |
| Lanzamientos | Lanzamiento de bala | Final |
| Lanzamientos | Lanzamiento de martillo | Final |
| Relevos | Relevo 4x100 metros | Final |

## 3. Pruebas del Día Domingo

| Grupo | Prueba | Formato |
|---|---|---|
| Velocidad y Vallas | 200 metros llanos | Series y Final |
| Velocidad y Vallas | 400 metros llanos | Final |
| Velocidad y Vallas | 400 metros vallas | Final |
| Medio Fondo, Fondo y Marcha | 5000 metros llanos | Final |
| Medio Fondo, Fondo y Marcha | Maratón / Marcha atlética | Final (largada matutina) |
| Saltos | Salto en alto | Final |
| Saltos | Triple salto | Final |
| Lanzamientos | Lanzamiento de disco | Final |
| Lanzamientos | Lanzamiento de jabalina | Final |
| Relevos | Relevo 4x400 metros | Final |

## 4. Pruebas Combinadas (requieren tratamiento especial en el modelo de datos)

Estas pruebas **no son un evento único**, sino una suma de varias disciplinas disputadas en ambos días. El modelo de datos deberá contemplarlas como una entidad propia ("Prueba Combinada") que agrupa sub-pruebas con puntaje acumulado, no como una prueba simple.

### Decatlón (Masculino)
| Día | Orden | Prueba |
|---|---|---|
| Sábado | 1 | 100 metros llanos |
| Sábado | 2 | Salto en largo |
| Sábado | 3 | Lanzamiento de bala |
| Sábado | 4 | Salto en alto |
| Sábado | 5 | 400 metros llanos |
| Domingo | 6 | 110 metros vallas |
| Domingo | 7 | Lanzamiento de disco |
| Domingo | 8 | Salto con garrocha |
| Domingo | 9 | Lanzamiento de jabalina |
| Domingo | 10 | 1500 metros llanos |

### Heptatlón (Femenino)
| Día | Orden | Prueba |
|---|---|---|
| Sábado | 1 | 100 metros vallas |
| Sábado | 2 | Salto en alto |
| Sábado | 3 | Lanzamiento de bala |
| Sábado | 4 | 200 metros llanos |
| Domingo | 5 | Salto en largo |
| Domingo | 6 | Lanzamiento de jabalina |
| Domingo | 7 | 800 metros llanos |

---

## 5. Regla Especial de Resultados — Pruebas sin Final

⚠️ **Importante para el catálogo de Reglas de Negocio (Paso 3):**

En las pruebas marcadas como "Series" (sin instancia de Final separada), **no siempre se corre una final**. En esos casos, el podio se determina directamente por los **tiempos obtenidos en el conjunto de todas las series** (ranking cronométrico general), sin una carrera final adicional.

Esto implica que el sistema de carga de resultados/marcas debe soportar dos modalidades de definición de podio:
1. **Con Final:** el resultado de la Final define el podio.
2. **Sin Final (por tiempos):** el podio surge de ordenar los tiempos de todas las series entre sí.

Esta regla deberá formalizarse en el catálogo de Reglas de Negocio antes de diseñar el módulo de carga de resultados.

---

## 6. Reglas complementarias de inscripción y resultados (revisión 06/11/2026)

- Cada torneo habilita sus categorías y las disciplinas disponibles para cada una; el catálogo general no obliga a que todos los torneos ofrezcan todo.
- Cada participante selecciona una única categoría elegible por torneo y la mantiene para todas sus pruebas. Puede anotarse en cualquier cantidad de pruebas habilitadas y el sistema no impide solapamientos horarios.
- El organizador informa si se elimina una prueba con inscriptos, y el eventual reintegro se coordina fuera de la plataforma.
- Los relevos continúan informados en el catálogo, pero la aplicación no inscribe equipos de relevos en esta versión.
- Para resultados autodeclarados del atleta: menor tiempo es mejor en carreras y mayor distancia en saltos/lanzamientos; se conserva unidad/precisión, viento cuando corresponda y posibles estados DNS, DNF, DQ o NM. Marcas con viento no homologable no deben presentarse como récord oficial.
- Las reglas de podio por series o final y el puntaje de combinadas se mantienen como referencia deportiva para módulos futuros: **no** implican cálculo automático oficial en esta versión. Las marcas/PB son cargadas manualmente por cada atleta, sin integración federativa.
