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

export const getActionneursFromIdsService = async (
    ids: number[]
): Promise<Actionneur[]> => {
    const actionneurs = await getActionneursService();
    const idsSet = new Set(ids);
    return actionneurs.filter((actionneur) => idsSet.has(actionneur.id));
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
