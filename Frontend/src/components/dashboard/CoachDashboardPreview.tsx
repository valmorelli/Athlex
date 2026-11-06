import { registrosDemo } from "../../data/demoTraining";
import { opcionesSensacion } from '../training/RPESelector';

export function CoachDashboardPreview() {
  const completos = registrosDemo.filter(r => r.estado === 'COMPLETADO');
  const porcentajeAsistencia = Math.round((completos.length / registrosDemo.length) * 100);
  const violetas = completos.filter(r => r.sensacion === 'VIOLETA').length;
  return <section aria-labelledby="ax-coach-title">
    <div className="ax-section-heading"><div><h2 id="ax-coach-title">Panel del entrenador</h2><p>Indicadores ilustrativos · 7 registros ficticios</p></div></div>
    <div className="ax-stats">
      <div className="ax-stat"><span>Asistencia</span><strong>{porcentajeAsistencia}%</strong><small>{completos.length} de {registrosDemo.length} completados</small></div>
      <div className="ax-stat"><span>Alertas violetas</span><strong>{violetas}</strong><small>Revisar con el atleta</small></div>
      <div className="ax-stat"><span>Ausencias</span><strong>{registrosDemo.length - completos.length}</strong><small>Incluye sin registrar</small></div>
    </div>
    <div className="ax-panel"><h3>Distribución de sensaciones</h3><p className="ax-muted">Porcentaje sobre {completos.length} entrenamientos completados.</p>
      {opcionesSensacion.map(s => {
        const cantidad = completos.filter(r => r.sensacion === s.value).length;
        const pct = completos.length ? Math.round(cantidad / completos.length * 100) : 0;
        return <div className="ax-chart-row" key={s.value}>
          <span>{s.label}</span><div className="ax-chart-track"><div className="ax-chart-bar" style={{ width: `${pct}%`, backgroundColor: s.color }} /></div><strong>{pct}%</strong>
        </div>;
      })}
    </div>
  </section>;
}
