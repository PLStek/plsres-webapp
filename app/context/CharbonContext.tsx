"use client";

import { Charbon, CharbonFilters } from "@lib/models/charbon";
import { createContext, ReactNode, useContext, useState } from "react";

type CharbonContextType = {
    charbons: Record<string, Charbon[]>;
    charbonFilters: CharbonFilters;
    addCharbon: (newCharbon: Charbon) => void;
    updateCharbon: (updatedCharbon: Charbon) => void;
    removeCharbon: (id: number) => void;
    setCharbonFilters: (filters: CharbonFilters) => void;
};

export const CharbonContext = createContext<CharbonContextType | null>(null);

const CharbonProvider = ({
    initialCharbons,
    children,
}: {
    initialCharbons?: Record<string, Charbon[]>;
    children: ReactNode;
}) => {
    const [charbons, setCharbons] = useState(initialCharbons || {});
    const [charbonFilters, setCharbonFilters] = useState<CharbonFilters>({
        search: "",
        category: "",
        course: "",
        level: "",
        year: "",
        month: "",
        hasReplay: false,
        hasResources: false,
    });

    const addCharbon = (newCharbon: Charbon) => {
        const key = newCharbon.timestamp.toISOString().slice(0, 7);
        setCharbons((prev) => ({
            ...prev,
            [key]: [...(prev[key] || []), newCharbon],
        }));
    };

    const updateCharbon = (updatedCharbon: Charbon) => {
        const key = updatedCharbon.timestamp.toISOString().slice(0, 7);
        setCharbons((prev) => ({
            ...prev,
            [key]: prev[key].map((charbon) =>
                charbon.id === updatedCharbon.id ? updatedCharbon : charbon
            ),
        }));
    };

    const removeCharbon = (id: number) => {
        setCharbons((prev) => {
            const key = Object.keys(prev).find((key) =>
                prev[key].some((charbon) => charbon.id === id)
            );
            if (!key) {
                return prev;
            }
            return {
                ...prev,
                [key]: prev[key].filter((charbon) => charbon.id !== id),
            };
        });
    };

    return (
        <CharbonContext.Provider
            value={{
                charbons,
                charbonFilters,
                addCharbon,
                updateCharbon,
                removeCharbon,
                setCharbonFilters,
            }}
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
