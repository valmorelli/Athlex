
import type {
  Request,
  Response,
} from "express";

import { ZodError } from "zod";

import {
  registerSchema,
} from "../validators/register.schema.js";

import {
  registrarAtleta,
} from "../services/register.service.js";

export async function register(
  req: Request,
  res: Response
) {
  try {
    if (!req.file) {
      res.status(400).json({
        mensaje: "El apto médico es obligatorio",
      });
      return;
    }

    const datos = registerSchema.parse(req.body);

    const usuario = await registrarAtleta(
      datos,
      req.file
    );

    res.status(201).json({
      mensaje: "Cuenta creada correctamente",
      usuario,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        mensaje: "Datos de registro inválidos",
        errores: error.issues.map((issue) => ({
          campo: issue.path.join("."),
          mensaje: issue.message,
        })),
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "TIPO_ARCHIVO_INVALIDO"
    ) {
      res.status(400).json({
        mensaje:
          "El apto médico debe ser un PDF, JPG o PNG válido",
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "EMAIL_DUPLICADO"
    ) {
      res.status(409).json({
        mensaje: "El correo ya está registrado",
      });
      return;
    }

    // También cubre un correo registrado
    // simultáneamente desde otra petición.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        mensaje: "Ya existe un registro con esos datos",
      });
      return;
    }

    console.error("Error de registro:", error);

    res.status(500).json({
      mensaje: "No se pudo completar el registro",
    });
  }
}
