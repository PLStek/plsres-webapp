import { useCallback, useEffect } from "react";
import { CharbonUpdateInput, FullCharbon } from "@lib/models/charbon";
import {
    deleteCharbonAction,
    getFullCharbonByIdAction,
    updateCharbonAction,
} from "@lib/actions";
import Fuse from "fuse.js";
import { useMutationState, useQueryState } from "./useQueryState";
import { useAtom, useAtomValue } from "jotai";
import {
    addFullCharbonAtom,
    charbonsAtom,
    filtersAtom,
    fullCharbonsAtom,
    removeCharbonAtom,
    updateCharbonAtom,
    updateFullCharbonAtom,
} from "@app/atoms/charbonAtoms";
import { coursesAtom } from "@app/atoms/courseAtoms";

export const useCharbonMonthKeysQuery = () => {
    const charbons = useAtomValue(charbonsAtom);
    return {
        data: Object.keys(charbons).filter((key) => charbons[key].length > 0),
    };
};

//TODO: add option to not use cache
export const useCharbonsByMonthQuery = (monthKey: string) => {
    const charbons = useAtomValue(charbonsAtom);
    const filters = useAtomValue(filtersAtom);
    const courses = useAtomValue(coursesAtom);

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
    const fullCharbons = useAtomValue(fullCharbonsAtom);
    const [, addFullCharbon] = useAtom(addFullCharbonAtom);
    const { state, setResult } = useQueryState<FullCharbon>({
        loading: true,
    });

    const fetchData = useCallback(async () => {
        if (!id) {
            setResult({ data: null, error: null });
            return;
        }
        if (fullCharbons[id]) {
            setResult({ data: fullCharbons[id], error: null });
            return;
        }
        const result = await getFullCharbonByIdAction(id); //TODO: attention: réservé aux actionneurs => faire un check
        if (result.data) {
            addFullCharbon(result.data);
        }
        setResult(result);
    }, [id, setResult, fullCharbons, addFullCharbon]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return state;
};

export const useUpdateCharbonMutation = () => {
    const [, updateCharbon] = useAtom(updateCharbonAtom);
    const [, updateFullCharbon] = useAtom(updateFullCharbonAtom);

    const mutation = async (id: number, newCharbon: CharbonUpdateInput) => {
        const result = await updateCharbonAction(id, newCharbon);
        if (result.data) {
            updateCharbon(result.data); //TODO: est-ce que ça va marcher si la date change ?
            updateFullCharbon(result.data);
        }
        return result;
    };

    const result = useMutationState({ mutation });

    return result;
};

export const useDeleteCharbonMutation = () => {
    const [, removeCharbon] = useAtom(removeCharbonAtom);

    const mutate = async (id: number) => {
        const result = await deleteCharbonAction(id);
        removeCharbon(id); //TODO: voir si on update quand même si erreur
        return result;
    };

    const result = useMutationState({ mutation: mutate });

    return result;
};

export const useCharbonFilters = () => {
    const [filters, setFilters] = useAtom(filtersAtom);
    return { filters, setFilters };
};
