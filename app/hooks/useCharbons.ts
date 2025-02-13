import { useCallback, useEffect, useState } from "react";
import { useCharbonContext } from "@app/context/CharbonContext";
import { CharbonUpdateInput, FullCharbon } from "@lib/models/charbon";
import {
    deleteCharbonAction,
    getFullCharbonByIdAction,
    updateCharbonAction,
} from "@lib/actions";
import { useCourseContext } from "@app/context/CourseContext";
import Fuse from "fuse.js";

export const useCharbonMonthKeysQuery = () => {
    const { charbons } = useCharbonContext();
    return [Object.keys(charbons).filter((key) => charbons[key].length > 0)];
};

//TODO: add option to not use cache
export const useCharbonsByMonthQuery = (monthKey: string) => {
    const { charbons, charbonFilters } = useCharbonContext();
    const { courses } = useCourseContext();

    //TODO: useeffect ?
    const preFilteredCharbons = charbons[monthKey].filter((charbon) => {
        if (
            charbonFilters.courseId &&
            charbon.courseId !== charbonFilters.courseId
        ) {
            return false;
        }

        if (!charbonFilters.courseId && charbonFilters.category) {
            const course = courses.find(
                (course) => course.id === charbon.courseId
            );
            if (!course || course.category !== charbonFilters.category) {
                return false;
            }
        }

        if (charbonFilters.hasReplay && !charbon.hasReplay) {
            return false;
        }

        if (charbonFilters.hasResources && charbon.resourcesCount === 0) {
            return false;
        }

        return true;
    });

    if (!charbonFilters.search) {
        return [preFilteredCharbons] as const;
    }

    //TODO: look at fuse configs
    const fuse = new Fuse(preFilteredCharbons, {
        keys: ["title", "description"],
        threshold: 0.3,
    });

    const filteredCharbons = fuse
        .search(charbonFilters.search)
        .map((result) => result.item);

    return [filteredCharbons] as const;
};

export const useFullCharbonByIdQuery = (id: number | null) => {
    const [state, setState] = useState({
        data: null as FullCharbon | null,
        loading: true,
        error: null as string | null,
    }); //TODO: appliquer ailleurs aussi pour safety ?

    const fetchData = useCallback(async () => {
        setState({ data: null, loading: true, error: null });
        if (!id) {
            setState({ data: null, loading: false, error: null });
            return;
        }
        const { data: charbon, error } = await getFullCharbonByIdAction(id); //TODO: attention: réservé aux actionneurs => faire un check
        setState({ data: charbon ?? null, loading: false, error });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [state.data, state.loading, state.error] as const;
};

/* export const useCreateCharbonMutation = () => {
    const { addCharbon } = useCharbonContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
 */

export const useUpdateCharbonMutation = () => {
    const { updateCharbon } = useCharbonContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (id: number, newCharbon: CharbonUpdateInput) => {
        setLoading(true);
        const { data: charbon, error } = await updateCharbonAction(
            id,
            newCharbon
        );
        if (charbon) {
            updateCharbon(charbon); //TODO: est-ce que ça va marcher si la date change ?
        }
        setError(error);
        setLoading(false);
    };

    return [mutate, loading, error] as const;
};

export const useDeleteCharbonMutation = () => {
    const { removeCharbon } = useCharbonContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (id: number) => {
        setLoading(true);
        const { error } = await deleteCharbonAction(id);
        removeCharbon(id); //TODO: voir si on update quand même si erreur
        setError(error);
        setLoading(false);
    };

    return [mutate, loading, error] as const;
};

export const useCharbonFilters = () => {
    const { charbonFilters, setCharbonFilters } = useCharbonContext();
    return [charbonFilters, setCharbonFilters] as const;
};
