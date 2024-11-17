import { useContext, useState } from "react";
import { CharbonsContext } from "@app/context/CharbonsContext";
import { Charbon, CharbonCreateInput } from "@lib/models/charbon";
import { createCharbonAction, deleteCharbonAction } from "@lib/actions";

export const useCharbons = () => {
    const context = useContext(CharbonsContext);
    if (!context) {
        throw new Error("useCharbons must be used within a CharbonsProvider");
    }

    const { charbons, addCharbon, removeCharbon } = context;

    const [loading, setLoading] = useState({
        create: false,
        delete: false,
    });

    const fetchCharbonById = (id: number): Charbon | undefined =>
        charbons.find((c) => c.id === id);

    const createCharbon = async (newCharbon: CharbonCreateInput) => {
        setLoading((prev) => ({ ...prev, create: true }));
        const { resources, ...charbon } = await createCharbonAction(newCharbon);
        addCharbon(charbon);
        setLoading((prev) => ({ ...prev, create: false }));
    };

    const deleteCharbon = async (id: number) => {
        setLoading((prev) => ({ ...prev, delete: true }));
        await deleteCharbonAction(id);
        removeCharbon(id);
        setLoading((prev) => ({ ...prev, delete: false }));
    };

    return {
        charbons,
        fetchCharbonById,
        createCharbon,
        deleteCharbon,
        loading,
    };
};
