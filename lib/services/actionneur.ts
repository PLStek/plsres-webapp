import { hashSecret } from "@lib/utils/encryption";
import {
    deleteActionneur,
    getActionneurById,
    getActionneurs,
    postActionneur,
    putActionneur,
} from "../data/actionneur";
import {
    Actionneur,
    ActionneurCreateInput,
    ActionneurUpdateInput,
} from "../models/actionneur";
import { deleteInvite } from "@lib/data/invite";
import { checkActionneurInviteToken } from "./invite";

export const getActionneursService = async (): Promise<Actionneur[]> => {
    return getActionneurs();
};

export const getActionneurByIdService = async (
    id: number
): Promise<Actionneur | null> => {
    return getActionneurById(id);
};

//TODO: Implement
/* export const getCurrentActionneurService = async (): Promise<Actionneur> => {
    return getActionneursService().then((actionneurs) => actionneurs[0]);
}; */

export const createActionneurService = async ({
    inviteToken,
    username,
    secret,
}: ActionneurCreateInput) => {
    const { discordId, id: inviteId } = await checkActionneurInviteToken(
        inviteToken
    );
    const secretHash = await hashSecret(secret);
    const actionneur = await postActionneur({
        username,
        discordId,
        secretHash,
    });
    deleteInvite(inviteId);
    return actionneur;
};

export const updateActionneurService = async (
    id: number,
    data: ActionneurUpdateInput
): Promise<Actionneur> => {
    return putActionneur(id, data);
};

export const deleteActionneurService = async (
    id: number
): Promise<Actionneur> => {
    return deleteActionneur(id);
};
