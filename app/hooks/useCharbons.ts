import { useEffect, useState } from "react";
import { useCharbonContext } from "@app/context/CharbonContext";
import {
    Charbon,
    CharbonCreateInput,
    CharbonUpdateInput,
} from "@lib/models/charbon";
import {
    createCharbonAction,
    deleteCharbonAction,
    getCharbonByIdWithDraftAction,
    updateCharbonAction,
} from "@lib/actions";

export const useCharbonMonthKeysQuery = () => {
    const { charbons } = useCharbonContext();
    return [Object.keys(charbons).filter((key) => charbons[key].length > 0)];
};

//TODO: add option to not use cache
export const useCharbonsByMonthQuery = (monthKey: string) => {
    const { charbons } = useCharbonContext();
    return [charbons[monthKey]];
};

export const useCharbonByIdQuery = (id: number) => {
    const { charbons } = useCharbonContext();
    const [data, setData] = useState<Charbon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const charbon = await getCharbonByIdWithDraftAction(id); //TODO: attention: réservé aux actionneurs
                setData(charbon ?? null);
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, charbons]);

    return [data, loading, error] as const;
};

export const useCreateCharbonMutation = () => {
    const { addCharbon } = useCharbonContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (newCharbon: CharbonCreateInput) => {
        try {
            setLoading(true);
            const charbon = await createCharbonAction(newCharbon);
            addCharbon(charbon);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return [mutate, loading, error] as const;
};

export const useUpdateCharbonMutation = () => {
    const { updateCharbon } = useCharbonContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (id: number, newCharbon: CharbonUpdateInput) => {
        try {
            setLoading(true);
            const charbon = await updateCharbonAction(id, newCharbon);
            updateCharbon(charbon);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return [mutate, loading, error] as const;
};

export const useDeleteCharbonMutation = () => {
    const { removeCharbon } = useCharbonContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (id: number) => {
        try {
            setLoading(true);
            await deleteCharbonAction(id);
            removeCharbon(id);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return [mutate, loading, error] as const;
};
