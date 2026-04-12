import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import cristiano from '../assets/Cristiano.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');
    let valid = true;

    if (!email) {
      setEmailError('El correo electrónico es requerido.');
      valid = false;
    } else if (!email.includes('@')) {
      setEmailError('Correo electrónico no válido.');
      valid = false;
    }

    if (!password) {
      setPasswordError('La contraseña es requerida.');
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard'); // te lleva al dashboard
    }, 1500);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>

      {/* Fondo verde */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#00674F',
        zIndex: 0,
      }} />

      {/* Cristiano detrás de toda la pantalla */}
      <img
        src={cristiano}
        alt="Jugador"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
          opacity: 0.25,
          zIndex: 1,
        }}
      />

      {/* Capa oscura */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 50, 30, 0.4)',
        zIndex: 2,
      }} />

      {/* Volver */}
      <div
        onClick={() => navigate('/')}
        style={{
          alignSelf: 'flex-start',
          color: '#FFFFFF',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          position: 'relative',
          zIndex: 10,
          marginBottom: '8px',
        }}
      >
        ← Volver
      </div>

      <img
        src={logo}
        alt="TechUp Fútbol"
        style={{
          width: 'clamp(100px, 18vw, 150px)',
          marginBottom: '8px',
          position: 'relative',
          zIndex: 10,
          alignSelf: 'center',
        }}
      />

      {/* Card */}
      <div style={{
        backgroundColor: 'rgba(220, 235, 225, 0.92)',
        borderRadius: '16px',
        padding: 'clamp(24px, 4vw, 36px)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* Icono azul dos personas SVG */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#e8f0fe',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="7" r="3.5" stroke="#4A90D9" strokeWidth="1.8"/>
            <path d="M2 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#4A90D9" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="17" cy="7" r="2.5" stroke="#4A90D9" strokeWidth="1.5"/>
            <path d="M21 20c0-2.761-1.791-5-4-5" stroke="#4A90D9" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        <h2 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 'bold',
          fontSize: 'clamp(20px, 3vw, 24px)',
          color: '#1a1a1a',
          margin: 0,
        }}>
          Iniciar Sesión
        </h2>

        {/* Campo email */}
        <div style={{ width: '100%' }}>
          <label style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#4A4A4A',
            marginBottom: '6px',
            display: 'block',
          }}>
            Correo Electrónico
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: `1px solid ${emailError ? '#ff4444' : '#ccc'}`,
            borderRadius: '8px',
            padding: '10px 14px',
            gap: '8px',
          }}>
            {/* Icono email SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="#888" strokeWidth="1.8"/>
              <path d="M2 8l10 6 10-6" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              type="email"
              placeholder="usuario@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                backgroundColor: 'transparent',
              }}
            />
          </div>
          {emailError && (
            <p style={{
              color: '#cc0000',
              fontSize: '12px',
              fontFamily: "'Inter', sans-serif",
              margin: '4px 0 0 4px',
            }}>
              {emailError}
            </p>
          )}
        </div>

        {/* Campo contraseña */}
        <div style={{ width: '100%' }}>
          <label style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#4A4A4A',
            marginBottom: '6px',
            display: 'block',
          }}>
            Contraseña
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: `1px solid ${passwordError ? '#ff4444' : '#ccc'}`,
            borderRadius: '8px',
            padding: '10px 14px',
            gap: '8px',
          }}>
            {/* Icono candado SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="#888" strokeWidth="1.8"/>
              <path d="M8 11V7a4 4 0 018 0v4" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                backgroundColor: 'transparent',
              }}
            />
            {/* Ojo SVG sin emoji */}
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#888" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="1.8"/>
                </svg>
              )}
            </div>
          </div>
          {passwordError && (
            <p style={{
              color: '#cc0000',
              fontSize: '12px',
              fontFamily: "'Inter', sans-serif",
              margin: '4px 0 0 4px',
            }}>
              {passwordError}
            </p>
          )}
        </div>

        {/* Google */}
        <div style={{ width: '100%' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#4A4A4A',
            marginBottom: '8px',
            textAlign: 'center',
          }}>
            Otros métodos de ingreso
          </p>
          <button
            onClick={() => {}}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#4A4A4A',
            }}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              style={{ width: '18px', height: '18px' }}
            />
            Ingresar con Google
          </button>
        </div>

        {/* Links */}
        <div style={{ textAlign: 'center' }}>
          <p
            onClick={() => navigate('/register')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#00674F',
              cursor: 'pointer',
              margin: '4px 0',
            }}
          >
            ¿No tienes cuenta? <strong>Regístrate aquí</strong>
          </p>
          <p
            onClick={() => navigate('/forgot-password')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#00674F',
              cursor: 'pointer',
              margin: '4px 0',
            }}
          >
            ¿Olvidaste tu contraseña?
          </p>
        </div>

        {/* Botón */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: loading ? '#cca800' : '#FFBF00',
            color: '#000000',
            border: 'none',
            borderRadius: '25px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>

      </div>
    </div>
  );
};

export default LoginPage;