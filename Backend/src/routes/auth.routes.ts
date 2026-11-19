
import { Router } from "express";
import {
  login,
  logout,
  obtenerMiUsuario,
} from "../controllers/auth.controller.js";
import { autenticar } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/me", autenticar, (_req, res) => {
  void obtenerMiUsuario(res);
});
authRouter.post("/logout", logout);
