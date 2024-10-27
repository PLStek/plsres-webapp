"use client";

import { Charbon } from "@lib/models/charbon";
import { createContext, ReactNode, useState } from "react";

type CharbonsContextType = {
    charbons: Charbon[];
    addCharbon: (newCharbon: Charbon) => void;
    removeCharbon: (id: number) => void;
};

export const CharbonsContext = createContext<CharbonsContextType | undefined>(
    undefined,
);

const CharbonsProvider = ({
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
        <CharbonsContext.Provider
            value={{ charbons, addCharbon, removeCharbon }}
        >
            {children}
        </CharbonsContext.Provider>
    );
};

export default CharbonsProvider;
