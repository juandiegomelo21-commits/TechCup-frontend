import DashboardLayout from '../Components/layout/DashboardLayout';

interface Player {
  name: string;
  roles: string[];
  fullName: string;
  nationalId: string;
  email: string;
  preferredPosition: string;
  jerseyNumber: number;
  accountType: string;
  available: boolean;
  matchesPlayed: number;
  goalsScored: number;
}

const roleColors: Record<string, { bg: string; text: string }> = {
  Player: { bg: '#4FC3F7', text: '#0D47A1' },
  Student: { bg: '#CE93D8', text: '#4A148C' },
};

const IconUser = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(100,70,0,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const IconId = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8" cy="12" r="2" />
    <path d="M13 10h5M13 14h3" />
  </svg>
);

const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 8l10 6 10-6" />
  </svg>
);

const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const IconEdit = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const PlayerProfilePage = () => {
  const player: Player = {
    name: 'Carlos Rodríguez',
    roles: ['Player', 'Student'],
    fullName: 'Carlos Rodríguez',
    nationalId: '1234567890',
    email: 'carlos.rodriguez@university.edu.co',
    preferredPosition: 'Volante (Midfielder)',
    jerseyNumber: 10,
    accountType: 'Student',
    available: true,
    matchesPlayed: 0,
    goalsScored: 0,
  };

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
                  {player.name}
                </p>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {player.roles.map((role) => (
                    <span key={role} style={{ backgroundColor: roleColors[role]?.bg ?? '#ddd', color: roleColors[role]?.text ?? '#333', borderRadius: '20px', padding: '2px 10px', fontSize: '10px', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontFamily: "'Inter', sans-serif", cursor: 'pointer', color: '#1a1a1a', fontWeight: 500 }}>
              <IconEdit /> Editar Perfil
            </button>
          </div>

          {/* Cuerpo */}
          <div style={{ padding: '16px 18px' }}>
            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555' }}>
              Información Personal
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>FULL NAME</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>{player.fullName}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>NATIONAL ID</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <IconId /> {player.nationalId}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMAIL ADDRESS</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                <IconMail /> {player.email}
              </p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#eee', margin: '0 0 14px 0' }} />

            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555' }}>
              Perfil Deportivo
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>PREFERRED POSITION</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <IconPin /> {player.preferredPosition}
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>JERSEY NUMBER</p>
                <div style={{ width: '32px', height: '32px', backgroundColor: '#F5C518', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 800, color: '#1a1a1a' }}>
                  {player.jerseyNumber}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACCOUNT TYPE</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>{player.accountType}</p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ flex: 1, padding: '10px 8px', backgroundColor: '#4CAF50', color: '#ffffff', border: 'none', borderRadius: '8px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                Disponible
                <span style={{ fontSize: '9px', fontWeight: 400, opacity: 0.85 }}>Disponible para Equipos</span>
              </button>
              <button style={{ flex: 1, padding: '10px 8px', backgroundColor: '#F5C518', color: '#1a1a1a', border: 'none', borderRadius: '8px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, cursor: 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                {player.matchesPlayed}
                <span style={{ fontSize: '9px', fontWeight: 400 }}>Matches Played</span>
              </button>
              <button style={{ flex: 1, padding: '10px 8px', backgroundColor: '#4FC3F7', color: '#0D47A1', border: 'none', borderRadius: '8px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, cursor: 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                {player.goalsScored}
                <span style={{ fontSize: '9px', fontWeight: 400 }}>Goals Scored</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlayerProfilePage;
