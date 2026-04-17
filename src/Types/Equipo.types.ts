export interface Jugador {
  id: string;
  nombre: string;
  foto: string;
  posicion: string;
}

export interface Slot {
  id: string;
  label: string;
  posicion: 'portero' | 'jugador';
  x: number;
  y: number;
  jugadorId: string | null;
}
