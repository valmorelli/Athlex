export type Sensacion = 'VERDE' | 'AMARILLO' | 'NARANJA' | 'ROJO' | 'VIOLETA';
export type EstadoRegistro = 'COMPLETADO' | 'NO_REALIZADO' | 'SIN_REGISTRAR';

export interface DiaPlanificado {
  id: string;
  dia: string;
  fecha: string;
  titulo: string;
  colorOrientativo: string;
  contenidoGeneral: string;
  notaEntrenador?: string;
}
export interface PlanSemanal {
  titulo: string;
  rango: string;
  dias: DiaPlanificado[];
}
export interface RegistroDiario {
  estado: EstadoRegistro;
  sensacion: Sensacion | null;
  calzado: 'ZAPATILLAS' | 'CLAVOS' | null;
  observaciones: string;
  clima: string;
  motivoFalta: string;
}
