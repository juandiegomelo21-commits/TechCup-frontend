import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { getTournamentsApi, TournamentResponse } from '../api/tournamentService';
import { getStandingsApi, TeamStanding } from '../api/standingsService';

const TEXT_BASE = {
  fontFamily: "'Montserrat', sans-serif",
  color: '#ffffff',
};

const OVAL_BUTTON_STYLE: React.CSSProperties = {
  background: '#FFBF00',
  borderRadius: '24px',
  border: 'none',
  padding: '12px 24px',
  cursor: 'pointer',
  ...TEXT_BASE,
  color: '#1a1a1a',
  fontWeight: 700,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  transition: 'transform 0.1s, opacity 0.2s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const TbcCard = ({ date }: { date?: string }) => (
  <div style={{ marginBottom: '6px' }}>
    <div style={{ ...TEXT_BASE, fontSize: '9px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>{date || 'TBC'}</div>
    {[1, 2].map((_, i) => (
      <div key={i} style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '8px 12px',
        width: '200px',
        marginBottom: i === 0 ? '4px' : '0',
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
        <span style={{ ...TEXT_BASE, color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: 500 }}>TBC</span>
      </div>
    ))}
  </div>
);

const Torneo = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<TournamentResponse[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loadingStandings, setLoadingStandings] = useState(false);

  useEffect(() => {
    getTournamentsApi()
      .then(data => {
        setTournaments(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => setTournaments([]));
  }, []);

  useEffect(() => {
    if (!selectedId) { setStandings([]); return; }
    setLoadingStandings(true);
    getStandingsApi(selectedId)
      .then(data => setStandings(data.standings ?? []))
      .catch(() => setStandings([]))
      .finally(() => setLoadingStandings(false));
  }, [selectedId]);

  return (
    <DashboardLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
        fontFamily: "'Montserrat', sans-serif",
      }}>

        {/* Selector de torneo */}
        {tournaments.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ ...TEXT_BASE, fontSize: '13px', fontWeight: 600 }}>Torneo:</span>
            <select
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px',
                padding: '6px 12px', fontFamily: "'Montserrat', sans-serif", fontSize: '13px',
              }}
            >
              {tournaments.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Árbol de Torneo */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '28px',
          display: 'flex',
          gap: '15px',
          alignItems: 'flex-start',
          flex: 1,
          overflowX: 'auto',
          backdropFilter: 'blur(4px)',
        }}>

          {/* Round of 16 */}
          <div>
            <h4 style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '12px', fontWeight: 700, textAlign: 'center', marginBottom: '24px', letterSpacing: '2px', textTransform: 'uppercase' }}>OCTAVOS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {[0, 1].map(gi => (
                <div key={gi} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <TbcCard />
                  <TbcCard />
                </div>
              ))}
            </div>
          </div>

          {/* Conectores */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', paddingTop: '50px' }}>
            <div style={{ height: '160px', border: '2px solid rgba(255,255,255,0.15)', borderLeft: 0, width: '24px', marginBottom: '90px' }} />
            <div style={{ height: '160px', border: '2px solid rgba(255,255,255,0.15)', borderLeft: 0, width: '24px' }} />
          </div>

          {/* Quarter-Finals */}
          <div style={{ paddingTop: '60px' }}>
            <h4 style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '12px', fontWeight: 700, textAlign: 'center', marginBottom: '24px', letterSpacing: '2px', textTransform: 'uppercase' }}>CUARTOS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
              <TbcCard />
              <TbcCard />
            </div>
          </div>

          {/* Semi-Finals */}
          <div style={{ paddingTop: '160px', marginLeft: '30px' }}>
            <h4 style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '12px', fontWeight: 700, textAlign: 'center', marginBottom: '24px', letterSpacing: '2px', textTransform: 'uppercase' }}>SEMIFINAL</h4>
            <TbcCard />
          </div>

          {/* Tabla de Posiciones */}
          <div style={{ marginLeft: 'auto', minWidth: '240px' }}>
            <div style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '18px',
            }}>
              <h4 style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '14px', fontWeight: 700, textAlign: 'center', marginBottom: '16px', textTransform: 'uppercase' }}>
                {tournaments.find(t => t.id === selectedId)?.name ?? 'Tabla de Posiciones'}
              </h4>

              {loadingStandings ? (
                <p style={{ ...TEXT_BASE, fontSize: '12px', textAlign: 'center', opacity: 0.6 }}>Cargando...</p>
              ) : standings.length === 0 ? (
                <p style={{ ...TEXT_BASE, fontSize: '11px', textAlign: 'center', opacity: 0.5 }}>Sin equipos inscritos aún</p>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 40px', padding: '4px 0', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ ...TEXT_BASE, fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>#</span>
                    <span style={{ ...TEXT_BASE, fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Equipo</span>
                    <span style={{ ...TEXT_BASE, fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', textAlign: 'right' }}>Pts</span>
                  </div>
                  {standings.map((team, i) => (
                    <div key={team.teamId} style={{
                      display: 'grid', gridTemplateColumns: '24px 1fr 40px', alignItems: 'center',
                      padding: '8px 0', borderBottom: i < standings.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none'
                    }}>
                      <span style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '11px', fontWeight: 600 }}>{team.position}</span>
                      <span style={{ ...TEXT_BASE, fontSize: '12px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{team.teamName}</span>
                      <span style={{ ...TEXT_BASE, color: '#FFBF00', fontWeight: 800, fontSize: '12px', textAlign: 'right' }}>{team.points}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', paddingBottom: '10px' }}>
          <button
            onClick={() => navigate('/torneo/crear')}
            style={OVAL_BUTTON_STYLE}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Inscribir Nuevo Torneo
          </button>

          <button
            onClick={() => navigate('/historial')}
            style={OVAL_BUTTON_STYLE}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Ver Historial
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Torneo;
