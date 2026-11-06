import type { DiaPlanificado } from '../../../../Athlex_UI_Integracion/Frontend/src/types/training';

const especialidades = ['vallistas', 'velocistas', 'saltadores', 'fondistas', 'corredores de 400'];

// Resalta palabras clave sin intentar deducir dónde termina cada trabajo.
function resaltar(linea: string, especialidad: string) {
  const patron = /(vallistas|velocistas|saltadores|fondistas|corredores de 400)/gi;
  return linea.split(patron).map((parte, i) => {
    const coincide = especialidades.some(e => e === parte.toLowerCase());
    const esPropia = parte.toLowerCase() === especialidad.toLowerCase();
    return coincide ? <mark key={i} className={esPropia ? 'ax-highlight ax-highlight--mine' : 'ax-highlight'}>{parte}</mark> : <span key={i}>{parte}</span>;
  });
}

interface Props { dia: DiaPlanificado; especialidad: string; compacta?: boolean; }
export function DayPlanCard({ dia, especialidad, compacta = false }: Props) {
  return (
    <article className={`ax-day-card ${compacta ? 'ax-day-card--compact' : ''}`}>
      <header className="ax-day-card__header" style={{ borderTopColor: dia.colorOrientativo }}>
        <div><strong>{dia.dia}</strong><span>{dia.titulo}</span></div>
        <span className="ax-day-card__dot" style={{ backgroundColor: dia.colorOrientativo }} aria-label="Color orientativo del entrenador" />
      </header>
      <div className="ax-day-card__content">
        {dia.contenidoGeneral.split('\n').map((linea, i) => <p key={i}>{resaltar(linea, especialidad)}</p>)}
      </div>
      {dia.notaEntrenador && <div className="ax-note"><strong>Nota del entrenador</strong><p>{dia.notaEntrenador}</p></div>}
    </article>
  );
}
