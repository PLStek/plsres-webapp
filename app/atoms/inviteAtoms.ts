"use client";

import { atom } from "jotai";
import { Invite } from "@lib/models/actionneur";

export const invitesAtom = atom<Invite[]>([]);

export const addInviteAtom = atom(null, (get, set, newInvite: Invite) => {
    const invites = get(invitesAtom);
    set(invitesAtom, [...invites, newInvite]);
});

export const removeInviteAtom = atom(null, (get, set, id: number) => {
    const invites = get(invitesAtom);
    set(
        invitesAtom,
        invites.filter((invite) => invite.id !== id)
    );
});
