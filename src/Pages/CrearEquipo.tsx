import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { createTeamApi } from '../api/teamService';

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  backgroundColor: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '10px',
  color: '#fff',
  fontFamily: "'Inter', sans-serif",
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '12px',
  color: 'rgba(255,255,255,0.6)',
  marginBottom: '6px',
  display: 'block',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const DEFAULT_COLORS = ['#e74c3c', '#27ae60', '#2980b9', '#8e44ad', '#e67e22', '#1abc9c', '#f39c12', '#ffffff'];

const CrearEquipo = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [shieldUrl, setShieldUrl] = useState('');
  const [selectedColor, setSelectedColor] = useState('#27ae60');
  const [extraColor, setExtraColor] = useState('#ffffff');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!teamName.trim()) {
      setError('El nombre del equipo es obligatorio.');
      return;
    }

    const captainId = localStorage.getItem('userId') ?? '';
    if (!captainId) {
      setError('No se pudo identificar al capitán. Inicia sesión nuevamente.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await createTeamApi({
        teamName: teamName.trim(),
        shieldUrl: shieldUrl.trim() || 'https://via.placeholder.com/100',
        uniformColors: [selectedColor, extraColor],
        captainId,
        playerIds: [captainId],
      });
      navigate('/equipo');
    } catch (err: any) {
      const msg = err?.response?.data?.message
        ?? err?.response?.data?.teamName
        ?? 'Error al crear el equipo. Inténtalo de nuevo.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        height: '100%', paddingTop: '20px',
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.13)',
          borderRadius: '20px',
          padding: '32px 36px',
          width: '100%',
          maxWidth: '480px',
        }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              backgroundColor: 'rgba(255,191,0,0.15)',
              border: '2px solid rgba(255,191,0,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" stroke="#FFBF00" strokeWidth="1.8"/>
                <path d="M12 8v4M10 10h4" stroke="#FFBF00" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 style={{
                margin: 0, fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800, fontSize: '20px', color: '#fff',
              }}>
                Crear Equipo
              </h2>
              <p style={{
                margin: 0, fontFamily: "'Inter', sans-serif",
                fontSize: '12px', color: 'rgba(255,255,255,0.5)',
              }}>
                Completa los datos de tu equipo
              </p>
            </div>
          </div>

          {/* Nombre */}
          <div style={{ marginBottom: '20px' }}>
            <label style={LABEL_STYLE}>Nombre del equipo *</label>
            <input
              type="text"
              placeholder="Ej: Los Tigres FC"
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
              maxLength={40}
              style={INPUT_STYLE}
            />
          </div>

          {/* Escudo URL */}
          <div style={{ marginBottom: '20px' }}>
            <label style={LABEL_STYLE}>URL del escudo <span style={{ color: 'rgba(255,255,255,0.35)' }}>(opcional)</span></label>
            <input
              type="text"
              placeholder="https://..."
              value={shieldUrl}
              onChange={e => setShieldUrl(e.target.value)}
              style={INPUT_STYLE}
            />
          </div>

          {/* Colores */}
          <div style={{ marginBottom: '28px' }}>
            <label style={LABEL_STYLE}>Colores del uniforme *</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
              {DEFAULT_COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{
                    width: '32px', height: '32px',
                    borderRadius: '50%',
                    backgroundColor: c,
                    border: selectedColor === c ? '3px solid #FFBF00' : '2px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    flexShrink: 0,
                    boxShadow: selectedColor === c ? '0 0 8px rgba(255,191,0,0.5)' : 'none',
                    transition: 'all 0.15s',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                flex: 1,
              }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: selectedColor, border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Color principal</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <input
                  type="color"
                  value={extraColor}
                  onChange={e => setExtraColor(e.target.value)}
                  style={{ width: '28px', height: '28px', border: 'none', borderRadius: '50%', cursor: 'pointer', padding: 0, backgroundColor: 'transparent' }}
                />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Color secundario</span>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(255,60,60,0.15)',
              border: '1px solid rgba(255,60,60,0.3)',
              borderRadius: '8px',
              padding: '10px 14px',
              marginBottom: '20px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#ff6b6b',
            }}>
              {error}
            </div>
          )}

          {/* Botones */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigate('/equipo')}
              style={{
                flex: 1, padding: '12px 0',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '25px', fontSize: '14px',
                cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)',
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                flex: 1, padding: '12px 0',
                border: 'none', borderRadius: '25px',
                fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
                background: loading ? 'rgba(255,191,0,0.5)' : '#FFBF00',
                color: '#000',
                transition: 'opacity 0.2s',
              }}
            >
              {loading ? 'Creando...' : 'Crear Equipo'}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CrearEquipo;
