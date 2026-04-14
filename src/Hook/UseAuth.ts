import { useState } from 'react';
import { User } from '../types';

// Simulación hasta conectar backend
const mockUser: User = {
  id: '1',
  name: 'Juan Pérez',
  email: 'juan@institucion.edu',
  role: 'jugador',
  isCapitan: true,
};

export const useAuth = () => {
  const [user] = useState<User>(mockUser);
  return { user };
};