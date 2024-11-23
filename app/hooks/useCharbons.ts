import { useContext, useState } from "react";
import { CharbonsContext } from "@app/context/CharbonsContext";
import { Charbon, CharbonCreateInput } from "@lib/models/charbon";
import {
    createCharbonAction,
    deleteCharbonAction,
    getCharbonByIdAction,
} from "@lib/actions";

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

    const fetchCharbonById = async (
        id: number,
        useCache: boolean = true
    ): Promise<Charbon | undefined> => {
        if (useCache) {
            const charbon = charbons.find((c) => c.id === id);
            if (charbon) {
                return charbon;
            }
        }
        return getCharbonByIdAction(id);
    };

    const createCharbon = async (newCharbon: CharbonCreateInput) => {
        setLoading((prev) => ({ ...prev, create: true }));
        const charbon = await createCharbonAction(newCharbon);
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
