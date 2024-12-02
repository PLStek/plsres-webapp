"use client";

import { Charbon } from "@lib/models/charbon";
import { createContext, ReactNode, useContext, useState } from "react";

type CharbonContextType = {
    charbons: Charbon[];
    addCharbon: (newCharbon: Charbon) => void;
    updateCharbon: (updatedCharbon: Charbon) => void;
    removeCharbon: (id: number) => void;
};

export const CharbonContext = createContext<CharbonContextType | null>(
    null
);

const CharbonProvider = ({
    initialCharbons,
    children,
}: {
    initialCharbons?: Charbon[];
    children: ReactNode;
}) => {
    const [charbons, setCharbons] = useState(initialCharbons ?? []);

    const addCharbon = (newCharbon: Charbon) =>
        setCharbons([...charbons, newCharbon]);
    const updateCharbon = (updatedCharbon: Charbon) =>
        setCharbons(
            charbons.map((c) =>
                c.id === updatedCharbon.id ? updatedCharbon : c
            )
        );
    const removeCharbon = (id: number) =>
        setCharbons(charbons.filter((c) => c.id !== id));

    return (
        <CharbonContext.Provider
            value={{ charbons, addCharbon, updateCharbon, removeCharbon }}
        >
            {children}
        </CharbonContext.Provider>
    );
};

export default CharbonProvider;

export const useCharbonContext = () => {
    const context = useContext(CharbonContext);
    if (context === null) {
        throw new Error("useCharbons must be used within a CharbonProvider");
    }
    return context;
};
