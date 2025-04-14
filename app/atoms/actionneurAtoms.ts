"use client";

import { Actionneur } from "@lib/models/actionneur";
import { atom } from "jotai";

export const actionneursAtom = atom<Actionneur[]>([]);

export const addActionneurAtom = atom(
    null,
    (get, set, newActionneur: Actionneur) => {
        const actionneurs = get(actionneursAtom);
        set(actionneursAtom, [...actionneurs, newActionneur]);
    }
);

export const updateActionneurAtom = atom(
    null,
    (get, set, updatedActionneur: Actionneur) => {
        const actionneurs = get(actionneursAtom);
        set(
            actionneursAtom,
            actionneurs.map((actionneur) =>
                actionneur.id === updatedActionneur.id
                    ? { ...actionneur, ...updatedActionneur }
                    : actionneur
            )
        );
    }
);

export const removeActionneurAtom = atom(null, (get, set, id: number) => {
    const actionneurs = get(actionneursAtom);
    set(
        actionneursAtom,
        actionneurs.filter((actionneur) => actionneur.id !== id)
    );
});
