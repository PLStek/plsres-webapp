'use client';

import { Charbon } from '@/lib/models/charbon';
import { createContext, ReactNode, useContext, useState } from 'react';

type CharbonsContextType = {
  getCharbons: () => Charbon[];
  getCharbonById: (id: number) => Charbon | undefined;
  addCharbon: (newCharbon: Charbon) => void;
  removeCharbon: (id: number) => void;
}


const CharbonsContext = createContext<CharbonsContextType | undefined>(undefined);

export function CharbonsProvider({ initialCharbons, children }: { initialCharbons: Charbon[], children: ReactNode }) {
  const [charbons, setCharbons] = useState(initialCharbons || []);

  const getCharbons = () => charbons;
  const getCharbonById = (id: number) => charbons.find(c => c.id === id);
  const addCharbon = (newCharbon: Charbon) => setCharbons([...charbons, newCharbon]);
  const removeCharbon = (id: number) => setCharbons(charbons.filter(c => c.id !== id));

  return (
    <CharbonsContext.Provider value={{ getCharbons, getCharbonById, addCharbon, removeCharbon }}>
      {children}
    </CharbonsContext.Provider>
  );
}

export function useCharbons() {
  const context =  useContext(CharbonsContext);
  if (!context) {
    throw new Error('useCharbons must be used within a CharbonsProvider');
  }
  return context;
}