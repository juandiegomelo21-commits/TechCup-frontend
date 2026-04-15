import { useState } from 'react';
import type { Slot, Jugador } from '../Types/Equipo.types';

const slotsIniciales: Slot[] = [
  { id: 's1', label: 'PORTERO',        posicion: 'portero', x: 50, y: 88, jugadorId: null },
  { id: 's2', label: 'DEF IZQUIERDO',  posicion: 'jugador', x: 28, y: 68, jugadorId: null },
  { id: 's3', label: 'DEF DERECHO',    posicion: 'jugador', x: 72, y: 68, jugadorId: null },
  { id: 's4', label: 'MED IZQUIERDO',  posicion: 'jugador', x: 18, y: 44, jugadorId: null },
  { id: 's5', label: 'MED CENTRAL',    posicion: 'jugador', x: 50, y: 44, jugadorId: null },
  { id: 's6', label: 'MED DERECHO',    posicion: 'jugador', x: 82, y: 44, jugadorId: null },
  { id: 's7', label: 'DELANTERO',      posicion: 'jugador', x: 50, y: 20, jugadorId: null },
];

export const usePizarra = (jugadores: Jugador[]) => {
  const [slots, setSlots] = useState<Slot[]>(slotsIniciales);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [hayCambios, setHayCambios] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const jugadoresAsignados = slots
    .filter(s => s.jugadorId !== null)
    .map(s => s.jugadorId);

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    const jugadorId = e.dataTransfer.getData('jugadorId');
    const jugador = jugadores.find(j => j.id === jugadorId);
    const slot = slots.find(s => s.id === slotId);
    if (!jugador || !slot) return;

    // Portero solo en slot portero
    if (jugador.posicion === 'portero' && slot.posicion !== 'portero') return;
    // Jugadores de campo no van al slot portero
    if (slot.posicion === 'portero' && jugador.posicion !== 'portero') return;

    setSlots(prev => prev.map(s => {
      if (s.jugadorId === jugadorId && s.id !== slotId) return { ...s, jugadorId: null };
      if (s.id === slotId) return { ...s, jugadorId };
      return s;
    }));
    setDragOver(null);
    setHayCambios(true);
  };

  // Quitar jugador del slot y devolverlo a la lista
  const handleRemove = (slotId: string) => {
    setSlots(prev => prev.map(s => s.id === slotId ? { ...s, jugadorId: null } : s));
    setHayCambios(true);
  };

  // Drag desde el campo de vuelta a la lista
  const handleDragFromSlot = (e: React.DragEvent, slotId: string) => {
    const slot = slots.find(s => s.id === slotId);
    if (!slot?.jugadorId) return;
    e.dataTransfer.setData('fromSlotId', slotId);
    e.dataTransfer.setData('jugadorId', slot.jugadorId);
  };

  const handleDropToList = (e: React.DragEvent) => {
    e.preventDefault();
    const fromSlotId = e.dataTransfer.getData('fromSlotId');
    if (!fromSlotId) return;
    setSlots(prev => prev.map(s => s.id === fromSlotId ? { ...s, jugadorId: null } : s));
    setHayCambios(true);
  };

  const handleGuardar = () => {
    setHayCambios(false);
    setMostrarPopup(true);
    setTimeout(() => setMostrarPopup(false), 2500);
  };

  return {
    slots, dragOver, setDragOver,
    hayCambios, mostrarPopup,
    jugadoresAsignados,
    handleDrop, handleRemove,
    handleDragFromSlot, handleDropToList,
    handleGuardar,
  };
};