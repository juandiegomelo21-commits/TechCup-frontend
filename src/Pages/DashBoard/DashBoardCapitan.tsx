import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import Badge from '../../Components/ui/Bagde';
import { Invitation, Player } from '../../Types';

// ─── Estilos y Iconos Base ────────────────────────────────────────────────────

// Estilos de tabla originales (Mantenidos de tu código base)
const thStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '11px',
  color: 'rgba(255,255,255,0.6)',
  fontWeight: 'normal',
  padding: '6px 8px',
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '12px',
  color: 'rgba(255,255,255,0.85)',
  padding: '8px',
  textAlign: 'left',
};

// Icono de Escudo de Jugadores Inscritos (Réplica de imagen)
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" stroke="#FFBF00" strokeWidth="1.8"/>
  </svg>
);

// Icono de Subida de Archivo (Réplica de imagen modal)
const UploadIconRounded = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color: '#888' }}>
    <circle cx="12" cy="12" r="10" fill="#f0f0f5" />
    <path d="M12 7V15M12 7L9 10M12 7L15 10M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Componente Principal ──────────────────────────────────────────────────────
const DashboardCapitan = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [escudo, setEscudo] = useState<File | null>(null);

  // Datos Mock (Originales de tu imagen y código base)
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

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', overflow: 'hidden' }}>

        {/* ─── Fila Superior: Resumen y Perfil (Mantenido EXACTO como imagen) ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px' }}>

          {/* Resumen del Equipo */}
          <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ backgroundColor: '#FFBF00', padding: '8px 16px', fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '13px', color: '#000', display: 'inline-block', borderRadius: '0 0 8px 0' }}>
              Resumen del Equipo
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #FFBF00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldIcon />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Jugadores Inscritos</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '16px', color: '#FFBF00' }}>{currentPlayers} / {maxPlayers}</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', height: '6px' }}>
                    <div style={{ width: `${(currentPlayers / maxPlayers) * 100}%`, backgroundColor: '#FFBF00', borderRadius: '4px', height: '6px' }} />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', display: 'block' }}>
                    {maxPlayers - currentPlayers} espacios disponibles
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ backgroundColor: '#FFBF00', color: '#000', padding: '4px 14px', borderRadius: '12px', fontSize: '12px', fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold' }}>
                  Capitán
                </span>

                {/* BOTÓN AGREGADO (Estilo ovalado amarillo integrado) */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{ backgroundColor: '#FFBF00', color: '#000', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', border: 'none', cursor: 'pointer', textTransform: 'uppercase', transition: 'opacity 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  ¿No tienes un equipo? Créalo aquí
                </button>
              </div>
            </div>
          </div>

          {/* Perfil + Estadísticas (Mantenido EXACTO como imagen) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px', overflow: 'hidden', flex: 1 }}>
              <button onClick={() => navigate('/perfil')} style={{ backgroundColor: '#FFBF00', border: 'none', width: '100%', padding: '8px 16px', fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '13px', color: '#000', cursor: 'pointer' }}>Perfil</button>
              <div style={{ padding: '8px', display: 'flex', justifyContent: 'center' }}>
                <svg width="60" height="70" viewBox="0 0 100 110" fill="none"><circle cx="50" cy="35" r="28" fill="#888"/><ellipse cx="50" cy="95" rx="40" ry="22" fill="#888"/></svg>
              </div>
            </div>
            <button onClick={() => navigate('/estadisticas')} style={{ backgroundColor: '#FFBF00', border: 'none', width: '100%', padding: '10px 16px', borderRadius: '8px', fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '13px', color: '#000', cursor: 'pointer' }}>Tus Estadísticas</button>
          </div>
        </div>

        {/* ─── Fila Inferior: Tablas (Mantenido EXACTO como imagen) ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1, minHeight: 0, overflow: 'hidden' }}>

          {/* Buscar Jugadores */}
          <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#FFBF00', padding: '8px 16px', fontWeight: 'bold', fontSize: '13px', color: '#000', fontFamily: "'Montserrat', sans-serif" }}>Buscar Jugadores Disponibles</div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', position: 'sticky', top: 0, backgroundColor: 'rgba(10,30,20,0.95)' }}>
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
                      <td style={{ ...tdStyle, textAlign: 'center' }}><button style={{ backgroundColor: '#FFBF00', border: 'none', borderRadius: '6px', padding: '4px 10px', fontWeight: 'bold', fontSize: '11px', color: '#000', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}>Invitar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invitaciones Enviadas */}
          <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#FFBF00', padding: '8px 16px', fontWeight: 'bold', fontSize: '13px', color: '#000', fontFamily: "'Montserrat', sans-serif" }}>Invitaciones Enviadas</div>
            <div style={{ overflowY: 'auto', flex: 1, padding: '8px' }}>
              {mockInvitations.map((inv, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '13px', margin: 0, fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>{inv.name}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0 0', fontFamily: "'Inter', sans-serif" }}>{inv.date}</p>
                  </div>
                  <Badge status={inv.status} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ─── MODAL: NUEVO EQUIPO (Réplica Compacta y Visible) ─── */}
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, backdropFilter: 'blur(5px)', padding: '20px' }}>

            {/* Contenedor Modal Compacto (420px de ancho para asegurar visibilidad) */}
            <div style={{ background: '#f8f9fa', borderRadius: '20px', width: '420px', padding: '25px', color: '#333', position: 'relative', fontFamily: "'Montserrat', sans-serif", boxShadow: '0 15px 30px rgba(0,0,0,0.3)', border: '1px solid #ddd' }}>

              {/* Botón X de Cierre perfectamente visible */}
              <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', fontSize: '22px', cursor: 'pointer', color: '#666', zIndex: 10 }}>✕</button>

              <div style={{ background: '#FFBF00', padding: '12px', borderRadius: '12px', textAlign: 'center', fontWeight: 800, marginBottom: '20px', color: '#000', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                NUEVO EQUIPO
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                {/* Nombre */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#555', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>NOMBRE DEL EQUIPO</label>
                  <input type="text" placeholder="Ej. Los Ingenieros FC" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ccc', marginTop: '0', fontFamily: 'Montserrat', fontSize: '13px' }} />
                </div>

                {/* Escudo y Colores Compactos */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '15px', alignItems: 'end' }}>
                    <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#555', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>ESCUDO DEL EQUIPO</label>
                        <div style={{ border: '2px dashed #bbb', borderRadius: '12px', padding: '12px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fff', transition: 'border-color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.borderColor = '#FFBF00')} onMouseOut={(e) => (e.currentTarget.style.borderColor = '#bbb')}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}><UploadIconRounded /></div>
                            <p style={{ fontSize: '10px', color: '#888', margin: '6px 0 0' }}>Subir Imagen PNG/JPG</p>
                        </div>
                    </div>

                    {/* Colores Compactos con etiquetas */}
                    <div style={{ textAlign: 'center' }}>
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#555', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>COLORES</label>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <input type="color" defaultValue="#FFBF00" style={{ border: '2px solid #ddd', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', padding: '0', display: 'block' }} />
                                <p style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: '#666' }}>LOCAL</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <input type="color" defaultValue="#000000" style={{ border: '2px solid #ddd', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', padding: '0', display: 'block' }} />
                                <p style={{ fontSize: '9px', fontWeight: 600, marginTop: '3px', color: '#666' }}>VISITA</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reglas Compactas */}
                <div style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '12px', border: '1px solid #e1e7ee' }}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 800, color: '#333' }}>REGLAS DE INSCRIPCIÓN:</h4>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#444', lineHeight: '1.6' }}>
                        <li>Mínimo 7 / Máximo 12 jugadores.</li>
                        <li>Más del 50% deben pertenecer a <b>Sistemas, IA, Ciberseguridad o Estadística</b>.</li>
                        <li>Se validará pertenencia a la comunidad (Estudiantes, Egresados, Administrativos).</li>
                    </ul>
                </div>

                {/* Nota y Botón Final */}
                <div style={{ borderTop: '1px solid #eee', pt: '10px', marginTop: '5px' }}>
                  <p style={{ fontSize: '11px', color: '#000', fontWeight: 500, textAlign: 'center', margin: '10px 0 12px' }}>
                    Nota: Los jugadores los agregas después en el Mercado de Jugadores.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    style={{ backgroundColor: '#FFBF00', color: '#000', padding: '15px', borderRadius: '20px', fontSize: '12px', fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', border: 'none', cursor: 'pointer', textTransform: 'uppercase', width: '100%', boxShadow: '0 4px 10px rgba(255, 191, 0, 0.3)' }}
                  >
                    CONFIRMAR Y CREAR EQUIPO
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default DashboardCapitan;