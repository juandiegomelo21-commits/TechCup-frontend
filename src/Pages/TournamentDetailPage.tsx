import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { getTournamentByIdApi, type TournamentResponse } from '../api/tournamentService';
import { getStandingsApi, type StandingsResponse } from '../api/standingsService';

const estadoColor: Record<string, string> = {
  DRAFT:       '#888',
  ACTIVE:      '#2ecc71',
  IN_PROGRESS: '#f39c12',
  COMPLETED:   '#e74c3c',
  DELETED:     '#555',
};

const estadoLabel: Record<string, string> = {
  DRAFT:       'Borrador',
  ACTIVE:      'Activo',
  IN_PROGRESS: 'En Curso',
  COMPLETED:   'Finalizado',
  DELETED:     'Eliminado',
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' });

const fmtCurrency = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const TEAM_COLORS = ['#e74c3c','#27ae60','#e67e22','#8e44ad','#2980b9','#16a085','#c0392b','#1abc9c'];

const TournamentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [torneo, setTorneo] = useState<TournamentResponse | null>(null);
  const [standings, setStandings] = useState<StandingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getTournamentByIdApi(id),
      getStandingsApi(id).catch(() => null),
    ])
      .then(([t, s]) => {
        setTorneo(t);
        setStandings(s);
      })
      .catch(() => setError('No se pudo cargar la información del torneo.'))
      .finally(() => setLoading(false));
  }, [id]);

  const card: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.13)',
    padding: '20px 24px',
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
          Cargando torneo...
        </p>
      </DashboardLayout>
    );
  }

  if (error || !torneo) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '60px' }}>
          <p style={{ color: '#e74c3c', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
            {error ?? 'Torneo no encontrado.'}
          </p>
          <button onClick={() => navigate(-1)} style={{ backgroundColor: '#FFBF00', color: '#000', border: 'none', borderRadius: '20px', padding: '8px 24px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
            ← Volver
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const estado = torneo.currentState ?? 'DRAFT';
  const eqInscritos = standings?.standings.length ?? 0;

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', padding: '7px 14px', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>
              ← Volver
            </button>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#ffffff', fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.3px' }}>
              {torneo.name}
            </h1>
            <span style={{ backgroundColor: estadoColor[estado] ?? '#888', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {estadoLabel[estado] ?? estado}
            </span>
          </div>
        </div>

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {[
            { label: 'Fecha de Inicio',  value: fmtDate(torneo.startDate) },
            { label: 'Fecha de Fin',     value: fmtDate(torneo.endDate) },
            { label: 'Cuota de Inscripción', value: fmtCurrency(torneo.registrationFee) },
            { label: 'Equipos',          value: `${eqInscritos} / ${torneo.maxTeams}` },
          ].map((item) => (
            <div key={item.label} style={{ ...card, textAlign: 'center' }}>
              <p style={{ margin: '0 0 6px 0', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                {item.label}
              </p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFBF00', fontFamily: "'Montserrat', sans-serif" }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Reglamento */}
        {torneo.rules && (
          <div style={card}>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
              Reglamento / Reglas
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6' }}>
              {torneo.rules}
            </p>
          </div>
        )}

        {/* Tabla de Posiciones */}
        <div style={{ ...card, flex: 1 }}>
          <p style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}>
            Tabla de Posiciones
          </p>

          {!standings || standings.standings.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: 0, textAlign: 'center', padding: '20px 0' }}>
              Aún no hay equipos inscritos en este torneo.
            </p>
          ) : (
            <>
              {/* Cabecera */}
              <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 50px 50px 50px 50px 55px 55px 55px 60px', padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.1)', gap: '4px' }}>
                {['#', 'Equipo', 'PJ', 'G', 'E', 'P', 'GF', 'GC', 'DG', 'Pts'].map((col) => (
                  <span key={col} style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: col === 'Equipo' ? 'left' : 'center' }}>
                    {col}
                  </span>
                ))}
              </div>

              {/* Filas */}
              {standings.standings.map((s, i) => {
                const initials = s.teamName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                const color = TEAM_COLORS[i % TEAM_COLORS.length];
                return (
                  <div key={s.teamId} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 50px 50px 50px 50px 55px 55px 55px 60px', padding: '10px 10px', alignItems: 'center', gap: '4px', backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent', borderRadius: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: i < 3 ? '#FFBF00' : 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                      {s.position}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: '#fff', flexShrink: 0, fontFamily: "'Montserrat', sans-serif" }}>
                        {initials}
                      </div>
                      <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>{s.teamName}</span>
                    </div>
                    {[s.matchesPlayed, s.matchesWon, s.matchesDrawn, s.matchesLost, s.goalsFor, s.goalsAgainst, s.goalsDifference].map((val, j) => (
                      <span key={j} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                        {val >= 0 && j === 6 ? `+${val}` : val}
                      </span>
                    ))}
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#FFBF00', textAlign: 'center', fontFamily: "'Montserrat', sans-serif" }}>
                      {s.points}
                    </span>
                  </div>
                );
              })}

              {/* Leyenda */}
              <div style={{ display: 'flex', gap: '20px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { label: 'PJ — Partidos Jugados' },
                  { label: 'G — Ganados' },
                  { label: 'E — Empatados' },
                  { label: 'P — Perdidos' },
                  { label: 'GF/GC — Goles' },
                  { label: 'DG — Diferencia' },
                  { label: 'Pts — Puntos' },
                ].map(({ label }) => (
                  <span key={label} style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>{label}</span>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default TournamentDetailPage;
