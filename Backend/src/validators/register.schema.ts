
import { z } from "zod";

const fechaValida = (valor: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    return false;
  }

  const fecha = new Date(`${valor}T00:00:00.000Z`);

  return (
    !Number.isNaN(fecha.getTime()) &&
    fecha.toISOString().slice(0, 10) === valor &&
    fecha.getTime() <= Date.now()
  );
};

export const registerSchema = z.object({
  nombre: z.string().trim().min(2).max(80),
  apellido: z.string().trim().min(2).max(80),

  email: z.email().trim().toLowerCase(),

  password: z.string().min(8).max(64),

  fechaNacimiento: z.string().refine(fechaValida, {
    message: "Ingresá una fecha de nacimiento válida",
  }),

  tipoParticipante: z.enum([
    "INSTITUCIONAL",
    "EXTERNO",
  ]),

  especialidadPrincipal: z
    .string()
    .trim()
    .max(100)
    .optional(),
});

export type RegisterInput = z.infer<
  typeof registerSchema
>;
