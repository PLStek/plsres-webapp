"use server";

import {
    deleteActionneur,
    getActionneurs,
    postActionneur,
    putActionneur,
} from "../data/actionneurData";
import {
    Actionneur,
    ActionneurCreateInput,
    ActionneurUpdateInput,
} from "../models/actionneur";

export const getActionneursService = async (): Promise<Actionneur[]> => {
    return getActionneurs();
};

export const getActionneurByIdService = async (
    id: number
): Promise<Actionneur | undefined> => {
    const actionneurs = await getActionneursService();
    return actionneurs.find((actionneur) => (actionneur.id = id));
};

export const getActionneurByDiscordIdService = async (
    discordId: string
): Promise<Actionneur | undefined> => {
    const actionneurs = await getActionneursService();
    return actionneurs.find((actionneur) => (actionneur.discordId = discordId));
};

//TODO: Implement
export const getCurrentActionneurService = async (): Promise<Actionneur> => {
    return getActionneursService().then((actionneurs) => actionneurs[0]);
};

export const createActionneurService = async (data: ActionneurCreateInput) => {
    return postActionneur(data);
};

export const updateActionneurService = async (
    id: number,
    data: ActionneurUpdateInput
) => {
    return putActionneur(id, data);
};

export const deleteActionneurService = async (id: number) => {
    return deleteActionneur(id);
};
