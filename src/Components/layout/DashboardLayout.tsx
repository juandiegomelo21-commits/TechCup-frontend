import campoFutbol from '../../assets/campoFutbol.png';
import Sidebar from './SideBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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

      {/* Imagen campo — más arriba y más clara */}
      <img
        src={campoFutbol}
        alt="Campo"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          opacity: 0.5,
          zIndex: 1,
        }}
      />

      {/* Capa oscura más suave */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,40,20,0.25)', zIndex: 2 }} />

      {/* Contenido */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: '16px',
        gap: '16px',
      }}>
        <Sidebar />
        <div style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;