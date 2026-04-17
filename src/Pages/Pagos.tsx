import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/layout/DashboardLayout';
import { getTournamentsApi } from '../api/tournamentService';
import { getTeamsApi } from '../api/teamService';
import { uploadReceiptApi, getPaymentByTeamApi, PaymentResponse } from '../api/paymentService';

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING:      { label: 'Pendiente',   color: '#aaaaaa' },
  UNDER_REVIEW: { label: 'En Revisión', color: '#FFBF00' },
  APPROVED:     { label: 'Aprobado ✓',  color: '#27ae60' },
  REJECTED:     { label: 'Rechazado ✗', color: '#e74c3c' },
};

const Pagos = () => {
  const [torneos, setTorneos] = useState<{ id: string; name: string }[]>([]);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [teamName, setTeamName] = useState('');
  const [torneoId, setTorneoId] = useState('');
  const [payment, setPayment] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId') ?? '';
    Promise.all([getTournamentsApi(), getTeamsApi()])
      .then(([ts, teams]) => {
        setTorneos(ts);
        const myTeam = teams.find(t => t.captainId === userId);
        if (myTeam) {
          setTeamId(myTeam.id);
          setTeamName(myTeam.teamName);
          return getPaymentByTeamApi(myTeam.id).catch(() => null);
        }
        return null;
      })
      .then(p => { if (p) setPayment(p); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleEnviar = async () => {
    if (!file || !teamId || !torneoId) return;
    setSubmitting(true);
    setError('');
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const p = await uploadReceiptApi(teamId, reader.result as string);
          setPayment(p);
          setSuccess(true);
        } catch (err: any) {
          setError(err?.response?.data?.error ?? 'Error al enviar el comprobante.');
        } finally {
          setSubmitting(false);
        }
      };
    } catch {
      setError('No se pudo leer el archivo.');
      setSubmitting(false);
    }
  };

  const statusInfo = payment ? (STATUS_CONFIG[payment.currentStatus] ?? STATUS_CONFIG.PENDING) : null;

  return (
    <DashboardLayout>
      <div style={{ padding: '24px', fontFamily: "'Montserrat', sans-serif", color: '#fff', maxWidth: '560px' }}>
        <h2 style={{ fontWeight: 800, marginBottom: '24px', fontSize: '20px' }}>Pago de Inscripción</h2>

        {/* Estado actual si ya hay pago */}
        {!loading && payment && (
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            border: `1px solid ${statusInfo!.color}55`,
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif" }}>
                Comprobante enviado
              </p>
              <p style={{ margin: '4px 0 0', fontWeight: 700, fontSize: '14px' }}>{payment.teamName}</p>
            </div>
            <span style={{
              background: `${statusInfo!.color}22`,
              color: statusInfo!.color,
              border: `1px solid ${statusInfo!.color}55`,
              borderRadius: '20px',
              padding: '6px 16px',
              fontSize: '12px',
              fontWeight: 700,
            }}>
              {statusInfo!.label}
            </span>
          </div>
        )}

        {/* Advertencia sin equipo */}
        {!loading && !teamId && (
          <div style={{
            background: 'rgba(255,191,0,0.1)',
            border: '1px solid rgba(255,191,0,0.3)',
            borderRadius: '12px',
            padding: '14px 18px',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.75)',
            fontFamily: "'Inter', sans-serif",
          }}>
            ⚠️ Necesitas crear un equipo antes de registrar un pago.
          </div>
        )}

        {/* Formulario */}
        {!loading && teamId && !payment && !success && (
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}>
            {/* Equipo */}
            <div>
              <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Equipo
              </label>
              <div style={{
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#FFBF00',
              }}>
                {teamName}
              </div>
            </div>

            {/* Torneo */}
            <div>
              <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Torneo *
              </label>
              <select
                value={torneoId}
                onChange={e => setTorneoId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.08)',
                  border: `1px solid ${torneoId ? 'rgba(255,191,0,0.5)' : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: '10px',
                  color: torneoId ? '#fff' : 'rgba(255,255,255,0.4)',
                  fontSize: '14px',
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                }}
              >
                <option value="" style={{ background: '#1a1a1a' }}>Selecciona un torneo</option>
                {torneos.map(t => (
                  <option key={t.id} value={t.id} style={{ background: '#1a1a1a' }}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Comprobante */}
            <div>
              <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Comprobante de pago *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={e => e.target.files?.[0] && setFile(e.target.files[0])}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }}
                />
                <div style={{
                  border: `2px dashed ${file ? '#27ae60' : 'rgba(255,255,255,0.2)'}`,
                  borderRadius: '12px',
                  padding: '28px',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  <p style={{ margin: 0, fontSize: '28px' }}>{file ? '✅' : '📎'}</p>
                  <p style={{ margin: '8px 0 0', fontSize: '12px', color: file ? '#27ae60' : 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}>
                    {file ? file.name : 'Toca para subir tu comprobante (PNG, JPG, PDF)'}
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <p style={{ margin: 0, color: '#e74c3c', fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>{error}</p>
            )}

            <button
              onClick={handleEnviar}
              disabled={!file || !torneoId || submitting}
              style={{
                padding: '13px',
                borderRadius: '25px',
                border: 'none',
                background: file && torneoId && !submitting ? '#FFBF00' : 'rgba(255,255,255,0.15)',
                color: file && torneoId && !submitting ? '#000' : 'rgba(255,255,255,0.4)',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: '14px',
                cursor: file && torneoId && !submitting ? 'pointer' : 'not-allowed',
              }}
            >
              {submitting ? 'Enviando...' : 'Enviar Comprobante'}
            </button>
          </div>
        )}

        {/* Éxito */}
        {success && (
          <div style={{
            background: 'rgba(39,174,96,0.1)',
            border: '1px solid rgba(39,174,96,0.3)',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '40px', margin: '0 0 12px' }}>✅</p>
            <p style={{ fontWeight: 800, fontSize: '16px', margin: '0 0 8px' }}>Comprobante enviado</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: "'Inter', sans-serif" }}>
              Tu pago está en revisión. Recibirás confirmación en 24-48 horas.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Pagos;
