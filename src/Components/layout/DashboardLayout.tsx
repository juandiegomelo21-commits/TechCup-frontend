import { useState, useEffect } from 'react';
import campoFutbol from '../../assets/campoFutbol.png';
import Sidebar from './SideBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Cierra el sidebar si se pasa a desktop
  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
    }}>
      {/* Fondo verde */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#00674F', zIndex: 0 }} />

      {/* Imagen campo */}
      <img
        src={campoFutbol}
        alt="Campo"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          opacity: 0.5,
          zIndex: 1,
        }}
      />

      {/* Capa oscura */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,40,20,0.25)', zIndex: 2 }} />

      {/* Overlay mobile — cierra el drawer al tocar fuera */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 20,
          }}
        />
      )}

      {/* Botón hamburguesa — solo mobile */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 40,
            backgroundColor: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '8px 10px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#fff', borderRadius: '2px' }} />
          <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#fff', borderRadius: '2px' }} />
          <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#fff', borderRadius: '2px' }} />
        </button>
      )}

      {/* Sidebar — drawer en mobile, fija en desktop */}
      <div style={{
        position: isMobile ? 'absolute' : 'relative',
        top: 0,
        left: isMobile ? (sidebarOpen ? 0 : '-220px') : 'auto',
        height: '100%',
        zIndex: 30,
        transition: isMobile ? 'left 0.25s ease' : 'none',
      }}>
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          height: '100%',
          padding: isMobile ? '16px 8px' : '16px 0 16px 16px',
        }}>
          <Sidebar onClose={() => setSidebarOpen(false)} isMobile={isMobile} />
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        overflow: 'auto',
        padding: isMobile ? '64px 12px 12px' : '16px 16px 16px 0',
      }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;