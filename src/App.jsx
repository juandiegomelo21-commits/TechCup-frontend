import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardJugador from './Pages/DashBoard/DashboardJugador';
import AccountCreatedPage from './Pages/AccountCreatedPage';
import EmailSentPage from './Pages/EmailSentPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import PlayerProfilePage from './Pages/PlayerProfilePage'

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
