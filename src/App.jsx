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
import MiEquipo from './Pages/MiEquipo';
import PizarraTactica from './Pages/PizarraTactica';
import OAuthCallbackPage from './Pages/OAuthCallbackPage';
import CreateTournamentPage from './Pages/CreateTournamentPage';
import TournamentDetailPage from './Pages/TournamentDetailPage';
import RefereeProfilePage from './Pages/RefereeProfilePage';
import AdminProfilePage from './Pages/AdminProfilePage';
import Torneo from './Pages/Torneos';
import Pagos from './Pages/Pagos';
import Historial from './Pages/Historial';
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
        <Route path="/mercado" element={
          <ProtectedRoute roles={['jugador', 'capitan']}>
            <PlayerSearchPage />
          </ProtectedRoute>
        } />

        <Route path="/historial" element={
          <ProtectedRoute roles={['jugador', 'capitan']}>
            <Historial />
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
        <Route path="/referee-profile" element={
          <ProtectedRoute roles={['arbitro']}>
            <RefereeProfilePage />
          </ProtectedRoute>
        } />

        {/* Organizador */}
        <Route path="/dashboard/org" element={
          <ProtectedRoute roles={['organizador']}>
            <DashboardOrganizador />
          </ProtectedRoute>
        } />
        <Route path="/torneo/crear" element={
          <ProtectedRoute roles={['organizador']}>
            <CreateTournamentPage />
          </ProtectedRoute>
        } />
        <Route path="/torneo/:id" element={
          <ProtectedRoute roles={['organizador']}>
            <TournamentDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/torneo" element={
          <ProtectedRoute roles={['organizador']}>
            <Torneo />
          </ProtectedRoute>
        } />
        <Route path="/pagos" element={
          <ProtectedRoute roles={['capitan']}>
            <Pagos />
          </ProtectedRoute>
        } />

        {/* Admin */}
        <Route path="/admin-profile" element={
          <ProtectedRoute roles={['admin']}>
            <AdminProfilePage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
