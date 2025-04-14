"use client";

import { atom } from "jotai";
import { Charbon, CharbonFilters, FullCharbon } from "@lib/models/charbon";

export const charbonsAtom = atom<Record<string, Charbon[]>>({});

export const fullCharbonsAtom = atom<FullCharbon[]>([]);

export const filtersAtom = atom<CharbonFilters>({
    search: "",
    category: null,
    courseId: null,
    level: "",
    year: "",
    month: "",
    hasReplay: false,
    hasResources: false,
});

export const updateFiltersAtom = atom(
    null,
    (_get, set, newFilters: CharbonFilters) => {
        set(filtersAtom, newFilters);
    }
);

export const addCharbonAtom = atom(null, (get, set, newCharbon: Charbon) => {
    const charbons = get(charbonsAtom);
    const key = newCharbon.timestamp.toISOString().slice(0, 7);
    set(charbonsAtom, {
        ...charbons,
        [key]: [...(charbons[key] || []), newCharbon],
    });
});

export const updateCharbonAtom = atom(
    null,
    (get, set, updatedCharbon: Charbon) => {
        const charbons = get(charbonsAtom);
        const key = updatedCharbon.timestamp.toISOString().slice(0, 7);
        const existingCharbons = charbons[key] || [];
        const charbonExists = existingCharbons.some(
            (charbon) => charbon.id === updatedCharbon.id
        );
        set(charbonsAtom, {
            ...charbons,
            [key]: charbonExists
                ? existingCharbons.map((charbon) =>
                      charbon.id === updatedCharbon.id
                          ? updatedCharbon
                          : charbon
                  )
                : [...existingCharbons, updatedCharbon],
        });
    }
);

export const removeCharbonAtom = atom(null, (get, set, id: number) => {
    const charbons = get(charbonsAtom);
    const key = Object.keys(charbons).find((key) =>
        charbons[key].some((charbon) => charbon.id === id)
    );
    if (!key) return;
    set(charbonsAtom, {
        ...charbons,
        [key]: charbons[key].filter((charbon) => charbon.id !== id),
    });
});

export const addFullCharbonAtom = atom(
    null,
    (get, set, newCharbon: FullCharbon) => {
        const fullCharbons = get(fullCharbonsAtom);
        set(fullCharbonsAtom, [...fullCharbons, newCharbon]);
    }
);
export const updateFullCharbonAtom = atom(
    null,
    (get, set, updatedCharbon: FullCharbon) => {
        const fullCharbons = get(fullCharbonsAtom);
        const charbonExists = fullCharbons.some(
            (charbon) => charbon.id === updatedCharbon.id
        );
        set(
            fullCharbonsAtom,
            charbonExists
                ? fullCharbons.map((charbon) =>
                      charbon.id === updatedCharbon.id
                          ? updatedCharbon
                          : charbon
                  )
                : [...fullCharbons, updatedCharbon]
        );
    }
);

export const removeFullCharbonAtom = atom(null, (get, set, id: number) => {
    const fullCharbons = get(fullCharbonsAtom);
    set(
        fullCharbonsAtom,
        fullCharbons.filter((charbon) => charbon.id !== id)
    );
});
