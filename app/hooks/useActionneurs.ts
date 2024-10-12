import { useState } from "react";
import { useActionneursContext } from "../context/ActionneursContext";
import {
    createActionneurService,
    deleteActionneurService,
} from "@/lib/services/actionneurService";
import { ActionneurCreateInput } from "@/lib/models/actionneur";

export function useGetActionneurs() {
    const { getActionneurs } = useActionneursContext();
    return getActionneurs;
}

export function useGetActionneurById() {
    const { getActionneurs } = useActionneursContext();
    const getActionneurById = (id: number) =>
        getActionneurs().find((c) => c.id === id);
    return getActionneurById;
}

export function useCreateActionneur() {
    const { addActionneur } = useActionneursContext();

    const [loading, setLoading] = useState(false);
    const createActionneur = async (newActionneur: ActionneurCreateInput) => {
        setLoading(true);
        const actionneur = await createActionneurService(newActionneur);
        addActionneur(actionneur);
        setLoading(false);
    };

    return { createActionneur, loading };
}

export function useDeleteActionneur() {
    const { removeActionneur } = useActionneursContext();

    const [loading, setLoading] = useState(false);
    const deleteActionneur = async (id: number) => {
        setLoading(true);
        await deleteActionneurService(id);
        removeActionneur(id);
        setLoading(false);
    };

    return { deleteActionneur, loading };
}
