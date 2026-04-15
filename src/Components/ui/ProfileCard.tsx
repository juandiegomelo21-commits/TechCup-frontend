interface ProfileCardProps {
  name?: string;
  photo?: string;
}

const ProfileCard = ({ name, photo }: ProfileCardProps) => {
  return (
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      minWidth: '140px',
    }}>
      <div style={{
        backgroundColor: '#FFBF00',
        borderRadius: '8px',
        padding: '6px 20px',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#000',
        width: '100%',
        textAlign: 'center',
      }}>
        Perfil
      </div>

      {photo ? (
        <img src={photo} alt={name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
      ) : (
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="35" r="22" fill="#888"/>
          <ellipse cx="50" cy="80" rx="32" ry="20" fill="#888"/>
        </svg>
      )}
      {name && <p style={{ color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '13px', margin: 0 }}>{name}</p>}
    </div>
  );
};

export default ProfileCard;