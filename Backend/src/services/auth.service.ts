
import bcrypt from "bcryptjs";
import { prisma } from "../prisma.js";
import type { LoginInput } from "../validators/auth.schema.js";

export async function verificarCredenciales(
  datos: LoginInput
) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: datos.email,
    },
  });

  if (!usuario) {
    return null;
  }

  const claveCorrecta = await bcrypt.compare(
    datos.password,
    usuario.hashClave
  );

  if (!claveCorrecta) {
    return null;
  }

  if (usuario.estadoCuenta !== "ACTIVA") {
    return null;
  }

  return {
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    tipoParticipante: usuario.tipoParticipante,
  };
}
