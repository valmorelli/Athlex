
import type {
  Request,
  Response,
  NextFunction,
} from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";

export const COOKIE_SESION = "athlex_session";

export function obtenerClaveJWT(): string {
  const clave = process.env.JWT_SECRET;

  if (!clave || clave.length < 32) {
    throw new Error(
      "JWT_SECRET debe tener al menos 32 caracteres"
    );
  }

  return clave;
}

export async function autenticar(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.[COOKIE_SESION];

  if (typeof token !== "string") {
    res.status(401).json({
      mensaje: "No hay una sesión iniciada",
    });
    return;
  }

  try {
    const datos = jwt.verify(
      token,
      obtenerClaveJWT(),
      { algorithms: ["HS256"] }
    );

    if (
      typeof datos === "string" ||
      typeof datos.sub !== "string"
    ) {
      res.status(401).json({
        mensaje: "Sesión inválida",
      });
      return;
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: datos.sub },
      select: {
        id: true,
        estadoCuenta: true,
      },
    });

    if (!usuario || usuario.estadoCuenta !== "ACTIVA") {
      res.status(401).json({
        mensaje: "Sesión inválida",
      });
      return;
    }

    res.locals.usuarioId = usuario.id;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        mensaje: "Sesión inválida o vencida",
      });
      return;
    }

    console.error("Error de autenticación:", error);

    res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
}
