import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardArbitro from './Pages/DashBoard/DashboardArbitro';
import DashboardOrganizador from './Pages/DashBoard/DashboardOrganizador';
import DashboardJugador from './Pages/DashBoard/DashboardJugador';
import DashboardCapitan from './Pages/DashBoard/DashboardCapitan';
import AccountCreatedPage from './Pages/AccountCreatedPage';
import EmailSentPage from './Pages/EmailSentPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import PlayerProfilePage from './Pages/PlayerProfilePage';
import PlayerSearchPage from './Pages/PlayerSearchPage';
import MiEquipo from './Pages/MiEquipo';
import PizarraTactica from './Pages/PizarraTactica';
import OAuthCallbackPage from './Pages/OAuthCallbackPage';
import CreateTournamentPage from './Pages/CreateTournamentPage';
import RefereeProfilePage from './Pages/RefreeProfilePage.tsx'
import AdminProfilePage from './Pages/AdminProfilePage'
import Torneo from './Pages/Torneos';
import Pagos from './Pages/Pagos';
import Historial from './Pages/Historial';
import Reglas from './Pages/Reglas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account-created" element={<AccountCreatedPage />} />
        <Route path="/email-sent" element={<EmailSentPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardJugador />} />
        <Route path="/dashboard/capitan" element={<DashboardCapitan />} />
        <Route path="/dashboard/org" element={<DashboardOrganizador />} />
        <Route path="/dashboard/arbitro" element={<DashboardArbitro />} />
        <Route path="/player-profile" element={<PlayerProfilePage />} />
        <Route path="/referee-profile" element={<RefereeProfilePage />} />
        <Route path="/admin-profile" element={<AdminProfilePage />} />
        <Route path="/mercado" element={<PlayerSearchPage />} />
        <Route path="/torneo" element={<Torneo />} />
        <Route path="/torneo/crear" element={<CreateTournamentPage />} />
        <Route path="/torneo/reglas" element={<Reglas />} />
        <Route path="/equipo" element={<MiEquipo />} />
        <Route path="/equipo/pizarra" element={<PizarraTactica />} />
        <Route path="/oauth2/callback" element={<OAuthCallbackPage />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

