import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage }              from "./pages/auth/Login";
import { LandingPage }            from "./pages/Landing";
import { RegisterPage }           from "./pages/auth/Register";
import { RecuperarPasswordPage }  from "./pages/auth/RecuperarPassword";
import { DashboardAdmin }         from "./pages/admin/DashboardAdmin";
import { DashboardOrganizador }   from "./pages/organizador/DashboardOrganizador";
import { DashboardArbitro }       from "./pages/arbitro/DashboardArbitro";
import { DashboardCapitan }       from "./pages/capitan/DashboardCapitan";
import { PerfilArbitro }          from "./pages/arbitro/PerfilArbitro";
import { PerfilJugador }          from "./pages/jugador/PerfilJugador";
import { MiEquipo }               from "./pages/capitan/MiEquipo";
import { MercadoJugadores }       from "./pages/capitan/MercadoJugadores";
import { DashboardJugador }       from "./pages/jugador/DashboardJugador";
import "./styles/global.css";

function ComingSoon({ page }: { page: string }) {
  return (
    <div style={{ padding: "2rem", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-heading)" }}>
      <h2>🚧 {page}</h2>
      <p style={{ marginTop: "0.5rem", opacity: 0.6 }}>Esta página está en construcción.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LandingPage />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/recuperar" element={<RecuperarPasswordPage />} />
        <Route path="/registro"  element={<RegisterPage />} />

        {/* Admin */}
        <Route path="/admin/torneos"     element={<DashboardAdmin />} />
        <Route path="/admin/dashboard"   element={<DashboardAdmin />} />
        <Route path="/admin/pagos"       element={<ComingSoon page="Pagos" />} />
        <Route path="/admin/usuarios"    element={<ComingSoon page="Usuarios y Equipos" />} />
        <Route path="/admin/reglamentos" element={<ComingSoon page="Reglamentos" />} />
        <Route path="/admin/historial"   element={<ComingSoon page="Historial de Torneos" />} />

        {/* Organizador */}
        <Route path="/organizador/dashboard" element={<DashboardOrganizador />} />
        <Route path="/organizador/equipo"    element={<ComingSoon page="Mi Equipo" />} />
        <Route path="/organizador/pagos"     element={<ComingSoon page="Pagos" />} />
        <Route path="/organizador/mercado"   element={<ComingSoon page="Mercado" />} />
        <Route path="/organizador/historial" element={<ComingSoon page="Historial" />} />

        {/* Árbitro */}
        <Route path="/arbitro/dashboard" element={<DashboardArbitro />} />
        <Route path="/arbitro/perfil"    element={<PerfilArbitro />} />
        <Route path="/arbitro/equipo"    element={<ComingSoon page="Mi Equipo" />} />
        <Route path="/arbitro/pagos"     element={<ComingSoon page="Pagos" />} />
        <Route path="/arbitro/mercado"   element={<ComingSoon page="Mercado" />} />
        <Route path="/arbitro/historial" element={<ComingSoon page="Historial" />} />

        {/* Capitán */}
        <Route path="/capitan/dashboard" element={<DashboardCapitan />} />
        <Route path="/capitan/equipo"    element={<MiEquipo />} />
        <Route path="/capitan/pagos"     element={<ComingSoon page="Pagos" />} />
        <Route path="/capitan/mercado"   element={<MercadoJugadores />} />
        <Route path="/capitan/historial" element={<ComingSoon page="Historial" />} />

        {/* Jugador */}
        <Route path="/jugador/dashboard" element={<DashboardJugador />} />
        <Route path="/jugador/perfil"    element={<PerfilJugador />} />
        <Route path="/jugador/equipo"    element={<ComingSoon page="Mi Equipo" />} />
        <Route path="/jugador/pagos"     element={<ComingSoon page="Pagos" />} />
        <Route path="/jugador/mercado"   element={<ComingSoon page="Mercado" />} />
        <Route path="/jugador/historial" element={<ComingSoon page="Historial" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
