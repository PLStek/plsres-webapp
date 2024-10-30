"use server";

import { hashSecret } from "@lib/utils/encryption";
import {
    deleteActionneur,
    getActionneurs,
    postActionneur,
    putActionneur,
} from "../data/actionneur";
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

//TODO: Implement
export const getCurrentActionneurService = async (): Promise<Actionneur> => {
    return getActionneursService().then((actionneurs) => actionneurs[0]);
};

export const createActionneurService = async ({
    secret,
    ...data
}: ActionneurCreateInput) => {
    const secretHash = await hashSecret(secret);
    return postActionneur({ ...data, secretHash });
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
