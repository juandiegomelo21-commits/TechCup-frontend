interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  const base: React.CSSProperties = {
    padding: '12px 40px',
    borderRadius: '25px',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
    letterSpacing: '0.5px',
  };

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#FFBF00',
      color: '#000000',
    },
    secondary: {
      backgroundColor: 'transparent',
      border: '2px solid #FFBF00',
      color: '#FFBF00',
    },
  };

  return (
    <button style={{ ...base, ...styles[variant] }} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;