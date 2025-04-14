import {
    createActionneurAction,
    updateActionneurAction,
    refreshAuthAction,
} from "@lib/actions";
import { ActionneurCreateInput } from "@lib/models/actionneur";

import { useEffect } from "react";
import { Actionneur } from "@lib/models/actionneur";
import { useMutationState, useQueryState } from "./useQueryState";
import { useAtom, useAtomValue } from "jotai";
import {
    actionneursAtom,
    addActionneurAtom,
    updateActionneurAtom,
} from "@app/atoms/actionneurAtoms";

export const useActionneursQuery = () => {
    const actionneurs = useAtomValue(actionneursAtom);
    //TODO: add option to not use cache
    return { data: actionneurs };
};

export const useActionneursByIdsQuery = (ids: number[]) => {
    const actionneurs = useAtomValue(actionneursAtom);
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
    const [, addActionneur] = useAtom(addActionneurAtom);

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

    const result = useMutationState({ mutation: mutate });

    return result;
};

export const useUpdateActionneurMutation = () => {
    const [, updateActionneur] = useAtom(updateActionneurAtom);

    const mutation = async (
        id: number,
        updatedActionneur: Partial<Actionneur>
    ) => {
        const result = await updateActionneurAction(id, updatedActionneur);
        if (result.data) {
            updateActionneur(result.data);
        }
        return result;
    };

    const result = useMutationState({ mutation });

    return result;
};
