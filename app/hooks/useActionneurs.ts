import { useState } from "react";
import { useActionneursContext } from "../context/ActionneursContext";
import {
    createActionneurService,
    deleteActionneurService,
} from "@lib/services/actionneurService";
import { ActionneurCreateInput } from "@lib/models/actionneur";

export const useGetActionneurs = () => {
    const { getActionneurs } = useActionneursContext();
    return getActionneurs;
};

export const useGetActionneurById = () => {
    const { getActionneurs } = useActionneursContext();
    const getActionneurById = (id: number) =>
        getActionneurs().find((c) => c.id === id);
    return getActionneurById;
};

export const useCreateActionneur = () => {
    const { addActionneur } = useActionneursContext();

    const [loading, setLoading] = useState(false);
    const createActionneur = async (newActionneur: ActionneurCreateInput) => {
        setLoading(true);
        const actionneur = await createActionneurService(newActionneur);
        addActionneur(actionneur);
        setLoading(false);
    };

    return { createActionneur, loading };
};

export const useDeleteActionneur = () => {
    const { removeActionneur } = useActionneursContext();

    const [loading, setLoading] = useState(false);
    const deleteActionneur = async (id: number) => {
        setLoading(true);
        await deleteActionneurService(id);
        removeActionneur(id);
        setLoading(false);
    };

    return { deleteActionneur, loading };
};
