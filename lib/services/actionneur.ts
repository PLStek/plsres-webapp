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
import { deleteInvitation } from "@lib/data/invitation";
import { checkActionneurInvitationToken } from "./invitation";

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
    invitationToken,
    username,
    secret,
}: ActionneurCreateInput) => {
    const { discordId, id: invitationId } =
        await checkActionneurInvitationToken(invitationToken);
    const secretHash = await hashSecret(secret);
    const actionneur = await postActionneur({
        username,
        discordId,
        secretHash,
    });
    deleteInvitation(invitationId);
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
