-- BORRADOR para incorporar DENTRO de una migracion Prisma, DESPUES de crear tablas.
-- No ejecutar por separado sin revisar los nombres de columnas y el SQL generado.
-- El esquema Prisma no incluye estos indices por ser parciales.

CREATE UNIQUE INDEX IF NOT EXISTS "uq_principal_activo_por_atleta_club"
ON "AsignacionEntrenador" ("clubId", "atletaId")
WHERE "tipo" = 'PRINCIPAL' AND "hasta" IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "uq_asignacion_entrenador_activa"
ON "AsignacionEntrenador" ("clubId", "atletaId", "entrenadorId")
WHERE "hasta" IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "uq_pb_actual"
ON "MarcaDeportivaActual" ("atletaId", "disciplinaId")
WHERE "tipoMarca" = 'PB';

CREATE UNIQUE INDEX IF NOT EXISTS "uq_sb_por_temporada"
ON "MarcaDeportivaActual" ("atletaId", "disciplinaId", "temporadaAnio")
WHERE "tipoMarca" = 'SB';

CREATE UNIQUE INDEX IF NOT EXISTS "uq_carril_por_serie"
ON "AsignacionSerie" ("serieId", "carril")
WHERE "carril" IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "uq_permiso_organizador_activo"
ON "PermisoOrganizador" ("clubId", "usuarioId")
WHERE "activo" = true;

ALTER TABLE "MarcaDeportivaActual"
  ADD CONSTRAINT "ck_pb_sb_temporada"
  CHECK (("tipoMarca" = 'PB' AND "temporadaAnio" IS NULL)
      OR ("tipoMarca" = 'SB' AND "temporadaAnio" IS NOT NULL));

ALTER TABLE "InscripcionPrueba"
  ADD CONSTRAINT "ck_referencia_valor_unidad"
  CHECK (("marcaReferencia" IS NULL AND "unidadMarcaReferencia" IS NULL)
      OR ("marcaReferencia" IS NOT NULL AND "unidadMarcaReferencia" IS NOT NULL));

ALTER TABLE "RegistroDiario"
  ADD CONSTRAINT "ck_registro_completado_datos"
  CHECK ("estado" <> 'COMPLETADO' OR ("sensacion" IS NOT NULL AND "calzado" IS NOT NULL));

ALTER TABLE "Torneo" ADD CONSTRAINT "ck_precio_torneo" CHECK ("precioPorPrueba" >= 0);
ALTER TABLE "InscripcionPrueba" ADD CONSTRAINT "ck_precio_pactado" CHECK ("precioPactado" >= 0);
ALTER TABLE "Pago" ADD CONSTRAINT "ck_monto_pago" CHECK ("monto" >= 0);
ALTER TABLE "Credito" ADD CONSTRAINT "ck_saldo_credito"
 CHECK ("montoInicial" >= 0 AND "saldoDisponible" >= 0 AND "saldoDisponible" <= "montoInicial");
ALTER TABLE "SeriePista" ADD CONSTRAINT "ck_capacidad_serie"
 CHECK (("modalidadSerie" = 'CARRILES_6' AND "capacidadMaxima" = 6)
     OR ("modalidadSerie" = 'GRUPO_15' AND "capacidadMaxima" = 15));
ALTER TABLE "AsignacionSerie" ADD CONSTRAINT "ck_carril_valido"
 CHECK ("carril" IS NULL OR "carril" BETWEEN 1 AND 6);

-- Pendiente en servicios/transacciones:
-- (1) unicidad de grupo vigente por atleta/club (clubId se obtiene de GrupoEntrenamiento);
-- (2) consistencia de prueba y torneo para detalles de inscripción;
-- (3) consistencia de categoría/sexo/prueba en cada asignación de serie;
-- (4) cupos de serie y una asignación por inscripción-prueba/exportación;
-- (5) créditos concurrentes, sumatoria de reintegros y alcance del club;
-- (6) que solo el entrenador principal sincronice fuentes/planes.
