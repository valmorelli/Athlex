import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<p className="container mt-4">Página no encontrada</p>} />
    </Routes>
  );
}
