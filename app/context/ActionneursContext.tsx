'use client';

import { Actionneur } from '@/lib/models/actionneur';
import { createContext, ReactNode, useContext, useState } from 'react';

type ActionneursContextType = {
  getActionneurs: () => Actionneur[];
  getActionneurById: (id: number) => Actionneur | undefined;
  addActionneur: (newActionneur: Actionneur) => void;
  removeActionneur: (id: number) => void;
}


const ActionneursContext = createContext<ActionneursContextType | undefined>(undefined);

export function ActionneursProvider({ initialActionneurs, children }: { initialActionneurs: Actionneur[], children: ReactNode }) {
  const [actionneurs, setActionneurs] = useState(initialActionneurs || []);

  const getActionneurs = () => actionneurs;
  const getActionneurById = (id: number) => actionneurs.find(c => c.id === id);
  const addActionneur = (newActionneur: Actionneur) => setActionneurs([...actionneurs, newActionneur]);
  const removeActionneur = (id: number) => setActionneurs(actionneurs.filter(c => c.id !== id));

  return (
    <ActionneursContext.Provider value={{ getActionneurs, getActionneurById, addActionneur, removeActionneur }}>
      {children}
    </ActionneursContext.Provider>
  );
}

export function useActionneurs() {
  const context = useContext(ActionneursContext);
  if (context === undefined) {
    throw new Error('useActionneurs must be used within a ActionneursProvider');
  }
  return context;
}