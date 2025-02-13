import { randomUUID } from "crypto";
import {
    deleteInvitation,
    getInvitation,
    postInvitation,
} from "@lib/data/invitation";
import { decodeToken } from "@lib/utils/token";
import { getCookie } from "@lib/utils/cookies";
import { verifyDiscordUserIdService } from "./discord/verifyDiscordUserId";
import { ErrorMessages } from "@lib/utils/errorMessages";

const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL;

export const generateActionneurInvitationLink = async (
    discordId: string
): Promise<string> => {
    await verifyDiscordUserIdService(discordId);
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 3600 * 1000);
    postInvitation({ token, discordId, expiresAt }); //TODO: throw error OR override if already exists
    return `${WEBAPP_URL}?invitation=${token}`;
};

export const checkActionneurInvitationToken = async (
    invitationToken: string
) => {
    const token = await getCookie("user_token");
    if (!token) {
        throw new Error(ErrorMessages.NotConnected);
    }
    const { discordId } = decodeToken(token);
    const invitation = await getInvitation(invitationToken);
    if (!invitation || invitation.discordId !== discordId) {
        throw new Error(ErrorMessages.InvalidInvitation);
    }

    if (invitation.expiresAt < new Date()) {
        deleteInvitation(invitation.id);
        throw new Error(ErrorMessages.ExpiredInvitation);
    }
    return invitation;
};
