import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CoachDemoPage } from '../pages/CoachDemoPage';
export function App() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/demo/entrenador" element={<CoachDemoPage />} />
    <Route path="*" element={<main style={{ padding: 40 }}>Página no encontrada. <a href="/">Volver</a></main>} />
  </Routes>;
}
