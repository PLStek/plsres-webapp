"use client";

import { Charbon } from "@/lib/models/charbon";
import { createContext, ReactNode, useContext, useState } from "react";

type CharbonsContextType = {
    getCharbons: () => Charbon[];
    addCharbon: (newCharbon: Charbon) => void;
    removeCharbon: (id: number) => void;
};

const CharbonsContext = createContext<CharbonsContextType | undefined>(
    undefined
);

const CharbonsProvider = ({
    initialCharbons,
    children,
}: {
    initialCharbons: Charbon[];
    children: ReactNode;
}) => {
    const [charbons, setCharbons] = useState(initialCharbons || []);

    const getCharbons = () => charbons;
    const addCharbon = (newCharbon: Charbon) =>
        setCharbons([...charbons, newCharbon]);
    const removeCharbon = (id: number) =>
        setCharbons(charbons.filter((c) => c.id !== id));

    return (
        <CharbonsContext.Provider
            value={{ getCharbons, addCharbon, removeCharbon }}
        >
            {children}
        </CharbonsContext.Provider>
    );
};

export default CharbonsProvider;

export const useCharbonsContext = () => {
    const context = useContext(CharbonsContext);
    if (context === undefined) {
        throw new Error("useCharbons must be used within a CharbonsProvider");
    }
    return context;
};
