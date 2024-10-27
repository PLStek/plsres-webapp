"use client";

import { Actionneur } from "@lib/models/actionneur";
import { createContext, ReactNode, useState } from "react";

type ActionneursContextType = {
    actionneurs: Actionneur[];
    addActionneur: (newActionneur: Actionneur) => void;
    removeActionneur: (id: number) => void;
};

export const ActionneursContext = createContext<
    ActionneursContextType | undefined
>(undefined);

const ActionneursProvider = ({
    initialActionneurs,
    children,
}: {
    initialActionneurs?: Actionneur[];
    children: ReactNode;
}) => {
    const [actionneurs, setActionneurs] = useState(initialActionneurs ?? []);

    const addActionneur = (newActionneur: Actionneur) =>
        setActionneurs([...actionneurs, newActionneur]);
    const removeActionneur = (id: number) =>
        setActionneurs(actionneurs.filter((c) => c.id !== id));

    return (
        <ActionneursContext.Provider
            value={{
                actionneurs,
                addActionneur,
                removeActionneur,
            }}
        >
            {children}
        </ActionneursContext.Provider>
    );
};

export default ActionneursProvider;
