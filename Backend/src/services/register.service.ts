
import bcrypt from "bcryptjs";
import { prisma } from "../prisma.js";

import type {
  RegisterInput,
} from "../validators/register.schema.js";

import {
  guardarAptoMedico,
  eliminarArchivo,
  validarAptoMedico,
} from "./medical-file.service.js";

export async function registrarAtleta(
  datos: RegisterInput,
  archivo: Express.Multer.File
) {
  // 1. Comprobar si el correo ya está registrado.
  const existente = await prisma.usuario.findUnique({
    where: {
      email: datos.email,
    },
    select: { id: true },
  });

  if (existente) {
    throw new Error("EMAIL_DUPLICADO");
  }

  // 2. Validar el contenido del apto médico.
  const aptoValidado = validarAptoMedico(archivo);

  // 3. Convertir la contraseña en un hash.
  const hashClave = await bcrypt.hash(
    datos.password,
    12
  );

  // 4. Guardar el documento en una carpeta privada.
  const archivoGuardado = await guardarAptoMedico(
    aptoValidado
  );

  try {
    // 5. Crear registros relacionados en PostgreSQL.
    const usuario = await prisma.usuario.create({
      data: {
        nombre: datos.nombre,
        apellido: datos.apellido,
        email: datos.email,
        hashClave,

        fechaNacimiento: new Date(
          `${datos.fechaNacimiento}T00:00:00.000Z`
        ),

        tipoParticipante: datos.tipoParticipante,

        perfilAtleta: {
          create: {
            especialidadPrincipal:
              datos.especialidadPrincipal || null,
          },
        },

        documentos: {
          create: {
            tipo: "APTO_MEDICO",
            archivo: {
              create: {
                claveAlmacenamiento:
                  archivoGuardado.claveAlmacenamiento,
                mimeType:
                  archivoGuardado.mimeType,
                tamanoBytes:
                  archivoGuardado.tamanoBytes,
              },
            },
          },
        },
      },

      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        tipoParticipante: true,
        estadoCuenta: true,
      },
    });

    return usuario;
  } catch (error) {
    // Si falló PostgreSQL, intentamos borrar el
    // archivo para no dejar documentos huérfanos.
    try {
      await eliminarArchivo(
        archivoGuardado.rutaAbsoluta
      );
    } catch (errorArchivo) {
      console.error(
        "No se pudo limpiar un archivo huérfano:",
        errorArchivo
      );
    }

    throw error;
  }
}
