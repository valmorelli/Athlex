import { Link } from 'react-router-dom';
import { CoachDashboardPreview } from '../components/dashboard/CoachDashboardPreview';
export function CoachDemoPage() {
  return <main className="ax-app"><div className="ax-container">
    <header className="ax-topbar"><div className="ax-brand"><span className="ax-brand-mark">A</span><span>ATHLEX</span></div><span className="ax-demo-label">DEMO DEL FRONTEND</span></header>
    <Link className="ax-back" to="/">← Volver al atleta</Link>
    <CoachDashboardPreview />
  </div></main>;
}
