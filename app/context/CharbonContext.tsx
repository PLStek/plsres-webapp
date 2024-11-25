"use client";

import { Charbon } from "@lib/models/charbon";
import { createContext, ReactNode, useContext, useState } from "react";

type CharbonContextType = {
    charbons: Charbon[];
    addCharbon: (newCharbon: Charbon) => void;
    removeCharbon: (id: number) => void;
};

export const CharbonContext = createContext<CharbonContextType | undefined>(
    undefined
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
    const removeCharbon = (id: number) =>
        setCharbons(charbons.filter((c) => c.id !== id));

    return (
        <CharbonContext.Provider
            value={{ charbons, addCharbon, removeCharbon }}
        >
            {children}
        </CharbonContext.Provider>
    );
};

export default CharbonProvider;

export const useCharbonContext = () => {
    const context = useContext(CharbonContext);
    if (context === undefined) {
        throw new Error("useCharbons must be used within a CharbonProvider");
    }
    return context;
};
