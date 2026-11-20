
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { prisma } from "../prisma.js";
import { loginSchema } from "../validators/auth.schema.js";
import { verificarCredenciales } from "../services/auth.service.js";
import {
  COOKIE_SESION,
  obtenerClaveJWT,
} from "../middlewares/auth.middleware.js";

const DURACION_SESION = 2 * 60 * 60 * 1000;

const opcionesCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function login(
  req: Request,
  res: Response
) {
  try {
    const datos = loginSchema.parse(req.body);

    const usuario = await verificarCredenciales(datos);

    if (!usuario) {
      res.status(401).json({
        mensaje: "Correo o contraseña incorrectos",
      });
      return;
    }

    const token = jwt.sign(
      {},
      obtenerClaveJWT(),
      {
        subject: usuario.id,
        expiresIn: "2h",
        algorithm: "HS256",
      }
    );

    res.cookie(COOKIE_SESION, token, {
      ...opcionesCookie,
      maxAge: DURACION_SESION,
    });

    res.json({
      mensaje: "Sesión iniciada correctamente",
      usuario,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        mensaje: "Datos de inicio de sesión inválidos",
        errores: error.issues.map((issue) => ({
          campo: issue.path.join("."),
          mensaje: issue.message,
        })),
      });
      return;
    }

    console.error("Error en login:", error);

    res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
}

export async function obtenerMiUsuario(
  res: Response
) {
  try {
    const usuarioId = res.locals.usuarioId as string;

    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        tipoParticipante: true,
        estadoCuenta: true,
      },
    });

    if (!usuario) {
      res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
      return;
    }

    res.json({ usuario });
  } catch (error) {
    console.error("Error al consultar usuario:", error);

    res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
}

export function logout(
  _req: Request,
  res: Response
) {
  res.clearCookie(COOKIE_SESION, opcionesCookie);

  res.json({
    mensaje: "Sesión cerrada correctamente",
  });
}
