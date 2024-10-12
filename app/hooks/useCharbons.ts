import { useCharbonsContext } from "../context/CharbonsContext";
import { Charbon, CharbonCreateInput } from "@/lib/models/charbon";
import {
    createCharbonService,
    deleteCharbonService,
} from "@/lib/services/charbonService";
import { useState } from "react";

export const useGetCharbons = () => {
    const { getCharbons } = useCharbonsContext();
    return getCharbons;
};

export const useGetCharbonById = () => {
    const { getCharbons } = useCharbonsContext();
    const getCharbonById = (id: number): Charbon | undefined =>
        getCharbons().find((c) => c.id === id);
    return getCharbonById;
};

export const useCreateCharbon = () => {
    const { addCharbon } = useCharbonsContext();

    const [loading, setLoading] = useState(false);
    const createCharbon = async (newCharbon: CharbonCreateInput) => {
        setLoading(true);
        const charbon = await createCharbonService(newCharbon);
        addCharbon(charbon);
        setLoading(false);
    };

    return { createCharbon, loading };
};

export const useDeleteCharbon = () => {
    const { removeCharbon } = useCharbonsContext();

    const [loading, setLoading] = useState(false);
    const deleteCharbon = async (id: number) => {
        setLoading(true);
        await deleteCharbonService(id);
        removeCharbon(id);
        setLoading(false);
    };

    return { deleteCharbon, loading };
};
