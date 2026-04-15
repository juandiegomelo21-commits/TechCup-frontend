import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import fondoEstadio from '../assets/FondoEstadio.png';
import { registerPlayerApi } from '../api/playerService';

type Role = 'jugador' | 'arbitro' | 'admin';
type Affiliation = 'estudiante' | 'graduado' | 'familia';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<Role>('jugador');
  const [affiliation, setAffiliation] = useState<Affiliation>('estudiante');
  const [fullName, setFullName] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [semester, setSemester] = useState('');
  const [relativeId, setRelativeId] = useState('');
  const [relationship, setRelationship] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [position, setPosition] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [license, setLicense] = useState('');
  const [experience, setExperience] = useState('');
  const [token, setToken] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPhotoBase64(result);
      setPhotoPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    outline: 'none',
    boxSizing: 'border-box' as const,
    color: '#333',
  };

  const labelStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    color: '#333',
    marginBottom: '3px',
    display: 'block',
  };

  const sectionTitle = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 'bold' as const,
    fontSize: '14px',
    color: '#1a1a1a',
    margin: '8px 0 6px 0',
  };

  const eyeIcon = (show: boolean, toggle: () => void) => (
    <div onClick={toggle} style={{ cursor: 'pointer', flexShrink: 0 }}>
      {show ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="1" y1="1" x2="23" y2="23" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#888" strokeWidth="1.8"/>
          <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="1.8"/>
        </svg>
      )}
    </div>
  );

  const errorText = (field: string) =>
    errors[field] ? (
      <p style={{ color: '#cc0000', fontSize: '10px', margin: '2px 0 0 4px', fontFamily: "'Inter', sans-serif" }}>
        {errors[field]}
      </p>
    ) : null;

  const passwordInput = (
    value: string,
    onChange: (v: string) => void,
    show: boolean,
    toggle: () => void,
    placeholder: string,
    errorKey: string
  ) => (
    <div style={{
      display: 'flex', alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.8)',
      border: `1px solid ${errors[errorKey] ? '#ff4444' : '#ccc'}`,
      borderRadius: '8px', padding: '8px 12px', gap: '8px',
    }}>
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: 'none', outline: 'none', width: '100%', fontFamily: "'Inter', sans-serif", fontSize: '12px', backgroundColor: 'transparent' }}
      />
      {eyeIcon(show, toggle)}
    </div>
  );

  const emailPlaceholder = () => {
    if (role === 'jugador' && affiliation === 'familia') return 'tu.correo@gmail.com';
    return 'tu.correo@institucion.edu';
  };

  const handleRegister = async () => {
    const newErrors: Record<string, string> = {};
    if (!fullName) newErrors.fullName = 'El nombre es requerido.';
    if (!cedula) newErrors.cedula = 'La cédula es requerida.';
    if (!email) newErrors.email = 'El correo es requerido.';
    else if (!email.includes('@')) newErrors.email = 'Correo no válido.';
    if (role === 'jugador') {
      if (!age) newErrors.age = 'La edad es requerida.';
      else if (parseInt(age) < 15 || parseInt(age) > 110) newErrors.age = 'Edad entre 15 y 110.';
      if (!gender) newErrors.gender = 'El género es requerido.';
      if (affiliation === 'estudiante' && !semester) newErrors.semester = 'El semestre es requerido.';
      if (affiliation === 'familia') {
        if (!relativeId) newErrors.relativeId = 'El ID del familiar es requerido.';
        if (!relationship) newErrors.relationship = 'El parentesco es requerido.';
      }
    }
    if (!password) newErrors.password = 'La contraseña es requerida.';
    else if (password.length < 8) newErrors.password = 'Mínimo 8 caracteres.';
    else if (!/(?=.*[A-Z])/.test(password)) newErrors.password = 'Debe tener al menos una mayúscula.';
    else if (!/(?=.*\d)/.test(password)) newErrors.password = 'Debe tener al menos un número.';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirma tu contraseña.';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'No coinciden.';
    if (role === 'arbitro') {
      if (!license) newErrors.license = 'La licencia es requerida.';
      if (!experience) newErrors.experience = 'La experiencia es requerida.';
    }
    if (role === 'admin' && !token) newErrors.token = 'El token es requerido.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setApiError(null);

    try {
      if (role === 'jugador') {
        const playerTypeMap: Record<Affiliation, string> = {
          estudiante: 'STUDENT',
          graduado: 'INSTITUTIONAL',
          familia: 'EXTERNAL',
        };
        await registerPlayerApi({
          fullname: fullName,
          email,
          password,
          numberID: parseInt(cedula),
          position,
          dorsalNumber: parseInt(jerseyNumber) || 0,
          photoUrl: photoBase64 || null,
          haveTeam: false,
          age: parseInt(age),
          gender,
          captain: false,
          playerType: playerTypeMap[affiliation],
          ...(affiliation === 'estudiante' && { semester: parseInt(semester) }),
          ...(affiliation === 'familia' && {
            relativeId: parseInt(relativeId),
            relationship,
          }),
        });
      }
      navigate('/account-created');
    } catch (err: any) {
      setApiError(err.response?.data?.mensaje || 'Error al registrarse. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '6px 16px 20px',
      overflowY: 'auto',
    }}>

      {/* Fondo verde */}
      <div style={{ position: 'fixed', inset: 0, backgroundColor: '#00674F', zIndex: 0 }} />

      {/* Imagen estadio */}
      <img
        src={fondoEstadio}
        alt="Estadio"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 70%',
          opacity: 0.4,
          zIndex: 1,
        }}
      />

      {/* Capa oscura */}
      <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,40,20,0.35)', zIndex: 2 }} />

      {/* Logo centrado */}
      <img
        src={logo}
        alt="TechUp Fútbol"
        style={{
          width: 'clamp(80px, 12vw, 115px)',
          marginBottom: '8px',
          marginTop: '4px',
          position: 'relative',
          zIndex: 10,
          alignSelf: 'center',
        }}
      />

      {/* Card */}
      <div style={{
        backgroundColor: 'rgba(210, 230, 218, 0.88)',
        borderRadius: '16px',
        padding: '14px 18px',
        width: '100%',
        maxWidth: '480px',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        marginBottom: '16px',
      }}>

        {/* Tabs rol */}
        <p style={{ ...labelStyle, marginBottom: '6px' }}>Selecciona tu Rol</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
          {(['jugador', 'arbitro', 'admin'] as Role[]).map((r) => (
            <button key={r} onClick={() => setRole(r)} style={{
              padding: '7px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', fontSize: '12px',
              backgroundColor: role === r ? '#FFBF00' : 'rgba(255,255,255,0.7)',
              color: role === r ? '#000' : '#4A4A4A', transition: 'all 0.2s',
            }}>
              {r === 'jugador' ? 'Jugador' : r === 'arbitro' ? 'Árbitro' : 'Admin'}
            </button>
          ))}
        </div>

        {/* Afiliación */}
        {role === 'jugador' && (
          <>
            <p style={{ ...labelStyle, marginBottom: '6px' }}>Selecciona tu Afiliación</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              {(['estudiante', 'graduado', 'familia'] as Affiliation[]).map((a) => (
                <button key={a} onClick={() => setAffiliation(a)} style={{
                  flex: 1, padding: '7px 4px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif", fontSize: '11px',
                  backgroundColor: affiliation === a ? '#FFBF00' : 'rgba(255,255,255,0.7)',
                  color: affiliation === a ? '#000' : '#4A4A4A', transition: 'all 0.2s',
                }}>
                  {a === 'estudiante' ? 'Estudiante' : a === 'graduado' ? 'Graduado' : 'Familia / Invitado'}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Información Personal */}
        <p style={sectionTitle}>Información Personal</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
          <div>
            <label style={labelStyle}>Nombre Completo</label>
            <input style={{ ...inputStyle, border: `1px solid ${errors.fullName ? '#ff4444' : '#ccc'}` }} placeholder="Tu nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            {errorText('fullName')}
          </div>
          <div>
            <label style={labelStyle}>Número de Cédula</label>
            <input style={{ ...inputStyle, border: `1px solid ${errors.cedula ? '#ff4444' : '#ccc'}` }} placeholder="Tu número de cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
            {errorText('cedula')}
          </div>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label style={labelStyle}>Correo Electrónico</label>
          <input style={{ ...inputStyle, border: `1px solid ${errors.email ? '#ff4444' : '#ccc'}` }} type="email" placeholder={emailPlaceholder()} value={email} onChange={(e) => setEmail(e.target.value)} />
          {errorText('email')}
        </div>

        {role === 'jugador' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
            <div>
              <label style={labelStyle}>Edad</label>
              <input style={{ ...inputStyle, border: `1px solid ${errors.age ? '#ff4444' : '#ccc'}` }} placeholder="Ej: 20" value={age} onChange={(e) => setAge(e.target.value)} type="number" min="15" max="110" />
              {errorText('age')}
            </div>
            <div>
              <label style={labelStyle}>Género</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ ...inputStyle, border: `1px solid ${errors.gender ? '#ff4444' : '#ccc'}`, color: gender ? '#1a1a1a' : '#888' }}>
                <option value="">Selecciona género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
              {errorText('gender')}
            </div>
          </div>
        )}

        {/* Semestre — estudiante */}
        {role === 'jugador' && affiliation === 'estudiante' && (
          <div style={{ marginBottom: '8px' }}>
            <label style={labelStyle}>Semestre</label>
            <input style={{ ...inputStyle, border: `1px solid ${errors.semester ? '#ff4444' : '#ccc'}` }} placeholder="Tu semestre (1-10)" value={semester} onChange={(e) => setSemester(e.target.value)} type="number" min="1" max="10" />
            {errorText('semester')}
          </div>
        )}

        {/* Familiar */}
        {role === 'jugador' && affiliation === 'familia' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
            <div>
              <label style={labelStyle}>ID del Familiar</label>
              <input style={{ ...inputStyle, border: `1px solid ${errors.relativeId ? '#ff4444' : '#ccc'}` }} placeholder="ID de tu familiar" value={relativeId} onChange={(e) => setRelativeId(e.target.value)} />
              {errorText('relativeId')}
            </div>
            <div>
              <label style={labelStyle}>Parentesco</label>
              <input style={{ ...inputStyle, border: `1px solid ${errors.relationship ? '#ff4444' : '#ccc'}` }} placeholder="Ej: Padre, Madre, Hijo" value={relationship} onChange={(e) => setRelationship(e.target.value)} />
              {errorText('relationship')}
            </div>
          </div>
        )}

        {/* Contraseñas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
          <div>
            <label style={labelStyle}>Contraseña</label>
            {passwordInput(password, setPassword, showPassword, () => setShowPassword(!showPassword), 'Mínimo 6 caracteres', 'password')}
            {errorText('password')}
          </div>
          <div>
            <label style={labelStyle}>Confirmar Contraseña</label>
            {passwordInput(confirmPassword, setConfirmPassword, showConfirm, () => setShowConfirm(!showConfirm), 'Repite tu contraseña', 'confirmPassword')}
            {errorText('confirmPassword')}
          </div>
        </div>

        {/* Perfil Deportivo */}
        {role === 'jugador' && (
          <>
            <p style={sectionTitle}>Perfil Deportivo</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', alignItems: 'start', marginBottom: '8px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={labelStyle}>Posición Preferida</label>
                  <select value={position} onChange={(e) => setPosition(e.target.value)} style={{ ...inputStyle, color: position ? '#1a1a1a' : '#888' }}>
                    <option value="">Selecciona posición</option>
                    <option value="GoalKeeper">Portero</option>
                    <option value="Defender">Defensa</option>
                    <option value="Midfielder">Mediocampista</option>
                    <option value="Winger">Extremo</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Número de Camiseta</label>
                  <input style={inputStyle} placeholder="1-99" value={jerseyNumber} onChange={(e) => setJerseyNumber(e.target.value)} type="number" min="1" max="99" />
                </div>
              </div>

              {/* Foto */}
              <label style={{
                width: '60px', height: '60px', borderRadius: '50%',
                border: '2px dashed #aaa', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.4)',
                marginTop: '14px', overflow: 'hidden', flexShrink: 0,
              }}>
                <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                {photoPreview ? (
                  <img src={photoPreview} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="#888" strokeWidth="1.8"/>
                      <circle cx="12" cy="13" r="4" stroke="#888" strokeWidth="1.8"/>
                    </svg>
                    <span style={{ fontSize: '8px', color: '#888', fontFamily: "'Inter', sans-serif", marginTop: '2px' }}>Foto</span>
                  </>
                )}
              </label>
            </div>
          </>
        )}

        {/* Árbitro */}
        {role === 'arbitro' && (
          <>
            <p style={sectionTitle}>Credenciales de Árbitro</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <div>
                <label style={labelStyle}>Número de Licencia</label>
                <input style={{ ...inputStyle, border: `1px solid ${errors.license ? '#ff4444' : '#ccc'}` }} placeholder="Tu número de licencia" value={license} onChange={(e) => setLicense(e.target.value)} />
                {errorText('license')}
              </div>
              <div>
                <label style={labelStyle}>Años de Experiencia</label>
                <input style={{ ...inputStyle, border: `1px solid ${errors.experience ? '#ff4444' : '#ccc'}` }} placeholder="Años" value={experience} onChange={(e) => setExperience(e.target.value)} type="number" min="0" />
                {errorText('experience')}
              </div>
            </div>
          </>
        )}

        {/* Admin */}
        {role === 'admin' && (
          <>
            <p style={sectionTitle}>Acceso Administrador</p>
            <div style={{ marginBottom: '8px' }}>
              <label style={labelStyle}>Token de Autorización</label>
              <input style={{ ...inputStyle, border: `1px solid ${errors.token ? '#ff4444' : '#ccc'}` }} placeholder="Ingresa el token seguro" value={token} onChange={(e) => setToken(e.target.value)} />
              <p style={{ fontSize: '10px', color: '#555', fontFamily: "'Inter', sans-serif", margin: '3px 0 0 4px' }}>
                Este token es requerido para obtener acceso administrativo.
              </p>
              {errorText('token')}
            </div>
          </>
        )}

        {/* Error del backend */}
        {apiError && (
          <p style={{ color: '#cc0000', fontSize: '12px', fontFamily: "'Inter', sans-serif", margin: '4px 0', textAlign: 'center' }}>
            {apiError}
          </p>
        )}

        {/* Botón */}
        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#cca800' : '#FFBF00',
            color: '#000000',
            border: 'none',
            borderRadius: '25px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s',
            marginBottom: '8px',
            marginTop: '6px',
          }}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p style={{ textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#4A4A4A', margin: 0 }}>
          ¿Ya tienes cuenta?{' '}
          <span onClick={() => navigate('/login')} style={{ color: '#00674F', cursor: 'pointer', fontWeight: 'bold' }}>
            Inicia Sesión
          </span>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;