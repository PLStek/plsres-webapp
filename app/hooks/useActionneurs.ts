import { ActionneursContext } from "@app/context/ActionneursContext";
import { useContext, useState } from "react";
import { createActionneurAction, deleteActionneurAction } from "@lib/actions";
import { ActionneurCreateInput } from "@lib/models/actionneur";

export const useActionneurs = () => {
    const context = useContext(ActionneursContext);

    if (!context) {
        throw new Error(
            "useActionneurs must be used within an ActionneursProvider"
        );
    }

    const { actionneurs, addActionneur, removeActionneur } = context;

    const [loading, setLoading] = useState({
        create: false,
        delete: false,
    });

    const fetchActionneursByIds = (ids: number[]) =>
        actionneurs.filter((c) => ids.includes(c.id)); //TODO: enlever fonction

    const createActionneur = async (newActionneur: ActionneurCreateInput) => {
        setLoading((prev) => ({ ...prev, create: true }));
        const actionneur = await createActionneurAction(newActionneur);
        addActionneur(actionneur);
        setLoading((prev) => ({ ...prev, create: false }));
    };

    const deleteActionneur = async (id: number) => {
        setLoading((prev) => ({ ...prev, delete: true }));
        await deleteActionneurAction(id);
        removeActionneur(id);
        setLoading((prev) => ({ ...prev, delete: false }));
    };

    return {
        actionneurs,
        fetchActionneursByIds,
        createActionneur,
        deleteActionneur,
        loading,
    };
};
