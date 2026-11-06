import { useState } from 'react';
import type { PlanSemanal } from '../../../../Athlex_UI_Integracion/Frontend/src/types/training';
import { DayNavigator } from './DayNavigator';
import { DayPlanCard } from './DayPlanCard';

interface Props { plan: PlanSemanal; especialidad: string; }
export function WeeklyPlan({ plan, especialidad }: Props) {
  const [indice, setIndice] = useState(0);
  return (
    <section aria-labelledby="ax-plan-title">
      <div className="ax-section-heading"><div><h2 id="ax-plan-title">Planificación semanal</h2><p>{plan.titulo} · {plan.rango}</p></div></div>
      <div className="ax-only-mobile">
        <DayNavigator indice={indice} total={plan.dias.length} diaActual={plan.dias[indice].dia} onChange={setIndice} />
        <DayPlanCard dia={plan.dias[indice]} especialidad={especialidad} />
      </div>
      <div className="ax-week-grid ax-only-desktop">
        {plan.dias.map(dia => <DayPlanCard key={dia.id} dia={dia} especialidad={especialidad} compacta />)}
      </div>
      <p className="ax-helper">Los colores de las cabeceras son orientativos y no se usan para calcular las sensaciones registradas.</p>
    </section>
  );
}
