
const API_URL =
  import.meta.env.VITE_API_URL ??
  "http://localhost:3000";

export type UsuarioAutenticado = {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  tipoParticipante: "INSTITUCIONAL" | "EXTERNO";
};

type RespuestaLogin = {
  mensaje: string;
  usuario: UsuarioAutenticado;
};

type RespuestaUsuario = {
  usuario: UsuarioAutenticado;
};

export async function iniciarSesion(
  email: string,
  password: string
): Promise<RespuestaLogin> {
  const response = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const datos = await response.json();

  if (!response.ok) {
    throw new Error(
      datos.mensaje ?? "No se pudo iniciar sesión"
    );
  }

  return datos as RespuestaLogin;
}

export async function obtenerSesion():
  Promise<UsuarioAutenticado | null> {
  const response = await fetch(
    `${API_URL}/api/auth/me`,
    {
      credentials: "include",
    }
  );

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "No se pudo consultar la sesión"
    );
  }

  const datos =
    (await response.json()) as RespuestaUsuario;

  return datos.usuario;
}

export async function cerrarSesion(): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("No se pudo cerrar sesión");
  }
}
