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

const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 8l10 6 10-6" />
  </svg>
);

const IconCalendar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
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
          </div>

          {/* Cuerpo */}
          <div style={{ padding: '16px 18px' }}>

            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555' }}>
              Información Personal
            </p>

            <div style={{ marginBottom: '10px' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>NOMBRE COMPLETO</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>{referee.fullname}</p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMAIL</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                <IconMail /> {referee.email}
              </p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#eee', margin: '0 0 14px 0' }} />

            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555' }}>
              Agenda de Partidos
            </p>

            {partidos === 0 ? (
              <p style={{ fontSize: '12px', color: '#999', fontFamily: "'Inter', sans-serif", marginBottom: '16px' }}>
                Sin partidos asignados aún.
              </p>
            ) : (
              <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {referee.assignedMatches.slice(0, 3).map(m => (
                  <div key={m.matchId} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
                    <IconCalendar />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#333', fontFamily: "'Inter', sans-serif" }}>
                        {m.localTeamName} vs {m.visitorTeamName}
                      </p>
                      <p style={{ margin: 0, fontSize: '10px', color: '#888', fontFamily: "'Inter', sans-serif" }}>
                        {m.field} · {new Date(m.dateTime).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, padding: '10px 8px', backgroundColor: '#4CAF50', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#fff' }}>Activo</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>Estado</span>
              </div>
              <div style={{ flex: 1, padding: '10px 8px', backgroundColor: '#F5C518', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#1a1a1a' }}>{partidos}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#555' }}>Partidos Asignados</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RefereeProfilePage;
