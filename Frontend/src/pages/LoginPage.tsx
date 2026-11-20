
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { iniciarSesion } from "../services/auth.service";
import { AuthBackground } from "../components/ui/AuthBackground";

import "../styles/auth.css";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setCargando(true);

    try {
      await iniciarSesion(email, password);
      navigate("/mi-cuenta", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado"
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="auth-page auth-page--login">
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
          <div className="auth-heading">
            <span className="auth-eyebrow">
              BIENVENIDO
            </span>

            <h1>Iniciar sesión</h1>

            <div className="auth-title-line" />

            <p>
              Accedé a tus entrenamientos,
              estadísticas y torneos.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label htmlFor="login-email">
                Correo electrónico
              </label>

              <div className="auth-input-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tuemail@ejemplo.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">
                Contraseña
              </label>

              <div className="auth-input-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2"
                  />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <input
                  id="login-password"
                  type={
                    mostrarPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="current-password"
                  placeholder="Ingresá tu contraseña"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setMostrarPassword((prev) => !prev)
                  }
                  aria-label={
                    mostrarPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                  aria-pressed={mostrarPassword}
                >
                  {mostrarPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 5.1A11 11 0 0 1 12 5c7 0 10 7 10 7a14 14 0 0 1-3 3.8" />
                      <path d="M6.5 6.5C3.6 8.2 2 12 2 12s3 7 10 7c1.7 0 3.2-.4 4.5-1" />
                      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <button
              className="auth-submit"
              type="submit"
              disabled={cargando}
            >
              {cargando
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
            </button>
          </form>

          <p className="auth-footer">
            ¿No tenés cuenta?{" "}
            <span>
              Próximamente: registro de atletas
            </span>
          </p>
        </section>

        <footer className="auth-bottom-note">
          ATHLEX · ENTRENAMIENTO Y COMPETICIÓN
        </footer>
      </div>
    </main>
  );
}
