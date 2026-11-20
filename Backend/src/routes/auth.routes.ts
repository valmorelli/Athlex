
import { Router } from "express";
import multer from "multer";

import {
  login,
  logout,
  obtenerMiUsuario,
} from "../controllers/auth.controller.js";

import {
  register,
} from "../controllers/register.controller.js";

import {
  autenticar,
} from "../middlewares/auth.middleware.js";

export const authRouter = Router();

const recibirApto = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 10,
  },
}).single("aptoMedico");

// Registro de atletas
authRouter.post("/register", (req, res, next) => {
  recibirApto(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      res.status(400).json({
        mensaje:
          error.code === "LIMIT_FILE_SIZE"
            ? "El archivo supera el límite de 5 MB"
            : "El formulario o archivo es inválido",
      });
      return;
    }

    if (error) {
      next(error);
      return;
    }

    void register(req, res);
  });
});

// Inicio de sesión
authRouter.post("/login", login);

// Consultar usuario autenticado
authRouter.get(
  "/me",
  autenticar,
  (_req, res) => {
    void obtenerMiUsuario(res);
  }
);

// Cerrar sesión
authRouter.post("/logout", logout);
