import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import campoFutbol from '../assets/campoFutbol.png';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');

  const handleSubmit = () => {
    console.log('Enviando correo a:', correo);
  };

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
          padding: '20px 22px 22px',
          width: 'min(320px, 88vw)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <p
          style={{
            margin: '0 0 14px 0',
            fontSize: '13px',
            color: '#333',
            fontFamily: "'Inter', sans-serif",
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Escribe tu correo para enviar enlace de recuperación de la cuenta
        </p>

        <input
          type="email"
          placeholder="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{
            width: '100%',
            padding: '9px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '13px',
            fontFamily: "'Inter', sans-serif",
            color: '#333',
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: '12px',
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontFamily: "'Inter', sans-serif",
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          enviar
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(0,0,0,0.45)',
          borderRadius: '8px',
          padding: '10px 14px',
          width: 'min(320px, 88vw)',
        }}
      >
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
          ℹ Tener en cuenta:
        </p>
        <p style={{ margin: '2px 0', fontSize: '11px', color: '#ddd', fontFamily: "'Inter', sans-serif" }}>
          • Si es miembro de la Escuela, usar correo institucional
        </p>
        <p style={{ margin: '2px 0', fontSize: '11px', color: '#ddd', fontFamily: "'Inter', sans-serif" }}>
          • Si es familiar de algún miembro, usar Gmail
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;