import { useCharbonsContext } from "../context/CharbonsContext";
import { Charbon, CharbonCreateInput } from "@/lib/models/charbon";
import {
    createCharbonService,
    deleteCharbonService,
} from "@/lib/services/charbonService";
import { useState } from "react";

export function useGetCharbons() {
    const { getCharbons } = useCharbonsContext();
    return getCharbons;
}

export function useGetCharbonById() {
    const { getCharbons } = useCharbonsContext();
    const getCharbonById = (id: number): Charbon | undefined =>
        getCharbons().find((c) => c.id === id);
    return getCharbonById;
}

export function useCreateCharbon() {
    const { addCharbon } = useCharbonsContext();

    const [loading, setLoading] = useState(false);
    const createCharbon = async (newCharbon: CharbonCreateInput) => {
        setLoading(true);
        const charbon = await createCharbonService(newCharbon);
        addCharbon(charbon);
        setLoading(false);
    };

    return { createCharbon, loading };
}

export function useDeleteCharbon() {
    const { removeCharbon } = useCharbonsContext();

    const [loading, setLoading] = useState(false);
    const deleteCharbon = async (id: number) => {
        setLoading(true);
        await deleteCharbonService(id);
        removeCharbon(id);
        setLoading(false);
    };

    return { deleteCharbon, loading };
}
