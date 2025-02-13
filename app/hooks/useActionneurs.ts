import { useActionneurContext } from "@app/context/ActionneurContext";
import {
    createActionneurAction,
    deleteActionneurAction,
    refreshAuthAction,
} from "@lib/actions";
import { ActionneurCreateInput } from "@lib/models/actionneur";

import { useState, useEffect } from "react";
import { Actionneur } from "@lib/models/actionneur";

export const useActionneursQuery = () => {
    const { actionneurs } = useActionneurContext();
    //TODO: add option to not use cache
    return [actionneurs];
};

export const useActionneursByIdsQuery = (ids: number[]) => {
    const { actionneurs } = useActionneurContext();
    const [data, setData] = useState<Actionneur[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!ids.length) {
            setData([]);
            setError(null);
            setLoading(false);
            return;
        }
        const result = actionneurs.filter((c) => ids.includes(c.id));
        setData(result); //TODO: fetch data from server if some ids are not in the context & do the same for other hooks
        setError(null);
        setLoading(false);
    }, [ids, actionneurs]);

    return [data, loading, error] as const;
};

export const useCreateActionneurMutation = () => {
    const { addActionneur } = useActionneurContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (newActionneur: ActionneurCreateInput) => {
        setLoading(true);
        const { data: actionneur, error: createActionneurError } =
            await createActionneurAction(newActionneur);
        if (!actionneur) {
            setError(createActionneurError);
            setLoading(false);
            return;
        }
        const { error: refreshAuthErorr } = await refreshAuthAction(
            actionneur.id
        );
        addActionneur(actionneur);
        setError(refreshAuthErorr);
        setLoading(false);
    };

    return [mutate, loading, error] as const;
};

export const useDeleteActionneurMutation = () => {
    const { removeActionneur } = useActionneurContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (id: number) => {
        setLoading(true);
        const { error } = await deleteActionneurAction(id);
        removeActionneur(id);
        setError(error);
        setLoading(false);
    };

    return [mutate, loading, error] as const;
};
