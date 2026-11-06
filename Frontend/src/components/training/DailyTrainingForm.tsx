import { useState } from 'react';
import type { FormEvent } from 'react';
import type { EstadoRegistro, RegistroDiario } from '../../../../Athlex_UI_Integracion/Frontend/src/types/training';
import { RPESelector } from './RPESelector';

const inicial: RegistroDiario = { estado: 'SIN_REGISTRAR', sensacion: null, calzado: null, clima: '', observaciones: '', motivoFalta: '' };
export function DailyTrainingForm() {
  const [registro, setRegistro] = useState<RegistroDiario>(inicial);
  const [mensaje, setMensaje] = useState('');
  const update = (changes: Partial<RegistroDiario>) => { setRegistro(prev => ({ ...prev, ...changes })); setMensaje(''); };
  const estado = (nuevo: EstadoRegistro) => update({ estado: nuevo, ...(nuevo === 'COMPLETADO' ? { motivoFalta: '' } : { sensacion: null, calzado: null }) });
  function simular(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (registro.estado === 'SIN_REGISTRAR') { setMensaje('Elegí Completado o No realizado para registrar el día.'); return; }
    if (registro.estado === 'COMPLETADO' && (!registro.sensacion || !registro.calzado)) { setMensaje('Seleccioná la sensación y el calzado.'); return; }
    setMensaje('Datos validados en esta demostración. No se enviaron al backend ni se guardaron.');
  }
  return <section className="ax-panel" aria-labelledby="ax-form-title">
    <h2 id="ax-form-title">Registro diario</h2>
    <p className="ax-muted">Demo visual · sin persistencia. La integración con PostgreSQL se realizará mediante una API.</p>
    <form onSubmit={simular}>
      <fieldset className="ax-fieldset"><legend>¿Realizaste el entrenamiento?</legend>
        <div className="ax-choice-row">
          <button type="button" aria-pressed={registro.estado === 'COMPLETADO'} className={registro.estado === 'COMPLETADO' ? 'ax-choice ax-choice--selected' : 'ax-choice'} onClick={() => estado('COMPLETADO')}>Completado</button>
          <button type="button" aria-pressed={registro.estado === 'NO_REALIZADO'} className={registro.estado === 'NO_REALIZADO' ? 'ax-choice ax-choice--selected' : 'ax-choice'} onClick={() => estado('NO_REALIZADO')}>No realizado</button>
        </div>
      </fieldset>
      {registro.estado === 'COMPLETADO' && <>
        <RPESelector value={registro.sensacion} onChange={sensacion => update({ sensacion })}/>
        <label className="ax-form-label">Calzado utilizado
          <select value={registro.calzado ?? ''} onChange={e => update({ calzado: e.target.value as RegistroDiario['calzado'] || null })} required>
            <option value="">Seleccionar…</option><option value="ZAPATILLAS">Zapatillas</option><option value="CLAVOS">Clavos</option>
          </select>
        </label>
        <label className="ax-form-label">Clima (opcional)<input value={registro.clima} onChange={e => update({ clima: e.target.value })} placeholder="Ej.: 20 °C, viento" /></label>
        <label className="ax-form-label">Observaciones (opcional)<textarea rows={3} value={registro.observaciones} onChange={e => update({ observaciones: e.target.value })} placeholder="Ej.: hice gimnasio por mi cuenta" /></label>
      </>}
      {registro.estado === 'NO_REALIZADO' && <label className="ax-form-label">Motivo de ausencia (opcional)
        <select value={registro.motivoFalta} onChange={e => update({ motivoFalta: e.target.value })}>
          <option value="">No indicar motivo</option><option value="Descanso indicado">Descanso indicado</option><option value="Lluvia / entrenamiento suspendido">Lluvia / entrenamiento suspendido</option><option value="Enfermedad">Enfermedad</option><option value="Lesión o molestia">Lesión o molestia</option><option value="Motivo personal">Motivo personal</option>
        </select>
        <span className="ax-helper">La ausencia cuenta como falta independientemente de su motivo.</span>
      </label>}
      <button className="ax-primary-button" type="submit">Validar registro (demo)</button>
      {mensaje && <p className="ax-form-message" role="status">{mensaje}</p>}
    </form>
  </section>;
}
