import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardArbitro from './Pages/DashBoard/DashBoardArbitro';
import DashboardOrganizador from './Pages/DashBoard/DashBoardOrganizador';
import DashboardJugador from './Pages/DashBoard/DashBoardJugador';
import DashboardCapitan from './Pages/DashBoard/DashBoardCapitan';
import AccountCreatedPage from './Pages/AccountCreatedPage';
import EmailSentPage from './Pages/EmailSentPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import PlayerProfilePage from './Pages/PlayerProfilePage';
import PlayerSearchPage from './Pages/PlayerSearchPage';
import CreateTournamentPage from './Pages/CreateTournamentPage';
import MiEquipo from './Pages/MiEquipo';
import PizarraTactica from './Pages/PizarraTactica';
import OAuthCallbackPage from './Pages/OAuthCallbackPage';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account-created" element={<AccountCreatedPage />} />
        <Route path="/email-sent" element={<EmailSentPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/oauth2/callback" element={<OAuthCallbackPage />} />

        {/* Jugador */}
        <Route path="/dashboard" element={
          <ProtectedRoute roles={['jugador', 'capitan']}>
            <DashboardJugador />
          </ProtectedRoute>
        } />
        <Route path="/player-profile" element={
          <ProtectedRoute roles={['jugador', 'capitan']}>
            <PlayerProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/player-search" element={
          <ProtectedRoute roles={['jugador', 'capitan']}>
            <PlayerSearchPage />
          </ProtectedRoute>
        } />

        {/* Capitán */}
        <Route path="/dashboard/capitan" element={
          <ProtectedRoute roles={['capitan']}>
            <DashboardCapitan />
          </ProtectedRoute>
        } />
        <Route path="/equipo" element={
          <ProtectedRoute roles={['capitan']}>
            <MiEquipo />
          </ProtectedRoute>
        } />
        <Route path="/equipo/pizarra" element={
          <ProtectedRoute roles={['capitan']}>
            <PizarraTactica />
          </ProtectedRoute>
        } />

        {/* Árbitro */}
        <Route path="/dashboard/arbitro" element={
          <ProtectedRoute roles={['arbitro']}>
            <DashboardArbitro />
          </ProtectedRoute>
        } />

        {/* Organizador */}
        <Route path="/dashboard/org" element={
          <ProtectedRoute roles={['organizador']}>
            <DashboardOrganizador />
          </ProtectedRoute>
        } />
        <Route path="/create-tournament" element={
          <ProtectedRoute roles={['organizador']}>
            <CreateTournamentPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
