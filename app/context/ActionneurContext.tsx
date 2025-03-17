"use client";

import { Actionneur } from "@lib/models/actionneur";
import { createContext, ReactNode, useContext, useState } from "react";

//TODO: make a map instead
type ActionneurContextType = {
    actionneurs: Actionneur[];
    addActionneur: (newActionneur: Actionneur) => void;
    updateActionneur: (id: number, updatedActionneur: Actionneur) => void;
    removeActionneur: (id: number) => void;
};

export const ActionneurContext = createContext<ActionneurContextType | null>(
    null
);

const ActionneurProvider = ({
    initialActionneurs,
    children,
}: {
    initialActionneurs?: Actionneur[];
    children: ReactNode;
}) => {
    const [actionneurs, setActionneurs] = useState(initialActionneurs ?? []);

    const addActionneur = (newActionneur: Actionneur) =>
        setActionneurs([...actionneurs, newActionneur]);
    const updateActionneur = (id: number, updatedActionneur: Actionneur) =>
        setActionneurs(
            actionneurs.map((c) =>
                c.id === id ? { ...c, ...updatedActionneur } : c
            )
        );
    const removeActionneur = (id: number) =>
        setActionneurs(actionneurs.filter((c) => c.id !== id));

    return (
        <ActionneurContext.Provider
            value={{
                actionneurs,
                addActionneur,
                updateActionneur,
                removeActionneur,
            }}
        >
            {children}
        </ActionneurContext.Provider>
    );
};

export default ActionneurProvider;

export const useActionneurContext = () => {
    const context = useContext(ActionneurContext);
    if (context === null) {
        throw new Error(
            "useActionneurs must be used within a ActionneurProvider"
        );
    }
    return context;
};
