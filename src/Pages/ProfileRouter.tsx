import { Navigate } from 'react-router-dom';

const ProfileRouter = () => {
  const rol = localStorage.getItem('rol');

  switch (rol) {
    case 'arbitro':
      return <Navigate to="/referee-profile" replace />;
    case 'organizador':
    case 'admin':
      return <Navigate to="/admin-profile" replace />;
    case 'jugador':
    case 'capitan':
    default:
      return <Navigate to="/player-profile" replace />;
  }
};

export default ProfileRouter;
