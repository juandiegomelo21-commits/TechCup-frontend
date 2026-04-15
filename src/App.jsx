import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardArbitro from './Pages/DashBoard/DashboardArbitro';
import DashboardOrganizador from './Pages/DashBoard/DashboardOrganizador';
import DashboardJugador from './Pages/DashBoard/DashboardJugador';
import MiEquipo from './Pages/MiEquipo';
import PizarraTactica from './Pages/PizarraTactica';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardJugador />} />
        <Route path="/dashboard/org" element={<DashboardOrganizador />} />
        <Route path="/dashboard/arbitro" element={<DashboardArbitro />} />
        <Route path="/equipo" element={<MiEquipo />} />
        <Route path="/equipo/pizarra" element={<PizarraTactica />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

