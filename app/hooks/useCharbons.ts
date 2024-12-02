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
    getCharbonByIdAction,
    updateCharbonAction,
} from "@lib/actions";

export const useCharbonsQuery = () => {
    const { charbons } = useCharbonContext();
    return [charbons];
};

//TODO: refactor pour éviter la confusion avec l'action réservée aux actionneurs
export const useCharbonByIdQuery = (id: number, useCache: boolean = true) => {
    const { charbons } = useCharbonContext();
    const [data, setData] = useState<Charbon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (useCache) {
                    const charbon = charbons.find((c) => c.id === id);
                    if (charbon) {
                        setData(charbon);
                    }
                }
                const charbon = await getCharbonByIdAction(id); //Réservé aux actionneurs
                setData(charbon ?? null);
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, charbons, useCache]);

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
