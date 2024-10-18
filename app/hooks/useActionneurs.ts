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

export const useGetActionneursByIds = () => {
    const { getActionneurs } = useActionneursContext();
    const getActionneursByIds = (ids: number[]) =>
        getActionneurs().filter((c) => ids.includes(c.id));
    return getActionneursByIds;
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
