import type { Sensacion } from '../../../../Athlex_UI_Integracion/Frontend/src/types/training';
export const opcionesSensacion: { value: Sensacion; label: string; color: string }[] = [
  { value: 'VERDE', label: 'Muy suave', color: '#54b66d' },
  { value: 'AMARILLO', label: 'Suave', color: '#e5c75b' },
  { value: 'NARANJA', label: 'Medio', color: '#e99959' },
  { value: 'ROJO', label: 'Fuerte', color: '#ef7171' },
  { value: 'VIOLETA', label: 'Molestia / dolor', color: '#b695ec' },
];
interface Props { value: Sensacion | null; onChange: (v: Sensacion) => void; }
export function RPESelector({ value, onChange }: Props) {
  return <fieldset className="ax-fieldset"><legend>Sensación del entrenamiento</legend><div className="ax-rpe-options">
    {opcionesSensacion.map(o => <label key={o.value} className={`ax-rpe-option ${value === o.value ? 'ax-rpe-option--selected' : ''}`} style={{ borderColor: value === o.value ? o.color : undefined }}>
      <input type="radio" name="sensacion" value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
      <span className="ax-rpe-dot" style={{ backgroundColor: o.color }} /><span>{o.label}</span>
    </label>)}
  </div></fieldset>;
}
