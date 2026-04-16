export interface User {
  id: string;
  name: string;
  email: string;
  role: 'jugador' | 'arbitro' | 'admin' | 'organizador' | 'capitan';
  isCapitan?: boolean;
  profilePhoto?: string;
}

export interface Team {
  id: string;
  name: string;
  capitan: string;
  players: number;
  maxPlayers: number;
  shield?: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  age: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  field: string;
  status: 'pendiente' | 'en_curso' | 'finalizado';
}

export interface Standing {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  points: number;
}

export interface Invitation {
  name: string;
  date: string;
  status: 'Aceptada' | 'Pendiente' | 'Rechazada';
}