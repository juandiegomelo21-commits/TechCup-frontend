import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { getTournamentsApi, TournamentResponse } from '../api/tournamentService';
import { getStandingsApi, TeamStanding } from '../api/standingsService';
import apiClient from '../api/axiosInstance';

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

const phaseLabel: Record<string, string> = {
  INITIAL_ROUND: 'OCTAVOS',
  QUARTER_FINALS: 'CUARTOS',
  SEMI_FINALS: 'SEMIFINAL',
  FINAL: 'FINAL',
};

interface BracketMatch {
  matchId: string;
  localTeamName: string;
  visitorTeamName: string;
  scoreLocal: number | null;
  scoreVisitor: number | null;
  winnerName: string | null;
  status: string;
}

interface Phase {
  phase: string;
  matches: BracketMatch[];
}

const MatchCard = ({ match }: { match?: BracketMatch }) => (
  <div style={{ marginBottom: '6px' }}>
    {[match?.localTeamName, match?.visitorTeamName].map((name, i) => (
      <div key={i} style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '8px 12px',
        width: '200px',
        marginBottom: i === 0 ? '4px' : '0',
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: name ? '#FFBF00' : 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
        <span style={{ ...TEXT_BASE, color: name ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name ?? 'TBC'}
        </span>
      </div>
    ))}
  </div>
);

const Torneo = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<TournamentResponse[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [loadingStandings, setLoadingStandings] = useState(false);
  const [loadingBracket, setLoadingBracket] = useState(false);

  useEffect(() => {
    getTournamentsApi()
      .then(data => {
        setTournaments(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => setTournaments([]));
  }, []);

  useEffect(() => {
    if (!selectedId) { setStandings([]); setPhases([]); return; }

    setLoadingStandings(true);
    getStandingsApi(selectedId)
      .then(data => setStandings(data.standings ?? []))
      .catch(() => setStandings([]))
      .finally(() => setLoadingStandings(false));

    setLoadingBracket(true);
    apiClient.get(`/api/brackets/tournament/${selectedId}`)
      .then(res => setPhases(res.data.phases ?? []))
      .catch(() => setPhases([]))
      .finally(() => setLoadingBracket(false));
  }, [selectedId]);

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%', fontFamily: "'Montserrat', sans-serif" }}>

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

        {/* Contenido principal */}
        <div style={{
          background: 'rgba(0,0,0,0.25)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '28px',
          display: 'flex',
          gap: '15px',
          alignItems: 'flex-start',
          flex: 1,
          overflowX: 'auto',
          backdropFilter: 'blur(4px)',
        }}>

          {/* Bracket */}
          {loadingBracket ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ ...TEXT_BASE, opacity: 0.5, fontSize: '13px' }}>Cargando bracket...</p>
            </div>
          ) : phases.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Sin bracket generado — mostrar estructura vacía */}
              {['INITIAL_ROUND', 'QUARTER_FINALS', 'SEMI_FINALS', 'FINAL'].map((ph, pi) => (
                <div key={ph} style={{ display: 'inline-block' }}>
                  <h4 style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '12px', fontWeight: 700, textAlign: 'center', marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {phaseLabel[ph]}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {Array.from({ length: Math.max(1, 4 / (2 ** pi)) }).map((_, i) => (
                      <MatchCard key={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
              {phases.map((phase) => (
                <div key={phase.phase}>
                  <h4 style={{ ...TEXT_BASE, color: '#FFBF00', fontSize: '12px', fontWeight: 700, textAlign: 'center', marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {phaseLabel[phase.phase] ?? phase.phase}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {phase.matches.map(m => (
                      <MatchCard key={m.matchId} match={m} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tabla de Posiciones */}
          <div style={{ marginLeft: 'auto', minWidth: '240px', flexShrink: 0 }}>
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
        {(() => {
          const rol = localStorage.getItem('rol');
          return (
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', paddingBottom: '10px' }}>
              {rol === 'organizador' && (
                <button
                  onClick={() => navigate('/torneo/crear')}
                  style={OVAL_BUTTON_STYLE}
                  onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
                  onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                >
                  Crear Torneo
                </button>
              )}
              {rol === 'capitan' && (
                <button
                  onClick={() => navigate('/pagos')}
                  style={OVAL_BUTTON_STYLE}
                  onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
                  onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                >
                  Inscribirse al Torneo
                </button>
              )}
              <button
                onClick={() => navigate('/historial')}
                style={OVAL_BUTTON_STYLE}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
              >
                Ver Historial
              </button>
            </div>
          );
        })()}
      </div>
    </DashboardLayout>
  );
};

export default Torneo;
