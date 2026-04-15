import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import campoFutbol from '../assets/campoFutbol.png';

const AccountCreatedPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px, 2vh, 20px)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#00674F',
          zIndex: 0,
        }}
      />

      <img
        src={campoFutbol}
        alt="Jugador"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.22,
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 60, 35, 0.35)',
          zIndex: 2,
        }}
      />

      <img
        src={logo}
        alt="TechUp Fútbol"
        style={{
          width: 'clamp(90px, 14vh, 140px)',
          position: 'relative',
          zIndex: 10,
          marginBottom: 'clamp(14px, 2vh, 22px)',
        }}
      />

      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          padding: '18px 22px 16px',
          width: 'min(320px, 88vw)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <p
          style={{
            margin: '0 0 10px 0',
            fontSize: '14px',
            color: '#333',
            fontFamily: "'Inter', sans-serif",
            textAlign: 'center',
          }}
        >
          tu cuenta ha sido creada correctamente
        </p>

        <div
          style={{
            width: '86px',
            height: '86px',
            borderRadius: '50%',
            backgroundColor: '#4CAF50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 0 8px rgba(255,255,255,0.18)',
          }}
        >
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <button
        onClick={() => navigate('/login')}
        style={{
          marginTop: '10px',
          position: 'relative',
          zIndex: 10,
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
        }}
      >
        entrar
      </button>
    </div>
  );
};

export default AccountCreatedPage;