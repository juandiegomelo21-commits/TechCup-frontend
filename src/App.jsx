import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardArbitro from './Pages/DashBoard/DashboardArbitro';
import DashboardOrganizador from './Pages/DashBoard/DashboardOrganizador';
import DashboardJugador from './Pages/DashBoard/DashboardJugador';
import AccountCreatedPage from './Pages/AccountCreatedPage';
import EmailSentPage from './Pages/EmailSentPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import PlayerProfilePage from './Pages/PlayerProfilePage';
import PlayerSearchPage from './Pages/PlayerSearchPage';
import CreateTournamentPage from './Pages/CreateTournamentPage';
import MiEquipo from './Pages/MiEquipo';
import PizarraTactica from './Pages/PizarraTactica';
import OAuthCallbackPage from './Pages/OAuthCallbackPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardJugador />} />
        <Route path="/account-created" element={<AccountCreatedPage />} />
        <Route path="/email-sent" element={<EmailSentPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/player-profile" element={<PlayerProfilePage />} />
        <Route path="/player-search" element={<PlayerSearchPage />} />
        <Route path="/create-tournament" element={<CreateTournamentPage />} />
        <Route path="/dashboard/org" element={<DashboardOrganizador />} />
        <Route path="/dashboard/arbitro" element={<DashboardArbitro />} />
        <Route path="/equipo" element={<MiEquipo />} />
        <Route path="/equipo/pizarra" element={<PizarraTactica />} />
        <Route path="/oauth2/callback" element={<OAuthCallbackPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;

