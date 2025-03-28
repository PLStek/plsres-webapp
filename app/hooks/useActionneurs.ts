import { useActionneurContext } from "@app/context/ActionneurContext";
import {
    createActionneurAction,
    updateActionneurAction,
    refreshAuthAction,
} from "@lib/actions";
import { ActionneurCreateInput } from "@lib/models/actionneur";

import { useEffect } from "react";
import { Actionneur } from "@lib/models/actionneur";
import { useMutationState, useQueryState } from "./useQueryState";

export const useActionneursQuery = () => {
    const { actionneurs } = useActionneurContext();
    //TODO: add option to not use cache
    return { data: actionneurs };
};

export const useActionneursByIdsQuery = (ids: number[]) => {
    const { actionneurs } = useActionneurContext();
    const { state, setResult } = useQueryState<Actionneur[]>({
        loading: true,
    });

    useEffect(() => {
        if (!ids.length) {
            setResult({ data: [], error: null });
            return;
        }
        const result = actionneurs.filter((c) => ids.includes(c.id));
        setResult({ data: result, error: null });
    }, [ids, actionneurs, setResult]);

    return state;
};

export const useCreateActionneurMutation = () => {
    const { addActionneur } = useActionneurContext();

    const mutate = async (newActionneur: ActionneurCreateInput) => {
        const { data: actionneur, error } = await createActionneurAction(
            newActionneur
        );
        if (!actionneur) {
            return { error };
        }
        const { error: refreshError } = await refreshAuthAction(actionneur.id);
        addActionneur(actionneur);
        return { data: actionneur, error: refreshError };
    };

    const result = useMutationState<Actionneur>({ mutation: mutate });

    return result;
};

export const useUpdateActionneurMutation = () => {
    const { updateActionneur } = useActionneurContext();

    const mutation = async (
        id: number,
        updatedActionneur: Partial<Actionneur>
    ) => {
        const result = await updateActionneurAction(id, updatedActionneur);
        if (result.data) {
            updateActionneur(id, result.data);
        }
        return result;
    };

    const result = useMutationState<Actionneur>({ mutation });

    return result;
};
