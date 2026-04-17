import DashboardLayout from '../Components/layout/DashboardLayout';

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

const IconShield = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 4v6c0 5-4 9-8 10C8 21 4 17 4 12V6l8-4z" />
  </svg>
);

const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

const IconEdit = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const AdminProfilePage = () => {
  const admin = {
    name: 'Juan Pablo Martínez',
    role: 'Admin',
    fullName: 'Juan Pablo Martínez',
    nationalId: '1122334455',
    email: 'jp.martinez@techcup.com',
    users: 0,
    teams: 0,
    matches: 0,
    tournaments: 0,
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
                  {admin.name}
                </p>
                <span style={{ backgroundColor: '#EF9A9A', color: '#B71C1C', borderRadius: '20px', padding: '2px 10px', fontSize: '10px', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  {admin.role}
                </span>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontFamily: "'Inter', sans-serif", cursor: 'pointer', color: '#1a1a1a', fontWeight: 500 }}>
              <IconEdit /> Editar Perfil
            </button>
          </div>

          {/* Cuerpo */}
          <div style={{ padding: '16px 18px' }}>

            {/* Información Personal */}
            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <IconUser /> Información Personal
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>FULL NAME</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif" }}>{admin.fullName}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>NATIONAL ID</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <IconId /> {admin.nationalId}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#999', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMAIL ADDRESS</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#333', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px' }}>
                <IconMail /> {admin.email}
              </p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#eee', margin: '0 0 14px 0' }} />

            {/* Administrator Access */}
            <p style={{ margin: '0 0 10px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <IconShield /> Administrator Access
            </p>

            {/* Full System Access banner */}
            <div style={{ backgroundColor: '#F5C518', borderRadius: '8px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconLock />
              </div>
              <div>
                <p style={{ margin: '0 0 2px 0', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: '#1a1a1a' }}>Full System Access</p>
                <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#555' }}>You have administrative privileges to manage the platform</p>
              </div>
            </div>

            {/* Stats grid */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { label: 'Users', value: admin.users },
                { label: 'Teams', value: admin.teams },
                { label: 'Matches', value: admin.matches },
                { label: 'Tournaments', value: admin.tournaments },
              ].map((stat) => (
                <div key={stat.label} style={{ flex: 1, padding: '10px 6px', backgroundColor: '#F5C518', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 800, color: '#1a1a1a' }}>{stat.value}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#555' }}>{stat.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProfilePage;