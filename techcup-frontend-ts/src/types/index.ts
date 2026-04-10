export type UserRole = "ADMIN" | "ORGANIZADOR" | "ARBITRO" | "CAPITAN" | "JUGADOR";

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: UserRole;
  avatarUrl?: string;
}

export interface Equipo {
  id: number;
  nombre: string;
  capitan: User;
  jugadores: User[];
  logoUrl?: string;
}

export interface Torneo {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaCierre: string;
  cantidadEquipos: number;
  costoPorEquipo: number;
  estado: "CREADO" | "EN_CURSO" | "FINALIZADO";
  equipos: Equipo[];
}

export interface Partido {
  id: number;
  equipoLocal: Equipo;
  equipoVisitante: Equipo;
  fecha: string;
  arbitro?: User;
  golesLocal?: number;
  golesVisitante?: number;
  estado: "PENDIENTE" | "EN_CURSO" | "FINALIZADO";
}

export interface NavItem {
  label: string;
  path: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
