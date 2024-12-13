import { randomUUID } from "crypto";
import {
    deleteInvitation,
    getInvitation,
    postInvitation,
} from "@lib/data/invitation";
import { decodeToken } from "@lib/utils/token";
import { getCookie } from "@lib/utils/cookies";

const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL;

export const generateActionneurInvitationLink = async (
    discordId: string
): Promise<string> => {
    if (!WEBAPP_URL) {
        throw new Error("Variables d'environnement manquantes");
    }
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 3600 * 1000);
    postInvitation({ token, discordId, expiresAt });
    return `${WEBAPP_URL}?invitation=${token}`;
};

export const checkActionneurInvitationToken = async (
    invitationToken: string
) => {
    const token = await getCookie("user_token");
    if (!token) {
        throw new Error("Couldn't find authentication token");
    }
    const { discordId } = decodeToken(token);
    const invitation = await getInvitation(invitationToken);
    if (!invitation || invitation.discordId !== discordId) {
        throw new Error("Invitation invalide");
    }

    if (invitation.expiresAt < new Date()) {
        deleteInvitation(invitation.id);
        throw new Error("Invitation expirée");
    }
    return invitation;
};
