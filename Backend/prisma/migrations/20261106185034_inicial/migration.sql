-- CreateEnum
CREATE TYPE "EstadoCuenta" AS ENUM ('ACTIVA', 'INACTIVA', 'BLOQUEADA');

-- CreateEnum
CREATE TYPE "TipoParticipante" AS ENUM ('INSTITUCIONAL', 'EXTERNO');

-- CreateEnum
CREATE TYPE "TipoEntrenador" AS ENUM ('PRINCIPAL', 'SECUNDARIO');

-- CreateEnum
CREATE TYPE "EstadoRegistro" AS ENUM ('COMPLETADO', 'NO_REALIZADO', 'SIN_REGISTRAR');

-- CreateEnum
CREATE TYPE "Sensacion" AS ENUM ('VERDE', 'AMARILLO', 'NARANJA', 'ROJO', 'VIOLETA');

-- CreateEnum
CREATE TYPE "EstadoTorneo" AS ENUM ('BORRADOR', 'ABIERTO', 'CERRADO', 'POSTERGADO', 'CANCELADO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "EstadoInscripcion" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'RECHAZADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "EstadoDetallePrueba" AS ENUM ('ACTIVA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('MERCADO_PAGO', 'TRANSFERENCIA', 'CREDITO');

-- CreateEnum
CREATE TYPE "EstadoPago" AS ENUM ('PENDIENTE_VERIFICACION', 'ACREDITADO', 'RECHAZADO', 'REINTEGRADO', 'APLICADO_CREDITO');

-- CreateEnum
CREATE TYPE "TipoMarca" AS ENUM ('PB', 'SB');

-- CreateEnum
CREATE TYPE "ModalidadSerie" AS ENUM ('CARRILES_6', 'GRUPO_15');

-- CreateEnum
CREATE TYPE "EstadoTarea" AS ENUM ('PENDIENTE', 'EJECUTANDO', 'COMPLETADA', 'CANCELADA', 'ERROR');

-- CreateTable
CREATE TABLE "Club" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'ACTIVO',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "hashClave" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "sexoCompetencia" TEXT,
    "estadoCuenta" "EstadoCuenta" NOT NULL DEFAULT 'ACTIVA',
    "tipoParticipante" "TipoParticipante" NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoEntrenamiento" (
    "id" UUID NOT NULL,
    "clubId" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "GrupoEntrenamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembresiaClub" (
    "id" UUID NOT NULL,
    "clubId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "desde" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasta" TIMESTAMP(3),
    "estado" TEXT NOT NULL DEFAULT 'ACTIVA',

    CONSTRAINT "MembresiaClub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembresiaGrupo" (
    "id" UUID NOT NULL,
    "grupoId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "desde" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasta" TIMESTAMP(3),

    CONSTRAINT "MembresiaGrupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfilAtleta" (
    "usuarioId" UUID NOT NULL,
    "especialidadPrincipal" TEXT,
    "peso" DECIMAL(7,2),
    "fichaDeportiva" TEXT,
    "historialMedico" TEXT,

    CONSTRAINT "PerfilAtleta_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateTable
CREATE TABLE "PerfilEntrenador" (
    "usuarioId" UUID NOT NULL,
    "dni" TEXT,
    "licencia" TEXT,
    "estadoValidacion" TEXT NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "PerfilEntrenador_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateTable
CREATE TABLE "AsignacionEntrenador" (
    "id" UUID NOT NULL,
    "clubId" UUID NOT NULL,
    "atletaId" UUID NOT NULL,
    "entrenadorId" UUID NOT NULL,
    "tipo" "TipoEntrenador" NOT NULL,
    "desde" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasta" TIMESTAMP(3),

    CONSTRAINT "AsignacionEntrenador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermisoOrganizador" (
    "id" UUID NOT NULL,
    "clubId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "otorgadoPorId" UUID NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "otorgadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revocadoEn" TIMESTAMP(3),

    CONSTRAINT "PermisoOrganizador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CuentaCobroClub" (
    "id" UUID NOT NULL,
    "clubId" UUID NOT NULL,
    "alias" TEXT,
    "cbuCvu" TEXT,
    "referenciaMP" TEXT,

    CONSTRAINT "CuentaCobroClub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuentePlanilla" (
    "id" UUID NOT NULL,
    "clubId" UUID NOT NULL,
    "entrenadorPrincipalId" UUID NOT NULL,
    "spreadsheetId" TEXT NOT NULL,
    "pestana" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "ultimaSincronizacion" TIMESTAMP(3),

    CONSTRAINT "FuentePlanilla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanSemanal" (
    "id" UUID NOT NULL,
    "fuentePlanillaId" UUID NOT NULL,
    "entrenadorPrincipalId" UUID NOT NULL,
    "lunesInicio" DATE NOT NULL,
    "numeroVersionVigente" INTEGER,
    "estado" TEXT NOT NULL DEFAULT 'PUBLICADO',

    CONSTRAINT "PlanSemanal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VersionPlan" (
    "id" UUID NOT NULL,
    "planSemanalId" UUID NOT NULL,
    "numeroVersion" INTEGER NOT NULL,
    "sincronizadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sincronizadoPorId" UUID NOT NULL,
    "estadoLectura" TEXT NOT NULL,

    CONSTRAINT "VersionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaPlanificado" (
    "id" UUID NOT NULL,
    "versionPlanId" UUID NOT NULL,
    "fecha" DATE NOT NULL,
    "contenidoGeneral" TEXT NOT NULL,
    "notaEntrenador" TEXT,
    "colorOrientativo" TEXT,

    CONSTRAINT "DiaPlanificado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotivoFalta" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MotivoFalta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroDiario" (
    "id" UUID NOT NULL,
    "clubId" UUID NOT NULL,
    "atletaId" UUID NOT NULL,
    "fecha" DATE NOT NULL,
    "estado" "EstadoRegistro" NOT NULL,
    "sensacion" "Sensacion",
    "calzado" TEXT,
    "observaciones" TEXT,
    "motivoFaltaId" UUID,
    "motivoLibre" TEXT,
    "guardadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegistroDiario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ejercicio" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Ejercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestFuerza" (
    "id" UUID NOT NULL,
    "atletaId" UUID NOT NULL,
    "ejercicioId" UUID NOT NULL,
    "valor1RM" DECIMAL(9,2) NOT NULL,
    "fechaTest" DATE NOT NULL,

    CONSTRAINT "TestFuerza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Torneo" (
    "id" UUID NOT NULL,
    "clubId" UUID NOT NULL,
    "organizadorId" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fin" TIMESTAMP(3) NOT NULL,
    "cierreInscripciones" TIMESTAMP(3) NOT NULL,
    "precioPorPrueba" DECIMAL(12,2) NOT NULL,
    "estado" "EstadoTorneo" NOT NULL DEFAULT 'BORRADOR',

    CONSTRAINT "Torneo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoMedicion" TEXT NOT NULL,
    "unidadPredeterminada" TEXT NOT NULL,
    "modalidadSalida" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "edadMin" INTEGER NOT NULL,
    "edadMax" INTEGER,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PruebaTorneo" (
    "id" UUID NOT NULL,
    "torneoId" UUID NOT NULL,
    "disciplinaId" UUID NOT NULL,
    "estado" "EstadoDetallePrueba" NOT NULL DEFAULT 'ACTIVA',

    CONSTRAINT "PruebaTorneo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaHabilitadaPrueba" (
    "pruebaTorneoId" UUID NOT NULL,
    "categoriaId" UUID NOT NULL,

    CONSTRAINT "CategoriaHabilitadaPrueba_pkey" PRIMARY KEY ("pruebaTorneoId","categoriaId")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" UUID NOT NULL,
    "torneoId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "categoriaId" UUID NOT NULL,
    "sexoCompetencia" TEXT NOT NULL,
    "estado" "EstadoInscripcion" NOT NULL DEFAULT 'PENDIENTE',
    "creadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InscripcionPrueba" (
    "id" UUID NOT NULL,
    "inscripcionId" UUID NOT NULL,
    "pruebaTorneoId" UUID NOT NULL,
    "precioPactado" DECIMAL(12,2) NOT NULL,
    "marcaReferencia" DECIMAL(12,3),
    "unidadMarcaReferencia" TEXT,
    "estado" "EstadoDetallePrueba" NOT NULL DEFAULT 'ACTIVA',

    CONSTRAINT "InscripcionPrueba_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExportacionInscriptos" (
    "id" UUID NOT NULL,
    "torneoId" UUID NOT NULL,
    "archivoId" UUID,
    "generadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'GENERADA',

    CONSTRAINT "ExportacionInscriptos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriePista" (
    "id" UUID NOT NULL,
    "pruebaTorneoId" UUID NOT NULL,
    "categoriaId" UUID NOT NULL,
    "sexoCompetencia" TEXT NOT NULL,
    "numeroSerie" INTEGER NOT NULL,
    "capacidadMaxima" INTEGER NOT NULL,
    "modalidadSerie" "ModalidadSerie" NOT NULL,
    "generadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exportacionId" UUID NOT NULL,

    CONSTRAINT "SeriePista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsignacionSerie" (
    "id" UUID NOT NULL,
    "serieId" UUID NOT NULL,
    "inscripcionPruebaId" UUID NOT NULL,
    "carril" INTEGER,
    "marcaOrdenamiento" DECIMAL(12,3),
    "origenMarcaOrdenamiento" TEXT NOT NULL,

    CONSTRAINT "AsignacionSerie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarcaDeportivaActual" (
    "id" UUID NOT NULL,
    "atletaId" UUID NOT NULL,
    "disciplinaId" UUID NOT NULL,
    "tipoMarca" "TipoMarca" NOT NULL,
    "temporadaAnio" INTEGER,
    "valor" DECIMAL(12,3) NOT NULL,
    "unidad" TEXT NOT NULL,
    "viento" DECIMAL(5,2),
    "fechaMarca" DATE,

    CONSTRAINT "MarcaDeportivaActual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchivoAdjunto" (
    "id" UUID NOT NULL,
    "claveAlmacenamiento" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "tamanoBytes" INTEGER NOT NULL,

    CONSTRAINT "ArchivoAdjunto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" UUID NOT NULL,
    "inscripcionId" UUID NOT NULL,
    "metodo" "MetodoPago" NOT NULL,
    "estado" "EstadoPago" NOT NULL DEFAULT 'PENDIENTE_VERIFICACION',
    "monto" DECIMAL(12,2) NOT NULL,
    "referenciaExterna" TEXT,
    "acreditadoEn" TIMESTAMP(3),

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComprobantePago" (
    "id" UUID NOT NULL,
    "pagoId" UUID NOT NULL,
    "archivoId" UUID NOT NULL,
    "revisadoPorId" UUID,
    "revisadoEn" TIMESTAMP(3),

    CONSTRAINT "ComprobantePago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credito" (
    "id" UUID NOT NULL,
    "clubId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "pagoOrigenId" UUID NOT NULL,
    "montoInicial" DECIMAL(12,2) NOT NULL,
    "saldoDisponible" DECIMAL(12,2) NOT NULL,
    "registradoPorId" UUID NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Credito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimientoCredito" (
    "id" UUID NOT NULL,
    "creditoId" UUID NOT NULL,
    "inscripcionDestinoId" UUID NOT NULL,
    "tipo" TEXT NOT NULL,
    "monto" DECIMAL(12,2) NOT NULL,
    "registradoPorId" UUID NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovimientoCredito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReintegroRegistrado" (
    "id" UUID NOT NULL,
    "pagoId" UUID NOT NULL,
    "monto" DECIMAL(12,2) NOT NULL,
    "fechaInformada" TIMESTAMP(3) NOT NULL,
    "registradoPorId" UUID NOT NULL,

    CONSTRAINT "ReintegroRegistrado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentoMedico" (
    "id" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "archivoId" UUID NOT NULL,
    "tipo" TEXT NOT NULL,
    "cargadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vencimientoInformado" DATE,

    CONSTRAINT "DocumentoMedico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CronogramaTorneo" (
    "id" UUID NOT NULL,
    "torneoId" UUID NOT NULL,
    "archivoPdfId" UUID NOT NULL,
    "publicadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CronogramaTorneo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" UUID NOT NULL,
    "destinatarioId" UUID NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "creadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leidaEn" TIMESTAMP(3),

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuscripcionPush" (
    "id" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "endpoint" TEXT NOT NULL,
    "configuracionCifrada" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SuscripcionPush_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TareaProgramada" (
    "id" UUID NOT NULL,
    "torneoId" UUID NOT NULL,
    "tipo" TEXT NOT NULL,
    "ejecutarEn" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoTarea" NOT NULL DEFAULT 'PENDIENTE',
    "revision" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "TareaProgramada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoAuditoria" (
    "id" UUID NOT NULL,
    "actorId" UUID NOT NULL,
    "entidad" TEXT NOT NULL,
    "entidadId" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "detalle" JSONB,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventoAuditoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TorneoFederativo" (
    "id" UUID NOT NULL,
    "clubId" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3),
    "entidadOrganizadora" TEXT,

    CONSTRAINT "TorneoFederativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InteresFederativo" (
    "id" UUID NOT NULL,
    "torneoFederativoId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "detallePruebas" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InteresFederativo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GrupoEntrenamiento_clubId_nombre_key" ON "GrupoEntrenamiento"("clubId", "nombre");

-- CreateIndex
CREATE INDEX "MembresiaClub_clubId_usuarioId_idx" ON "MembresiaClub"("clubId", "usuarioId");

-- CreateIndex
CREATE INDEX "MembresiaGrupo_usuarioId_hasta_idx" ON "MembresiaGrupo"("usuarioId", "hasta");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilEntrenador_dni_key" ON "PerfilEntrenador"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilEntrenador_licencia_key" ON "PerfilEntrenador"("licencia");

-- CreateIndex
CREATE INDEX "AsignacionEntrenador_clubId_atletaId_tipo_hasta_idx" ON "AsignacionEntrenador"("clubId", "atletaId", "tipo", "hasta");

-- CreateIndex
CREATE INDEX "PermisoOrganizador_clubId_usuarioId_activo_idx" ON "PermisoOrganizador"("clubId", "usuarioId", "activo");

-- CreateIndex
CREATE UNIQUE INDEX "CuentaCobroClub_clubId_key" ON "CuentaCobroClub"("clubId");

-- CreateIndex
CREATE UNIQUE INDEX "FuentePlanilla_clubId_entrenadorPrincipalId_spreadsheetId_p_key" ON "FuentePlanilla"("clubId", "entrenadorPrincipalId", "spreadsheetId", "pestana");

-- CreateIndex
CREATE UNIQUE INDEX "PlanSemanal_entrenadorPrincipalId_lunesInicio_key" ON "PlanSemanal"("entrenadorPrincipalId", "lunesInicio");

-- CreateIndex
CREATE UNIQUE INDEX "VersionPlan_planSemanalId_numeroVersion_key" ON "VersionPlan"("planSemanalId", "numeroVersion");

-- CreateIndex
CREATE UNIQUE INDEX "DiaPlanificado_versionPlanId_fecha_key" ON "DiaPlanificado"("versionPlanId", "fecha");

-- CreateIndex
CREATE UNIQUE INDEX "MotivoFalta_nombre_key" ON "MotivoFalta"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroDiario_clubId_atletaId_fecha_key" ON "RegistroDiario"("clubId", "atletaId", "fecha");

-- CreateIndex
CREATE INDEX "TestFuerza_atletaId_ejercicioId_fechaTest_idx" ON "TestFuerza"("atletaId", "ejercicioId", "fechaTest");

-- CreateIndex
CREATE INDEX "Torneo_clubId_inicio_idx" ON "Torneo"("clubId", "inicio");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_nombre_key" ON "Disciplina"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "PruebaTorneo_torneoId_disciplinaId_key" ON "PruebaTorneo"("torneoId", "disciplinaId");

-- CreateIndex
CREATE UNIQUE INDEX "Inscripcion_torneoId_usuarioId_key" ON "Inscripcion"("torneoId", "usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "InscripcionPrueba_inscripcionId_pruebaTorneoId_key" ON "InscripcionPrueba"("inscripcionId", "pruebaTorneoId");

-- CreateIndex
CREATE INDEX "ExportacionInscriptos_torneoId_generadaEn_idx" ON "ExportacionInscriptos"("torneoId", "generadaEn");

-- CreateIndex
CREATE UNIQUE INDEX "SeriePista_pruebaTorneoId_categoriaId_sexoCompetencia_numer_key" ON "SeriePista"("pruebaTorneoId", "categoriaId", "sexoCompetencia", "numeroSerie", "exportacionId");

-- CreateIndex
CREATE INDEX "AsignacionSerie_inscripcionPruebaId_idx" ON "AsignacionSerie"("inscripcionPruebaId");

-- CreateIndex
CREATE UNIQUE INDEX "AsignacionSerie_serieId_inscripcionPruebaId_key" ON "AsignacionSerie"("serieId", "inscripcionPruebaId");

-- CreateIndex
CREATE INDEX "MarcaDeportivaActual_atletaId_disciplinaId_tipoMarca_idx" ON "MarcaDeportivaActual"("atletaId", "disciplinaId", "tipoMarca");

-- CreateIndex
CREATE UNIQUE INDEX "ArchivoAdjunto_claveAlmacenamiento_key" ON "ArchivoAdjunto"("claveAlmacenamiento");

-- CreateIndex
CREATE UNIQUE INDEX "Pago_referenciaExterna_key" ON "Pago"("referenciaExterna");

-- CreateIndex
CREATE UNIQUE INDEX "SuscripcionPush_endpoint_key" ON "SuscripcionPush"("endpoint");

-- CreateIndex
CREATE INDEX "TareaProgramada_estado_ejecutarEn_idx" ON "TareaProgramada"("estado", "ejecutarEn");

-- CreateIndex
CREATE INDEX "EventoAuditoria_entidad_entidadId_creadoEn_idx" ON "EventoAuditoria"("entidad", "entidadId", "creadoEn");

-- CreateIndex
CREATE INDEX "TorneoFederativo_clubId_fechaInicio_idx" ON "TorneoFederativo"("clubId", "fechaInicio");

-- CreateIndex
CREATE UNIQUE INDEX "InteresFederativo_torneoFederativoId_usuarioId_key" ON "InteresFederativo"("torneoFederativoId", "usuarioId");

-- AddForeignKey
ALTER TABLE "GrupoEntrenamiento" ADD CONSTRAINT "GrupoEntrenamiento_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembresiaClub" ADD CONSTRAINT "MembresiaClub_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembresiaClub" ADD CONSTRAINT "MembresiaClub_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembresiaGrupo" ADD CONSTRAINT "MembresiaGrupo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "GrupoEntrenamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembresiaGrupo" ADD CONSTRAINT "MembresiaGrupo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfilAtleta" ADD CONSTRAINT "PerfilAtleta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfilEntrenador" ADD CONSTRAINT "PerfilEntrenador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionEntrenador" ADD CONSTRAINT "AsignacionEntrenador_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionEntrenador" ADD CONSTRAINT "AsignacionEntrenador_atletaId_fkey" FOREIGN KEY ("atletaId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionEntrenador" ADD CONSTRAINT "AsignacionEntrenador_entrenadorId_fkey" FOREIGN KEY ("entrenadorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoOrganizador" ADD CONSTRAINT "PermisoOrganizador_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoOrganizador" ADD CONSTRAINT "PermisoOrganizador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermisoOrganizador" ADD CONSTRAINT "PermisoOrganizador_otorgadoPorId_fkey" FOREIGN KEY ("otorgadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CuentaCobroClub" ADD CONSTRAINT "CuentaCobroClub_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuentePlanilla" ADD CONSTRAINT "FuentePlanilla_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuentePlanilla" ADD CONSTRAINT "FuentePlanilla_entrenadorPrincipalId_fkey" FOREIGN KEY ("entrenadorPrincipalId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSemanal" ADD CONSTRAINT "PlanSemanal_fuentePlanillaId_fkey" FOREIGN KEY ("fuentePlanillaId") REFERENCES "FuentePlanilla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSemanal" ADD CONSTRAINT "PlanSemanal_entrenadorPrincipalId_fkey" FOREIGN KEY ("entrenadorPrincipalId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionPlan" ADD CONSTRAINT "VersionPlan_planSemanalId_fkey" FOREIGN KEY ("planSemanalId") REFERENCES "PlanSemanal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionPlan" ADD CONSTRAINT "VersionPlan_sincronizadoPorId_fkey" FOREIGN KEY ("sincronizadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaPlanificado" ADD CONSTRAINT "DiaPlanificado_versionPlanId_fkey" FOREIGN KEY ("versionPlanId") REFERENCES "VersionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroDiario" ADD CONSTRAINT "RegistroDiario_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroDiario" ADD CONSTRAINT "RegistroDiario_atletaId_fkey" FOREIGN KEY ("atletaId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroDiario" ADD CONSTRAINT "RegistroDiario_motivoFaltaId_fkey" FOREIGN KEY ("motivoFaltaId") REFERENCES "MotivoFalta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestFuerza" ADD CONSTRAINT "TestFuerza_atletaId_fkey" FOREIGN KEY ("atletaId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestFuerza" ADD CONSTRAINT "TestFuerza_ejercicioId_fkey" FOREIGN KEY ("ejercicioId") REFERENCES "Ejercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Torneo" ADD CONSTRAINT "Torneo_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Torneo" ADD CONSTRAINT "Torneo_organizadorId_fkey" FOREIGN KEY ("organizadorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PruebaTorneo" ADD CONSTRAINT "PruebaTorneo_torneoId_fkey" FOREIGN KEY ("torneoId") REFERENCES "Torneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PruebaTorneo" ADD CONSTRAINT "PruebaTorneo_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaHabilitadaPrueba" ADD CONSTRAINT "CategoriaHabilitadaPrueba_pruebaTorneoId_fkey" FOREIGN KEY ("pruebaTorneoId") REFERENCES "PruebaTorneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaHabilitadaPrueba" ADD CONSTRAINT "CategoriaHabilitadaPrueba_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_torneoId_fkey" FOREIGN KEY ("torneoId") REFERENCES "Torneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscripcionPrueba" ADD CONSTRAINT "InscripcionPrueba_inscripcionId_fkey" FOREIGN KEY ("inscripcionId") REFERENCES "Inscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscripcionPrueba" ADD CONSTRAINT "InscripcionPrueba_pruebaTorneoId_fkey" FOREIGN KEY ("pruebaTorneoId") REFERENCES "PruebaTorneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExportacionInscriptos" ADD CONSTRAINT "ExportacionInscriptos_torneoId_fkey" FOREIGN KEY ("torneoId") REFERENCES "Torneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExportacionInscriptos" ADD CONSTRAINT "ExportacionInscriptos_archivoId_fkey" FOREIGN KEY ("archivoId") REFERENCES "ArchivoAdjunto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriePista" ADD CONSTRAINT "SeriePista_pruebaTorneoId_fkey" FOREIGN KEY ("pruebaTorneoId") REFERENCES "PruebaTorneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriePista" ADD CONSTRAINT "SeriePista_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriePista" ADD CONSTRAINT "SeriePista_exportacionId_fkey" FOREIGN KEY ("exportacionId") REFERENCES "ExportacionInscriptos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionSerie" ADD CONSTRAINT "AsignacionSerie_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "SeriePista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsignacionSerie" ADD CONSTRAINT "AsignacionSerie_inscripcionPruebaId_fkey" FOREIGN KEY ("inscripcionPruebaId") REFERENCES "InscripcionPrueba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarcaDeportivaActual" ADD CONSTRAINT "MarcaDeportivaActual_atletaId_fkey" FOREIGN KEY ("atletaId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarcaDeportivaActual" ADD CONSTRAINT "MarcaDeportivaActual_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_inscripcionId_fkey" FOREIGN KEY ("inscripcionId") REFERENCES "Inscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComprobantePago" ADD CONSTRAINT "ComprobantePago_pagoId_fkey" FOREIGN KEY ("pagoId") REFERENCES "Pago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComprobantePago" ADD CONSTRAINT "ComprobantePago_archivoId_fkey" FOREIGN KEY ("archivoId") REFERENCES "ArchivoAdjunto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComprobantePago" ADD CONSTRAINT "ComprobantePago_revisadoPorId_fkey" FOREIGN KEY ("revisadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_pagoOrigenId_fkey" FOREIGN KEY ("pagoOrigenId") REFERENCES "Pago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoCredito" ADD CONSTRAINT "MovimientoCredito_creditoId_fkey" FOREIGN KEY ("creditoId") REFERENCES "Credito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoCredito" ADD CONSTRAINT "MovimientoCredito_inscripcionDestinoId_fkey" FOREIGN KEY ("inscripcionDestinoId") REFERENCES "Inscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoCredito" ADD CONSTRAINT "MovimientoCredito_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReintegroRegistrado" ADD CONSTRAINT "ReintegroRegistrado_pagoId_fkey" FOREIGN KEY ("pagoId") REFERENCES "Pago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReintegroRegistrado" ADD CONSTRAINT "ReintegroRegistrado_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoMedico" ADD CONSTRAINT "DocumentoMedico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoMedico" ADD CONSTRAINT "DocumentoMedico_archivoId_fkey" FOREIGN KEY ("archivoId") REFERENCES "ArchivoAdjunto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CronogramaTorneo" ADD CONSTRAINT "CronogramaTorneo_torneoId_fkey" FOREIGN KEY ("torneoId") REFERENCES "Torneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CronogramaTorneo" ADD CONSTRAINT "CronogramaTorneo_archivoPdfId_fkey" FOREIGN KEY ("archivoPdfId") REFERENCES "ArchivoAdjunto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuscripcionPush" ADD CONSTRAINT "SuscripcionPush_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TareaProgramada" ADD CONSTRAINT "TareaProgramada_torneoId_fkey" FOREIGN KEY ("torneoId") REFERENCES "Torneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoAuditoria" ADD CONSTRAINT "EventoAuditoria_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TorneoFederativo" ADD CONSTRAINT "TorneoFederativo_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteresFederativo" ADD CONSTRAINT "InteresFederativo_torneoFederativoId_fkey" FOREIGN KEY ("torneoFederativoId") REFERENCES "TorneoFederativo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteresFederativo" ADD CONSTRAINT "InteresFederativo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
