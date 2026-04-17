import { useState } from 'react';
import { loginApi } from '../api/authService';
import type { LoginRequest } from '../api/authService';
import type { User } from '../Types';

const getUserFromStorage = (): User | null => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const rol = localStorage.getItem('rol');
  if (!token || !email || !rol) return null;
  return {
    id: '',
    name: email,
    email,
    role: rol as User['role'],
  };
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(getUserFromStorage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginApi(data);
      const rol = response.rol.replace('ROLE_', '').toLowerCase();
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.email);
      localStorage.setItem('rol', rol);
      if (response.userId) localStorage.setItem('userId', response.userId);
      setUser({
        id: '',
        name: response.email,
        email: response.email,
        role: rol as User['role'],
      });
      return rol;
    } catch (err: any) {
      const message = err.response?.data?.mensaje || 'Credenciales incorrectas';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    setUser(null);
  };

  return { user, login, logout, loading, error };
};
