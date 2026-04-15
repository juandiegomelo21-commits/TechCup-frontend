import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    const rol = params.get('rol')?.toLowerCase() ?? '';
    const userId = params.get('userId') ?? '';

    if (!token || !email || !rol) {
      navigate('/login');
      return;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('rol', rol);
    localStorage.setItem('userId', userId);

    switch (rol) {
      case 'organizador': navigate('/dashboard/org'); break;
      case 'arbitro': navigate('/dashboard/arbitro'); break;
      case 'capitan': navigate('/dashboard/capitan'); break;
      default: navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00674F',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      fontSize: '16px',
    }}>
      Iniciando sesión con Google...
    </div>
  );
};

export default OAuthCallbackPage;
