import { useCallback, useEffect } from "react";
import { useCharbonContext } from "@app/context/CharbonContext";
import { Charbon, CharbonUpdateInput, FullCharbon } from "@lib/models/charbon";
import {
    deleteCharbonAction,
    getFullCharbonByIdAction,
    updateCharbonAction,
} from "@lib/actions";
import { useCourseContext } from "@app/context/CourseContext";
import Fuse from "fuse.js";
import { useMutationState, useQueryState } from "./useQueryState";

export const useCharbonMonthKeysQuery = () => {
    const { charbons } = useCharbonContext();
    return {
        data: Object.keys(charbons).filter((key) => charbons[key].length > 0),
    };
};

//TODO: add option to not use cache
export const useCharbonsByMonthQuery = (monthKey: string) => {
    const { charbons, filters } = useCharbonContext();
    const { courses } = useCourseContext();

    //TODO: useeffect ?
    const preFilteredCharbons = charbons[monthKey].filter((charbon) => {
        if (filters.courseId && charbon.courseId !== filters.courseId) {
            return false;
        }

        if (!filters.courseId && filters.category) {
            const course = courses.find(
                (course) => course.id === charbon.courseId
            );
            if (!course || course.category !== filters.category) {
                return false;
            }
        }

        if (filters.hasReplay && !charbon.hasReplay) {
            return false;
        }

        if (filters.hasResources && charbon.resourcesCount === 0) {
            return false;
        }

        return true;
    });

    if (!filters.search) {
        return { data: preFilteredCharbons };
    }

    //TODO: look at fuse configs
    const fuse = new Fuse(preFilteredCharbons, {
        keys: ["title", "description"],
        threshold: 0.3,
    });

    const filteredCharbons = fuse
        .search(filters.search)
        .map((result) => result.item);

    return { data: filteredCharbons };
};

export const useFullCharbonByIdQuery = (id: number | null) => {
    const { state, setResult } = useQueryState<FullCharbon>({
        loading: true,
    });

    const fetchData = useCallback(async () => {
        if (!id) {
            setResult({ data: null, error: null });
            return;
        }
        const result = await getFullCharbonByIdAction(id); //TODO: attention: réservé aux actionneurs => faire un check
        setResult(result);
    }, [id, setResult]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return state;
};

export const useUpdateCharbonMutation = () => {
    const { updateCharbon } = useCharbonContext();

    const mutation = async (id: number, newCharbon: CharbonUpdateInput) => {
        const result = await updateCharbonAction(id, newCharbon);
        if (result.data) {
            updateCharbon(result.data); //TODO: est-ce que ça va marcher si la date change ?
        }
        return result;
    };

    const result = useMutationState<Charbon>({ mutation });

    return result;
};

export const useDeleteCharbonMutation = () => {
    const { removeCharbon } = useCharbonContext();

    const mutate = async (id: number) => {
        const result = await deleteCharbonAction(id);
        removeCharbon(id); //TODO: voir si on update quand même si erreur
        return result;
    };

    const result = useMutationState<Charbon>({ mutation: mutate });

    return result;
};

export const useCharbonFilters = () => {
    const { filters, setFilters } = useCharbonContext();
    return { filters, setFilters };
};
