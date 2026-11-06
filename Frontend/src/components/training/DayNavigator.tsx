interface Props { indice: number; total: number; diaActual: string; onChange: (next: number) => void; }
export function DayNavigator({ indice, total, diaActual, onChange }: Props) {
  return (
    <div className="ax-day-navigator" aria-label="Navegación de días">
      <button className="ax-icon-button" type="button" onClick={() => onChange(indice - 1)} disabled={indice === 0} aria-label="Día anterior">‹</button>
      <strong>{diaActual}</strong>
      <button className="ax-icon-button" type="button" onClick={() => onChange(indice + 1)} disabled={indice === total - 1} aria-label="Día siguiente">›</button>
    </div>
  );
}
