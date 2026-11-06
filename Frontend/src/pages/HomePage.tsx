import { Link } from 'react-router-dom';
import { planDemo } from '../data/demoTraining';
import { WeeklyPlan } from '../components/training/WeeklyPlan';
import { DailyTrainingForm } from '../components/training/DailyTrainingForm';

export function HomePage() {
  return <main className="ax-app">
    <div className="ax-container">
      <header className="ax-topbar"><div className="ax-brand"><span className="ax-brand-mark">A</span><span>ATHLEX</span></div><span className="ax-demo-label">DEMO DEL FRONTEND</span></header>
      <section className="ax-hero"><p>Tu espacio de entrenamiento</p><h1>Planificá. Entrená. Evolucioná.</h1><span>Vista preliminar del atleta · Especialidad: Vallistas</span></section>
      <WeeklyPlan plan={planDemo} especialidad="Vallistas" />
      <div className="ax-below"><DailyTrainingForm /></div>
      <div className="ax-demo-link"><Link to="/demo/entrenador">Ver vista previa del entrenador →</Link></div>
    </div>
  </main>;
}
