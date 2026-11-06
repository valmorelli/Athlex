import type { PlanSemanal, RegistroDiario } from '../types/training';

// Datos demostrativos adaptados del prototipo. NO provienen de Google Sheets ni de PostgreSQL.
export const planDemo: PlanSemanal = {
  titulo: 'Semana de ejemplo',
  rango: 'Datos de demostración · Sin sincronización',
  dias: [
    { id: 'lu', dia: 'Lunes', fecha: 'Día 1', titulo: 'Pesas', colorOrientativo: '#f5d66b',
      contenidoGeneral: 'EC: trote / movilidad / coordinación.\nPesas: cargada de potencia y sentadillas.\nFondistas: 30 min de fondo.',
      notaEntrenador: 'Prestar atención a la técnica.' },
    { id: 'ma', dia: 'Martes', fecha: 'Día 2', titulo: 'Pista', colorOrientativo: '#e88d80',
      contenidoGeneral: 'EC: trote y movilidad.\nVallistas: trabajos técnicos de pasaje.\nVelocistas: partidas y aceleraciones.\nSaltadores: técnica de carrera.',
      notaEntrenador: 'Respetar las pausas de recuperación.' },
    { id: 'mi', dia: 'Miércoles', fecha: 'Día 3', titulo: 'Activación', colorOrientativo: '#8cbedc',
      contenidoGeneral: 'EC: coordinación y movilidad.\nPesas: arranque y sentadillas.\nFondistas: cambios de ritmo.' },
    { id: 'ju', dia: 'Jueves', fecha: 'Día 4', titulo: 'Técnica', colorOrientativo: '#e9a568',
      contenidoGeneral: 'EC: trote y coordinación.\nVallistas / Velocistas: pasadas y partidas.\nCorredores de 400: trabajos específicos.\nSaltadores: saltos completos.' },
    { id: 'vi', dia: 'Viernes', fecha: 'Día 5', titulo: 'Regenerativo', colorOrientativo: '#9fce9a',
      contenidoGeneral: 'EC: movilidad.\nPesas: técnica ligera.\nFondistas: regenerativo 20 min.',
      notaEntrenador: 'Quienes compiten pueden realizar solo activación.' },
  ],
};

export const registrosDemo: RegistroDiario[] = [
  { estado: 'COMPLETADO', sensacion: 'VERDE', calzado: 'ZAPATILLAS', observaciones: '', clima: '', motivoFalta: '' },
  { estado: 'COMPLETADO', sensacion: 'AMARILLO', calzado: 'CLAVOS', observaciones: '', clima: '', motivoFalta: '' },
  { estado: 'COMPLETADO', sensacion: 'NARANJA', calzado: 'ZAPATILLAS', observaciones: '', clima: '', motivoFalta: '' },
  { estado: 'COMPLETADO', sensacion: 'ROJO', calzado: 'CLAVOS', observaciones: '', clima: '', motivoFalta: '' },
  { estado: 'COMPLETADO', sensacion: 'VIOLETA', calzado: 'ZAPATILLAS', observaciones: '', clima: '', motivoFalta: '' },
  { estado: 'NO_REALIZADO', sensacion: null, calzado: null, observaciones: '', clima: '', motivoFalta: 'Descanso indicado' },
  { estado: 'SIN_REGISTRAR', sensacion: null, calzado: null, observaciones: '', clima: '', motivoFalta: '' },
];
