import React, { useState } from 'react';
import DashboardLayout from '../Components/layout/DashboardLayout'; // Ruta corregida

// ─── Tipos ─────────────────────────────────────────────────────────────────────
interface TorneoPago {
  id: number;
  nombre: string;
  estado: 'Pendiente' | 'Pagado';
}

// ─── Estilos Base ──────────────────────────────────────────────────────────────
const TEXT_BASE: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  color: '#ffffff',
};

const OVAL_BUTTON: React.CSSProperties = {
  background: '#FFBF00',
  borderRadius: '24px',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: '11px',
  textTransform: 'uppercase',
  color: '#1a1a1a',
  transition: 'transform 0.1s, opacity 0.2s',
};

// ─── Icono de Subida (SVG redondeado como la imagen de referencia) ──────────────
const UploadIconRounded = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ color: '#888888' }}>
    {/* Círculo de fondo claro */}
    <circle cx="12" cy="12" r="10" fill="#f0f0f5" />

    {/* Icono de subida (flecha y bandeja) */}
    <path d="M12 4L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 7L12 4L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ─── Componente Principal ──────────────────────────────────────────────────────
const Pagos = () => {
  const [torneoSeleccionado, setTorneoSeleccionado] = useState<TorneoPago | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null); // Estado para el archivo subido

  const listaTorneos: TorneoPago[] = [
    { id: 1, nombre: 'Copa Universitaria 2026', estado: 'Pendiente' },
    { id: 2, nombre: 'Torneo Relámpago Bogotá', estado: 'Pendiente' },
    { id: 3, nombre: 'Liga TechUp Elite', estado: 'Pendiente' },
  ];

  const abrirPago = (torneo: TorneoPago) => {
    setTorneoSeleccionado(torneo);
    setIsModalOpen(true);
    setFileUploaded(null); // Reiniciar estado al abrir
  };

  // Simulación de subida de archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileUploaded(event.target.files[0]);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: '20px', ...TEXT_BASE }}>
        <h2 style={{ marginBottom: '24px', fontWeight: 700 }}>Gestión de Pagos</h2>

        {/* Tabla de Torneos */}
        <div style={{
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '20px'
        }}>
          {listaTorneos.map((torneo) => (
            <div key={torneo.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
              <span style={{ fontWeight: 600 }}>{torneo.nombre}</span>
              <button
                style={OVAL_BUTTON}
                onClick={() => abrirPago(torneo)}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Pagar Inscripción
              </button>
            </div>
          ))}
        </div>

        {/* Modal de Pago (Réplica exacta) */}
        {isModalOpen && torneoSeleccionado && (
          <div style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000, backdropFilter: 'blur(5px)'
          }}>
            <div style={{
              background: '#f8f9fa',
              borderRadius: '20px',
              width: '450px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '30px',
              color: '#333',
              position: 'relative'
            }}>
              {/* Botón Cerrar */}
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}
              >✕</button>

              {/* Encabezado Dinámico */}
              <div style={{
                background: '#FFBF00',
                padding: '15px',
                borderRadius: '12px',
                textAlign: 'center',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                marginBottom: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                {torneoSeleccionado.nombre.toUpperCase()}
              </div>

              {/* Alerta informativa */}
              <div style={{ backgroundColor: '#fff8e1', border: '1px solid #ffe082', padding: '12px', borderRadius: '10px', fontSize: '11px', marginBottom: '20px' }}>
                <p>⚠️ Los pagos no se procesan dentro de la plataforma. Por favor transfiera el valor a través de <strong>NEQUI</strong> o pague en <strong>Efectivo</strong> con el coordinador y suba su recibo abajo.</p>
              </div>

              {/* Formulario */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700 }}>Subir Recibo de Pago</label>

                {/* ─── Área de Subida con ICONO ACTUALIZADO ─── */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="file"
                    id="reciboPago"
                    onChange={handleFileChange}
                    accept=".png, .jpg, .jpeg, .pdf"
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }}
                  />
                  <div style={{
                    border: '2px dashed #ccc',
                    padding: '30px',
                    textAlign: 'center',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    transition: 'border-color 0.2s',
                  }}>
                    {/* Aquí está el componente con el icono redondeado */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <UploadIconRounded />
                    </div>

                    <p style={{ fontSize: '11px', color: '#666', marginTop: '12px', lineHeight: '1.4' }}>
                      Toque para subir o arrastre su recibo aquí<br/>PNG, JPG, PDF (máx 5MB)
                    </p>

                    {fileUploaded && (
                      <p style={{ fontSize: '11px', color: '#1a73e8', marginTop: '8px', fontWeight: 600 }}>
                        ✓ Archivo seleccionado: {fileUploaded.name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Número de Referencia de Transacción</label>
                  <input type="text" placeholder="ej., M123456" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '5px' }} />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Método de Pago Utilizado</label>
                  <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '5px' }}>
                    <option>Seleccione un método</option>
                    <option>Nequi</option>
                    <option>Efectivo</option>
                  </select>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#FFBF00' }}>●</span> Estado Actual: <strong>Envío Pendiente</strong>
                </div>

                {/* Botón de Enviar (activo si hay archivo) */}
                <button
                  style={{
                    backgroundColor: fileUploaded ? '#e0b000' : '#e0e0e0', // Amarillo oscuro si está activo
                    color: fileUploaded ? '#1a1a1a' : '#999',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    cursor: fileUploaded ? 'pointer' : 'not-allowed',
                    marginTop: '10px',
                    width: '100%',
                    transition: 'background-color 0.2s',
                    opacity: fileUploaded ? 1 : 0.7
                  }}
                  disabled={!fileUploaded}
                >
                  Enviar para Revisión
                </button>
                <p style={{ fontSize: '9px', textAlign: 'center', color: '#999' }}>Su pago será revisado en un plazo de 24-48 horas.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Pagos;