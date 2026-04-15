import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import Badge from '../../Components/ui/Bagde';
import { Invitation, Player } from '../../Types';

const mockPlayers: Player[] = [
  { id: '1', name: 'Carlos Mendoza', position: 'Delantero', age: 24 },
  { id: '2', name: 'Ana Rodríguez', position: 'Defensa', age: 22 },
  { id: '3', name: 'Luis García', position: 'Mediocampista', age: 26 },
  { id: '4', name: 'María López', position: 'Portera', age: 23 },
  { id: '5', name: 'Jorge Martínez', position: 'Delantero', age: 25 },
  { id: '6', name: 'Sofía Torres', position: 'Mediocampista', age: 21 },
];

const mockInvitations: Invitation[] = [
  { name: 'Pedro Sánchez', date: '2026-04-05', status: 'Aceptada' },
  { name: 'Laura Díaz', date: '2026-04-04', status: 'Pendiente' },
  { name: 'Miguel Ruiz', date: '2026-04-03', status: 'Aceptada' },
  { name: 'Carmen Vega', date: '2026-04-02', status: 'Rechazada' },
  { name: 'Roberto Castro', date: '2026-04-01', status: 'Pendiente' },
  { name: 'Isabel Moreno', date: '2026-03-31', status: 'Aceptada' },
];

const currentPlayers = 12;
const maxPlayers = 20;

const thStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '11px',
  color: 'rgba(255,255,255,0.6)',
  fontWeight: 'normal',
  padding: '6px 8px',
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '12px',
  color: 'rgba(255,255,255,0.85)',
  padding: '8px',
  textAlign: 'left',
};

const DashboardCapitan = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
        overflow: 'hidden',
      }}>

        {/* Fila superior */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px' }}>

          {/* Resumen del Equipo */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.25)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <div style={{
              backgroundColor: '#FFBF00',
              padding: '8px 16px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#000',
              display: 'inline-block',
              borderRadius: '0 0 8px 0',
            }}>
              Resumen del Equipo
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

              {/* Jugadores inscritos */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Icono escudo */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid #FFBF00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" stroke="#FFBF00" strokeWidth="1.8"/>
                  </svg>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                      Jugadores Inscritos
                    </span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '16px', color: '#FFBF00' }}>
                      {currentPlayers} / {maxPlayers}
                    </span>
                  </div>
                  {/* Barra progreso */}
                  <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', height: '6px' }}>
                    <div style={{
                      width: `${(currentPlayers / maxPlayers) * 100}%`,
                      backgroundColor: '#FFBF00',
                      borderRadius: '4px',
                      height: '6px',
                    }} />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', display: 'block' }}>
                    {maxPlayers - currentPlayers} espacios disponibles
                  </span>
                </div>
              </div>

              {/* Badge Capitán */}
              <div>
                <span style={{
                  backgroundColor: '#FFBF00',
                  color: '#000',
                  padding: '4px 14px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 'bold',
                }}>
                  Capitán
                </span>
              </div>
            </div>
          </div>

          {/* Perfil + Estadísticas */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: '150px',
          }}>
            {/* Perfil */}
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.25)',
              borderRadius: '12px',
              overflow: 'hidden',
              flex: 1,
            }}>
              <button
                onClick={() => navigate('/perfil')}
                style={{
                  backgroundColor: '#FFBF00',
                  border: 'none',
                  width: '100%',
                  padding: '8px 16px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 'bold',
                  fontSize: '13px',
                  color: '#000',
                  cursor: 'pointer',
                }}
              >
                Perfil
              </button>
              <div style={{ padding: '8px', display: 'flex', justifyContent: 'center' }}>
                <svg width="60" height="70" viewBox="0 0 100 110" fill="none">
                  <circle cx="50" cy="35" r="28" fill="#888"/>
                  <ellipse cx="50" cy="95" rx="40" ry="22" fill="#888"/>
                </svg>
              </div>
            </div>

            {/* Tus Estadísticas */}
            <button
              onClick={() => navigate('/estadisticas')}
              style={{
                backgroundColor: '#FFBF00',
                border: 'none',
                width: '100%',
                padding: '10px 16px',
                borderRadius: '8px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 'bold',
                fontSize: '13px',
                color: '#000',
                cursor: 'pointer',
              }}
            >
              Tus Estadísticas
            </button>
          </div>
        </div>

        {/* Fila inferior */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}>

          {/* Buscar Jugadores */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.25)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              backgroundColor: '#FFBF00',
              padding: '8px 16px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#000',
            }}>
              Buscar Jugadores Disponibles
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', position: 'sticky', top: 0, backgroundColor: 'rgba(0,40,20,0.95)' }}>
                    <th style={thStyle}>Nombre</th>
                    <th style={thStyle}>Posición</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Edad</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPlayers.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <td style={tdStyle}>{p.name}</td>
                      <td style={tdStyle}>{p.position}</td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>{p.age}</td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <button style={{
                          backgroundColor: '#FFBF00',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 12px',
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 'bold',
                          fontSize: '11px',
                          color: '#000',
                          cursor: 'pointer',
                        }}>
                          Invitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invitaciones Enviadas */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.25)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              backgroundColor: '#FFBF00',
              padding: '8px 16px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 'bold',
              fontSize: '13px',
              color: '#000',
            }}>
              Invitaciones Enviadas
            </div>

            <div style={{ overflowY: 'auto', flex: 1, padding: '8px' }}>
              {mockInvitations.map((inv, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 10px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '13px', color: '#fff', margin: 0 }}>
                      {inv.name}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0 0' }}>
                      {inv.date}
                    </p>
                  </div>
                  <Badge status={inv.status} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardCapitan;