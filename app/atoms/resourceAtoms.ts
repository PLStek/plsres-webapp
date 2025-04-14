"use client";

import { Resource } from "@lib/models/resource";
import { atom } from "jotai";

export const resourcesAtom = atom<Record<number, Resource[]>>([]);

export const addResourceAtom = atom(null, (get, set, newResource: Resource) => {
    const resources = get(resourcesAtom);
    const key = newResource.charbonId;
    set(resourcesAtom, {
        ...resources,
        [key]: [...(resources[key] || []), newResource],
    });
});

export const setCharbonResourcesAtom = atom(
    null,
    (get, set, charbonId: number, resources: Resource[]) => {
        const existingResources = get(resourcesAtom);
        set(resourcesAtom, {
            ...existingResources,
            [charbonId]: resources,
        });
    }
);

export const removeCharbonResourcesAtom = atom(
    null,
    (get, set, charbonId: number) => {
        const resources = get(resourcesAtom);
        const newResources = { ...resources };
        delete newResources[charbonId];
        set(resourcesAtom, newResources);
    }
);