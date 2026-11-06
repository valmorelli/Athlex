
import { Router } from "express";
import { prisma } from "../prisma.js";

export const clubRouter = Router();

clubRouter.get("/test", async (_req, res) => {
  try {
    const cantidadClubes = await prisma.club.count();

    res.json({
      mensaje: "Conexión con PostgreSQL exitosa",
      cantidadClubes,
    });
  } catch (error) {
    console.error("Error al consultar clubes:", error);

    res.status(500).json({
      mensaje: "Error al conectar con la base de datos",
    });
  }
});
