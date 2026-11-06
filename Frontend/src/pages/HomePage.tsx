import { AppShell } from "../components/layout/AppShell";
import { BottomNav } from "../components/ui/BottomNav";

export function HomePage() {
  return (
    <>
      <AppShell>
        <div style={{ marginBottom: "24px" }}>
          <p className="page-subtitle" style={{ marginBottom: "8px" }}>
            Bienvenida a
          </p>
          <h1 className="page-title">Athlex</h1>
          <p className="page-subtitle">
            Plataforma de entrenamiento y torneos de atletismo
          </p>
        </div>

        <section className="kpi-card" style={{ marginBottom: "18px" }}>
          <div className="kpi-label">Entrenamiento de hoy</div>
          <div className="kpi-value">Martes</div>
          <p style={{ marginTop: "10px", marginBottom: 0 }}>
            Velocidad + coordinación + trabajo específico por especialidad.
          </p>
        </section>

        <section className="glass-card" style={{ marginBottom: "18px" }}>
          <div className="section-title">Accesos rápidos</div>
          <div className="quick-grid">
            <div className="quick-item">
              <strong>Mi semana</strong>
              <span>Ver planificación completa</span>
            </div>
            <div className="quick-item">
              <strong>Registrar día</strong>
              <span>Cargar asistencia y sensaciones</span>
            </div>
            <div className="quick-item">
              <strong>Torneos</strong>
              <span>Inscripciones y cronogramas</span>
            </div>
            <div className="quick-item">
              <strong>Mi perfil</strong>
              <span>Datos deportivos y apto médico</span>
            </div>
          </div>
        </section>

        <section className="glass-card" style={{ marginBottom: "18px" }}>
          <div className="section-title">Próximo paso</div>
          <div className="card-list">
            <div
              style={{
                padding: "14px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              Completar entrenamiento de hoy antes de las 19:00 hs.
            </div>
          </div>
        </section>

        <button className="primary-btn" style={{ marginBottom: "12px" }}>
          Registrar entrenamiento
        </button>

        <button className="secondary-btn">Ver planificación semanal</button>
      </AppShell>

      <BottomNav />
    </>
  );
}