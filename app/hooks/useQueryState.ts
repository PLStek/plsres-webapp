import { addToast } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";

type Result<T> = {
    data: T | null;
    error: string | null;
};

type QueryState<T> = Result<T> & {
    loading: boolean;
};

type QueryProps<T> = {
    data?: T | null;
    loading?: boolean;
};

export const useQueryState = <T>({
    data = null,
    loading = false,
}: QueryProps<T>) => {
    const [state, setState] = useState<QueryState<T>>({
        data,
        loading,
        error: null,
    });

    useEffect(() => {
        if (state.error) {
            addToast({
                title: state.error,
                color: "danger",
            });
        }
    }, [state]);

    const setResult = useCallback((result: Result<T>) => {
        setState({ ...result, loading: false });
    }, []);

    const makeLoading = useCallback(() => {
        setState((prev) => ({ ...prev, loading: true }));
    }, []);

    return {
        state,
        setResult,
        makeLoading,
    };
};

type MutationProps<T, Args extends unknown[]> = {
    mutation: (...args: Args) => Promise<Partial<Result<T>> | void>;
};

type MutationState = {
    loading: boolean;
    error: string | null;
};

export const useMutationState = <T, Args extends unknown[]>({
    mutation,
}: MutationProps<T, Args>) => {
    const [state, setState] = useState<MutationState>({
        loading: false,
        error: null,
    });

    // Ici, args sera de type Args, déduit depuis la fonction mutation passée en paramètre
    const mutate = async (...args: Args): Promise<T | null> => {
        setState({ loading: true, error: null });

        const result = await mutation(...args);
        const error = result?.error ?? null;
        setState({ loading: false, error });
        if (error) {
            addToast({
                title: error,
                color: "danger",
            });
        }

        return result?.data ?? null;
    };

    return { mutate, ...state };
};
