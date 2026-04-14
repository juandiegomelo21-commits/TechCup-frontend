import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import campoFutbol from '../assets/campoFutbol.png';

const EmailSentPage = () => {
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

      <p
        style={{
          position: 'relative',
          zIndex: 10,
          color: '#ffffff',
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          fontWeight: 500,
          marginBottom: 'clamp(10px, 1.5vh, 16px)',
          letterSpacing: '0.02em',
        }}
      >
        Registro de Jugador
      </p>

      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          alignSelf: 'flex-start',
          marginLeft: 'calc((100vw - min(320px, 88vw)) / 2)',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          opacity: 0.9,
        }}
      >
        ‹ Volver
      </button>

      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          padding: '22px 22px 28px',
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
            margin: '0 0 2px 0',
            fontSize: '13px',
            color: '#333',
            fontFamily: "'Inter', sans-serif",
            textAlign: 'center',
          }}
        >
          correo enviado exitosamente.
        </p>
        <p
          style={{
            margin: '0 0 20px 0',
            fontSize: '13px',
            color: '#333',
            fontFamily: "'Inter', sans-serif",
            textAlign: 'center',
          }}
        >
          revisa tu bandeja de entrada.
        </p>

        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="26" width="64" height="42" rx="5" stroke="#2ecc71" strokeWidth="3.5" fill="none" />
          <polyline points="8,26 40,52 72,26" stroke="#2ecc71" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
          <circle cx="56" cy="24" r="14" fill="#ffffff" stroke="#2ecc71" strokeWidth="3" />
          <polyline points="48,24 54,30 65,17" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default EmailSentPage;