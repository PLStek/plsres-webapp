"use client";

import { AuthData } from "@lib/models/auth";
import { atom } from "jotai";

export const authAtom = atom<AuthData>({
    isVerified: false,
    actionneurId: null,
    isActionneurAuthentified: false,
    isAdmin: false,
    discordId: null,
    exp: Date.now(),
});
