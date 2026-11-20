
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  obtenerSesion,
  cerrarSesion,
} from "../services/auth.service";

import type {
  UsuarioAutenticado,
} from "../services/auth.service";

import { AuthBackground } from "../components/ui/AuthBackground";

import "../styles/auth.css";

export function MyAccountPage() {
  const navigate = useNavigate();

  const [usuario, setUsuario] =
    useState<UsuarioAutenticado | null>(null);

  const [cargando, setCargando] = useState(true);
  const [cerrando, setCerrando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function comprobarSesion() {
      try {
        const datos = await obtenerSesion();

        if (!activo) return;

        if (!datos) {
          navigate("/login", { replace: true });
          return;
        }

        setUsuario(datos);
      } catch {
        if (activo) {
          setError(
            "No pudimos verificar tu sesión."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    void comprobarSesion();

    return () => {
      activo = false;
    };
  }, [navigate]);

  async function handleLogout() {
    setError("");
    setCerrando(true);

    try {
      await cerrarSesion();
      navigate("/login", { replace: true });
    } catch {
      setError(
        "No se pudo cerrar la sesión. Intentá nuevamente."
      );
      setCerrando(false);
    }
  }

  return (
    <main className="auth-page auth-page--account">
      <AuthBackground />

      <div className="auth-content">
        <header className="auth-brand">
          <div className="auth-logo">
            <span>A</span>
          </div>

          <h2>ATHLEX</h2>
          <p>ENTRENAMIENTO Y COMPETICIÓN</p>
        </header>

        <section className="auth-main">
          {cargando ? (
            <div className="auth-heading">
              <h1>Verificando sesión...</h1>
              <p>
                Estamos comprobando tus datos.
              </p>
            </div>
          ) : usuario ? (
            <>
              <div className="auth-heading">
                <span className="auth-eyebrow">
                  SESIÓN ACTIVA
                </span>

                <h1>
                  ¡Hola, {usuario.nombre}!
                </h1>

                <div className="auth-title-line" />

                <p>
                  Tu cuenta está conectada
                  correctamente con Athlex.
                </p>
              </div>

              <div className="auth-profile">
                <div className="auth-profile-row">
                  <span>Nombre completo</span>
                  <strong>
                    {usuario.nombre}{" "}
                    {usuario.apellido}
                  </strong>
                </div>

                <div className="auth-profile-row">
                  <span>Correo electrónico</span>
                  <strong>{usuario.email}</strong>
                </div>

                <div className="auth-profile-row">
                  <span>Tipo de participante</span>
                  <strong>
                    {usuario.tipoParticipante ===
                    "INSTITUCIONAL"
                      ? "Institucional"
                      : "Externo"}
                  </strong>
                </div>
              </div>

              <button
                className="auth-submit"
                onClick={() => void handleLogout()}
                disabled={cerrando}
              >
                {cerrando
                  ? "Cerrando sesión..."
                  : "Cerrar sesión"}
              </button>
            </>
          ) : (
            <div className="auth-heading">
              <h1>No se pudo cargar tu cuenta</h1>
              <p>
                No pudimos recuperar tus datos.
              </p>
            </div>
          )}

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}
        </section>

        <footer className="auth-bottom-note">
          ATHLEX · ENTRENAMIENTO Y COMPETICIÓN
        </footer>
      </div>
    </main>
  );
}
