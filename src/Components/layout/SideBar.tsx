import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo.png';

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const PanelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const EquipoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M2 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M21 20c0-2.761-1.791-5-4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TorneoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 2h12v6a6 6 0 01-12 0V2z" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M6 4H3a3 3 0 003 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M18 4h3a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M12 14v4m-4 2h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const PagosIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="7" cy="15" r="1.5" fill="currentColor"/>
  </svg>
);

const HistorialIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const FaqIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M9.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.5-1.5 2-2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="0.8" fill="currentColor"/>
  </svg>
);

const AprenderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L2 8l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M2 8v6c0 3 4.5 5 10 5s10-2 10-5V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const CerrarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const CloseDrawerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const staticItems: SidebarItem[] = [
  { label: 'Mi Equipo',  path: '/equipo',    icon: <EquipoIcon /> },
  { label: 'Torneo',     path: '/torneo',    icon: <TorneoIcon /> },
  { label: 'Pagos',      path: '/pagos',     icon: <PagosIcon /> },
  { label: 'Historial',  path: '/historial', icon: <HistorialIcon /> },
];

const bottomItems: SidebarItem[] = [
  { label: 'Preguntas Frecuentes', path: '/faq',     icon: <FaqIcon /> },
  { label: 'Aprender',             path: '/aprender', icon: <AprenderIcon /> },
  { label: 'Cerrar Sesión',        path: '/',         icon: <CerrarIcon /> },
];

const getDashboardPath = () => {
  const rol = localStorage.getItem('rol');
  if (rol === 'capitan')      return '/dashboard/capitan';
  if (rol === 'organizador')  return '/dashboard/org';
  if (rol === 'arbitro')      return '/dashboard/arbitro';
  return '/dashboard';
};

const Sidebar = ({ onClose, isMobile }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainItems: SidebarItem[] = [
    { label: 'Panel Principal', path: '/dashboard', icon: <PanelIcon /> },
    ...staticItems,
  ];

  const handleNav = (path: string) => {
    const resolvedPath = path === '/dashboard' ? getDashboardPath() : path;
    navigate(resolvedPath);
    if (isMobile && onClose) onClose();
  };

  const isActive = (path: string) =>
    path === '/dashboard'
      ? location.pathname === getDashboardPath()
      : location.pathname === path;

  const itemStyle = (path: string): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    color: isActive(path) ? '#FFBF00' : '#ffffff',
    backgroundColor: isActive(path) ? 'rgba(255,191,0,0.15)' : 'transparent',
    transition: 'all 0.2s',
    fontWeight: isActive(path) ? 'bold' : 'normal',
  });

  return (
    <div style={{
      width: '180px',
      minWidth: '180px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 8px',
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: '12px',
    }}>
      {/* Botón cerrar drawer — solo mobile */}
      {isMobile && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4px' }}>
          <div
            onClick={onClose}
            style={{
              color: '#fff',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CloseDrawerIcon />
          </div>
        </div>
      )}

      <img
        src={logo}
        alt="TechUp"
        style={{ width: '110px', alignSelf: 'center', marginBottom: '24px', marginTop: isMobile ? '0' : '8px' }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        {mainItems.map((item) => (
          <div key={item.path} style={itemStyle(item.path)} onClick={() => handleNav(item.path)}>
            <span style={{ color: isActive(item.path) ? '#FFBF00' : '#ffffff', display: 'flex' }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        {bottomItems.map((item) => (
          <div key={item.path} style={itemStyle(item.path)} onClick={() => handleNav(item.path)}>
            <span style={{ color: location.pathname === item.path ? '#FFBF00' : '#ffffff', display: 'flex' }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
