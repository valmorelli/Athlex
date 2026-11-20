
import {
  mkdir,
  writeFile,
  unlink,
} from "node:fs/promises";

import { randomUUID } from "node:crypto";
import { resolve, join } from "node:path";

const DIRECTORIO = resolve(
  process.cwd(),
  "private_uploads",
  "apto_medico"
);

type ArchivoValidado = {
  contenido: Buffer;
  mimeType: string;
  extension: string;
};

export function validarAptoMedico(
  archivo: Express.Multer.File
): ArchivoValidado {
  const datos = archivo.buffer;

  const esPDF =
    datos.length >= 5 &&
    datos.subarray(0, 5).toString("ascii") === "%PDF-";

  const esJPG =
    datos.length >= 3 &&
    datos[0] === 0xff &&
    datos[1] === 0xd8 &&
    datos[2] === 0xff;

  const firmaPNG = Buffer.from([
    137, 80, 78, 71, 13, 10, 26, 10,
  ]);

  const esPNG =
    datos.length >= 8 &&
    datos.subarray(0, 8).equals(firmaPNG);

  if (esPDF && archivo.mimetype === "application/pdf") {
    return {
      contenido: datos,
      mimeType: "application/pdf",
      extension: ".pdf",
    };
  }

  if (
    esJPG &&
    archivo.mimetype === "image/jpeg"
  ) {
    return {
      contenido: datos,
      mimeType: "image/jpeg",
      extension: ".jpg",
    };
  }

  if (esPNG && archivo.mimetype === "image/png") {
    return {
      contenido: datos,
      mimeType: "image/png",
      extension: ".png",
    };
  }

  throw new Error("TIPO_ARCHIVO_INVALIDO");
}

export async function guardarAptoMedico(
  archivo: ArchivoValidado
) {
  await mkdir(DIRECTORIO, { recursive: true });

  const nombre = `${randomUUID()}${archivo.extension}`;
  const rutaAbsoluta = join(DIRECTORIO, nombre);

  await writeFile(
    rutaAbsoluta,
    archivo.contenido,
    { flag: "wx", mode: 0o600 }
  );

  return {
    rutaAbsoluta,
    claveAlmacenamiento: `apto_medico/${nombre}`,
    mimeType: archivo.mimeType,
    tamanoBytes: archivo.contenido.length,
  };
}

export async function eliminarArchivo(
  rutaAbsoluta: string
) {
  await unlink(rutaAbsoluta);
}
