import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const rolDashboard: Record<string, string> = {
  organizador: '/dashboard/org',
  arbitro: '/dashboard/arbitro',
  capitan: '/dashboard/capitan',
  jugador: '/dashboard',
};

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol') ?? '';

  if (!token) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(rol)) {
    const redirect = rolDashboard[rol] ?? '/login';
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
