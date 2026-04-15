import { useNavigate } from 'react-router-dom';
import Button from '../Components/ui/Button';
import logo from '../assets/Logo.png';
import logoEscuela from '../assets/LogoEscuela.png';
import backgroundVideo from '../assets/backgroundVideo.mp4';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* Video de fondo */}
      <video
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        src={backgroundVideo}
        autoPlay
        loop
        playsInline
        muted
      />

      {/* Capa oscura */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 30, 15, 0.65)',
      }} />

      {/* Logo escuela arriba derecha */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 10,
      }}>
        <img
          src={logoEscuela}
          alt="Escuela Colombiana"
          style={{
            width: 'clamp(80px, 12vw, 140px)',
          }}
        />
      </div>

      {/* Contenido central */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(16px, 4vw, 32px)',
        textAlign: 'center',
        padding: '0 clamp(16px, 5vw, 48px)',
        width: '100%',
        maxWidth: '800px',
      }}>

        <img
          src={logo}
          alt="TechUp Fútbol"
          style={{
            width: 'clamp(180px, 35vw, 320px)',
          }}
        />

        <p style={{
          color: '#FFFFFF',
          fontSize: 'clamp(18px, 4vw, 32px)',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 'bold',
          lineHeight: '1.4',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        }}>
          Tu torneo en <br /> una sola plataforma
        </p>

        <Button label="Ingresar" onClick={() => navigate('/login')} />
      </div>
    </div>
  );
};

export default WelcomePage;