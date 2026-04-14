interface BadgeProps {
  status: 'Aceptada' | 'Pendiente' | 'Rechazada';
}

const Badge = ({ status }: BadgeProps) => {
  const colors = {
    Aceptada: { bg: '#00a651', text: '#fff' },
    Pendiente: { bg: '#FFBF00', text: '#000' },
    Rechazada: { bg: '#cc0000', text: '#fff' },
  };

  return (
    <span style={{
      backgroundColor: colors[status].bg,
      color: colors[status].text,
      padding: '3px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontFamily: "'Inter', sans-serif",
      fontWeight: 'bold',
    }}>
      {status}
    </span>
  );
};

export default Badge;