import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import DashboardLayout from '../Components/layout/DashboardLayout';

 import jeimmy   from '../assets/Jeimmy.png';
 import juandi   from '../assets/juandi.png';
 import santi    from '../assets/santi.png';
 import jesteban from '../assets/jesteban.png';
 import david    from '../assets/david.png';
 import cantor   from '../assets/cantor.png';
 import rodrigo  from '../assets/rodrigo.png';
 import messi    from '../assets/messi.png';

 /*
  * ESTADOS DE LA PANTALLA — cambiar 'con_equipo' para probar cada uno:
  *
  * 'loading'    → Spinner amarillo mientras carga datos del back
  * 'error'      → Card roja con mensaje de error y botón Reintentar
  * 'sin_equipo' → Empty state: el usuario no tiene equipo aún,
  *                muestra botón "Crear mi equipo" → navega a /equipo/crear
  * 'con_equipo' → Pantalla completa: mercado, escudo y grid de jugadores
  *
  * const [estado] = useState<EstadoEquipo>('con_equipo');
  */

 interface Jugador {
   id: string;
   nombre: string;
   foto: string;
   esTu?: boolean;
 }

 type EstadoEquipo = 'loading' | 'error' | 'sin_equipo' | 'con_equipo';

 const jugadoresMock: Jugador[] = [
   { id: '1', nombre: 'JEIMMY',    foto: jeimmy   },
   { id: '2', nombre: 'JUAN DI',   foto: juandi   },
   { id: '3', nombre: 'SANTI',     foto: santi    },
   { id: '4', nombre: 'J ESTEBAN', foto: jesteban },
   { id: '5', nombre: 'DAVID',     foto: david    },
   { id: '6', nombre: 'CANTOR',    foto: cantor   },
   { id: '7', nombre: 'RODRIGO',   foto: rodrigo  },
 ];

 const tuJugador: Jugador = { id: 'yo', nombre: 'TU NOMBRE', foto: messi, esTu: true };

 // ── JugadorCard ───────────────────────────────────────────────────────────────

 const JugadorCard = ({ jugador }: { jugador: Jugador }) => {
   const [hovered, setHovered] = useState(false);
   return (
     <div
       onMouseEnter={() => setHovered(true)}
       onMouseLeave={() => setHovered(false)}
       style={{
         position: 'relative',
         borderRadius: '10px',
         overflow: 'hidden',
         height: '110px',
         backgroundColor: 'rgba(0,0,0,0.35)',
         cursor: 'pointer',
         border: `1px solid ${hovered ? '#FFBF00' : 'rgba(255,255,255,0.1)'}`,
         transition: 'all 0.22s ease',
         transform: hovered ? 'scale(1.05)' : 'scale(1)',
         boxShadow: hovered ? '0 0 20px rgba(255,191,0,0.35)' : 'none',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'flex-end',
       }}
     >
       <div style={{
         position: 'absolute', inset: 0,
         background: hovered
           ? 'linear-gradient(180deg, rgba(255,191,0,0.15) 0%, rgba(0,0,0,0.75) 60%)'
           : 'linear-gradient(180deg, rgba(0,60,30,0.3) 0%, rgba(0,0,0,0.75) 60%)',
         transition: 'background 0.22s', zIndex: 1,
       }} />
       <img src={jugador.foto} alt={jugador.nombre} style={{
         position: 'absolute', bottom: '18px', left: '50%',
         transform: 'translateX(-50%)', height: '95px', width: 'auto',
         objectFit: 'contain', objectPosition: 'top', zIndex: 2,
         filter: hovered ? 'drop-shadow(0 0 8px rgba(255,191,0,0.5))' : 'none',
         transition: 'filter 0.22s',
       }} />
       <span style={{
         position: 'relative', zIndex: 3,
         color: hovered ? '#FFBF00' : '#ffffff',
         fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
         fontSize: '10px', letterSpacing: '0.6px',
         textShadow: '0 1px 6px rgba(0,0,0,1)', textAlign: 'center',
         padding: '0 4px 5px', transition: 'color 0.22s', lineHeight: 1,
       }}>
         {jugador.nombre}
       </span>
     </div>
   );
 };

 // ── TuCard ────────────────────────────────────────────────────────────────────

 const TuCard = ({ jugador }: { jugador: Jugador }) => (
   <div style={{
     width: '155px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden',
     position: 'relative', backgroundColor: 'rgba(0,0,0,0.3)',
     border: '1px solid rgba(255,255,255,0.15)',
     display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
     minHeight: '210px',
   }}>
     <div style={{
       position: 'absolute', inset: 0,
       background: 'linear-gradient(180deg, rgba(0,60,30,0.2) 0%, rgba(0,0,0,0.85) 100%)',
       zIndex: 1,
     }} />
     <img src={jugador.foto} alt={jugador.nombre} style={{
       position: 'absolute', bottom: '24px', left: '50%',
       transform: 'translateX(-50%)', height: '185px', width: 'auto',
       objectFit: 'contain', objectPosition: 'top', zIndex: 2,
     }} />
     <span style={{
       position: 'relative', zIndex: 3, color: '#FFBF00',
       fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
       fontSize: '12px', padding: '8px', textAlign: 'center',
       letterSpacing: '1px', textShadow: '0 2px 8px rgba(0,0,0,1)',
     }}>
       {jugador.nombre}
     </span>
   </div>
 );

 // ── Estados visuales ──────────────────────────────────────────────────────────

 const LoadingState = () => (
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
     <div style={{ textAlign: 'center' }}>
       <div style={{
         width: '48px', height: '48px', borderRadius: '50%',
         border: '3px solid rgba(255,255,255,0.2)',
         borderTop: '3px solid #FFBF00',
         animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
       }} />
       <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: '14px', margin: 0 }}>
         Cargando equipo...
       </p>
       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
     </div>
   </div>
 );

 const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
     <div style={{
       textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.08)',
       borderRadius: '16px', padding: '40px 32px',
       border: '1px solid rgba(255,80,80,0.3)',
     }}>
       <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚠️</div>
       <p style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '16px', margin: '0 0 8px' }}>
         Error al cargar el equipo
       </p>
       <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif", fontSize: '13px', margin: '0 0 20px' }}>
         No se pudo conectar con el servidor.
       </p>
       <button onClick={onRetry} style={{
         backgroundColor: '#FFBF00', color: '#000', border: 'none',
         borderRadius: '20px', padding: '9px 24px', fontSize: '13px',
         fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif",
       }}>Reintentar</button>
     </div>
   </div>
 );

 const SinEquipoState = ({ onCrear }: { onCrear: () => void }) => (
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
     <div style={{
       textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.08)',
       borderRadius: '16px', padding: '48px 40px',
       border: '1px solid rgba(255,255,255,0.13)', maxWidth: '380px',
     }}>
       <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: '0 auto 16px', display: 'block' }}>
         <circle cx="32" cy="32" r="30" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
         <circle cx="32" cy="32" r="10" stroke="#FFBF00" strokeWidth="2"/>
         <path d="M32 2v10M32 52v10M2 32h10M52 32h10" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"/>
       </svg>
       <p style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '18px', margin: '0 0 8px' }}>
         Aún no tienes equipo
       </p>
       <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif", fontSize: '13px', margin: '0 0 24px', lineHeight: '1.5' }}>
         Crea tu equipo, agrega jugadores y participa en el torneo.
       </p>
       <button onClick={onCrear} style={{
         backgroundColor: '#FFBF00', color: '#000', border: 'none',
         borderRadius: '25px', padding: '12px 32px', fontSize: '14px',
         fontWeight: 700, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif",
       }}>Crear mi equipo</button>
     </div>
   </div>
 );

 // ── Pantalla principal ────────────────────────────────────────────────────────

 const MiEquipo = () => {
   const navigate = useNavigate();
   const [estado] = useState<EstadoEquipo>('con_equipo');

   const card: React.CSSProperties = {
     backgroundColor: 'rgba(255,255,255,0.10)',
     backdropFilter: 'blur(10px)',
     borderRadius: '16px',
     border: '1px solid rgba(255,255,255,0.13)',
     padding: '14px 16px',
   };

   const btnAmarillo: React.CSSProperties = {
     backgroundColor: '#FFBF00',
     borderRadius: '25px',
     padding: '9px 0',
     textAlign: 'center' as const,
     fontFamily: "'Montserrat', sans-serif",
     fontWeight: 800,
     fontSize: '14px',
     color: '#000',
     cursor: 'pointer',
     border: 'none',
     width: '100%',
     display: 'block',
   };

   if (estado === 'loading')    return <DashboardLayout><LoadingState /></DashboardLayout>;
   if (estado === 'error')      return <DashboardLayout><ErrorState onRetry={() => {}} /></DashboardLayout>;
   if (estado === 'sin_equipo') return <DashboardLayout><SinEquipoState onCrear={() => navigate('/equipo/crear')} /></DashboardLayout>;

   return (
     <DashboardLayout>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', fontFamily: "'Inter', sans-serif" }}>

         {/* ── Fila superior: Mercado + Escudo — lado a lado ─────────────── */}
         <div style={{ display: 'flex', gap: '14px' }}>

           {/* Mercado */}
           <div style={{ ...card, flex: 1, alignSelf: 'flex-start' }}>
             <button style={{ ...btnAmarillo, marginBottom: '10px' }} onClick={() => navigate('/mercado')}>
               Mercado de jugadores
             </button>
             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                 <tr>
                   {['Jugador', 'Posición'].map(h => (
                     <th key={h} style={{
                       color: 'rgba(255,255,255,0.5)', textAlign: 'left',
                       padding: '4px 8px', fontWeight: 600,
                       borderBottom: '1px solid rgba(255,255,255,0.1)',
                       fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px',
                     }}>{h}</th>
                   ))}
                 </tr>
               </thead>
               <tbody>
                 {[
                   { nombre: 'Carlos Mendoza', posicion: 'Delantero' },
                   { nombre: 'Ana Rodríguez',  posicion: 'Defensa'   },
                 ].map((j, i) => (
                   <tr key={i}>
                     <td style={{ color: '#fff', padding: '6px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px' }}>{j.nombre}</td>
                     <td style={{ color: 'rgba(255,255,255,0.6)', padding: '6px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px' }}>{j.posicion}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

           {/* Escudo */}
           <div style={{ ...card, width: '200px', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
             <button style={btnAmarillo}>Escudo</button>
             <div style={{
               width: '90px', height: '90px', backgroundColor: 'rgba(0,0,0,0.3)',
               borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
               border: '2px dashed rgba(255,255,255,0.2)', cursor: 'pointer',
             }}>
               <svg width="50" height="50" viewBox="0 0 56 56" fill="none">
                 <path d="M28 4L6 14v16c0 12 9.5 22 22 26 12.5-4 22-14 22-26V14L28 4z" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="rgba(255,255,255,0.05)"/>
                 <circle cx="28" cy="28" r="8" stroke="#FFBF00" strokeWidth="1.5" fill="none"/>
               </svg>
             </div>
             <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
               Toca para cambiar
             </span>
           </div>
         </div>

         {/* ── Jugadores del equipo ──────────────────────────────────────── */}
         <div style={{ ...card, flex: 1 }}>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
             <div style={{
               backgroundColor: '#FFBF00', borderRadius: '25px', padding: '9px 24px',
               fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '14px', color: '#000',
             }}>
               Jugadores de tu equipo
             </div>
             <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
               {jugadoresMock.length}/12 jugadores
             </span>
           </div>

           <div style={{ display: 'flex', gap: '14px' }}>
             <div style={{
               flex: 1, display: 'grid',
               gridTemplateColumns: 'repeat(3, 1fr)',
               gap: '10px', alignContent: 'start',
             }}>
               {jugadoresMock.map(j => <JugadorCard key={j.id} jugador={j} />)}
             </div>
             <TuCard jugador={tuJugador} />
           </div>

           <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
             <button onClick={() => navigate('/equipo/pizarra')} style={{
               backgroundColor: '#FFBF00', color: '#000', border: 'none',
               borderRadius: '25px', padding: '11px 40px', fontSize: '14px',
               fontWeight: 700, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif",
             }}>
               Pizarra de tu equipo
             </button>
           </div>
         </div>

       </div>
     </DashboardLayout>
   );
 };

 export default MiEquipo;
