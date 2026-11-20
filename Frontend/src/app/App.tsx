
import {
  Route,
  Routes,
} from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { CoachDemoPage } from "../pages/CoachDemoPage";

import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/demo/entrenador"
        element={<CoachDemoPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/mi-cuenta"
        element={<MyAccountPage />}
      />

      <Route
        path="*"
        element={<main>Página no encontrada</main>}
      />
    </Routes>
  );
}
