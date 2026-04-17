import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { getRefereeByIdApi, RefereeResponse } from '../api/refereeService';

const IconUser = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(100,70,0,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const IconId = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M13 10h5M13 14h3" />
  </svg>
);

const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 8l10 6 10-6" />
  </svg>
);

const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

const IconEdit = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const RefereeProfilePage = () => {
  const navigate = useNavigate();
  const [referee, setReferee] = useState<RefereeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) { navigate('/login'); return; }

    getRefereeByIdApi(userId)
      .then(data => setReferee(data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
          Cargando perfil...
        </div>
      </DashboardLayout>
    );
  }

  if (!referee) return null;

  const partidos = referee.assignedMatches?.length ?? 0;

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '480px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', overflow: 'hidden' }}>

          {/* Header amarillo */}
          <div style={{ backgroundColor: '#F5C518', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconUser />
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0', fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>
                  {referee.fullname}
                </p>
                <span style={{ backgroundColor: '#4FC3F7', color: '#0D47A1', borderRadius: '20px', padding: '2px 10px', fontSize: '10px', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  Árbitro
                </span>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontFamily: "'Inter', sans-serif", cursor: 'pointer', color: '#1a1a1a', fontWeight: 500 }}>
              <IconEdit /> Editar Perfil
            </button>
          </div>

          {/* Cuerpo */}
          <div style={{ padding: '16px 18px' }}>

            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555' }}>
              Información Personal
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>NOMBRE COMPLETO</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>{referee.fullname}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>ID</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <IconId /> {referee.id}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMAIL</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                <IconMail /> {referee.email}
              </p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#eee', margin: '0 0 14px 0' }} />

            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555' }}>
              Credenciales de Árbitro
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>PARTIDOS ASIGNADOS</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <IconId /> {partidos}
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>PRÓXIMO PARTIDO</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <IconClock /> {partidos > 0 ? new Date(referee.assignedMatches[0].dateTime).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }) : 'Sin asignar'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, padding: '10px 8px', backgroundColor: '#4CAF50', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#fff' }}>Activo</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>Estado</span>
              </div>
              <div style={{ flex: 1, padding: '10px 8px', backgroundColor: '#F5C518', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#1a1a1a' }}>{partidos}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#555' }}>Partidos Arbitrados</span>
              </div>
              <div style={{ flex: 1, padding: '10px 8px', backgroundColor: '#4FC3F7', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#0D47A1' }}>Certificado</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#0D47A1' }}>Licencia</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RefereeProfilePage;
