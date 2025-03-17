import { randomUUID } from "crypto";
import {
    deleteInvite,
    deleteInvites,
    getInviteByDiscordId,
    getInviteByToken,
    getInvites,
    postInvite,
} from "@lib/data/invite";
import { decodeToken } from "@lib/utils/token";
import { getCookie } from "@lib/utils/cookies";
import { verifyDiscordUserIdService } from "./discord/verifyDiscordUserId";
import { ErrorMessages } from "@lib/utils/errorMessages";
import { Invite as PrismaInvite } from "@prisma/client";
import { Invite } from "@lib/models/actionneur";

const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL;

const buildInvite = (invite: PrismaInvite): Invite => ({
    id: invite.id,
    discordId: invite.discordId,
    link: `${WEBAPP_URL}?invite=${invite.token}`,
    expiresAt: invite.expiresAt,
});

export const getActionneurInvitesService = async (): Promise<Invite[]> => {
    const invites = await getInvites();
    return invites.map(buildInvite);
};

export const generateActionneurInviteLink = async (
    discordId: string
): Promise<Invite> => {
    await verifyDiscordUserIdService(discordId);
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 3600 * 1000);
    const existingInvite = await getInviteByDiscordId(discordId);
    if (existingInvite) {
        if (existingInvite.expiresAt < new Date()) {
            await deleteInvite(existingInvite.id);
        } else {
            throw new Error(ErrorMessages.DuplicateInvite);
        }
    }
    const newInvite = await postInvite({ token, discordId, expiresAt }); //TODO: throw error OR override if already exists
    return buildInvite(newInvite);
};

export const deleteActionneurInvitesService = async (ids: number[]) => {
    deleteInvites(ids);
};

export const checkActionneurInviteToken = async (inviteToken: string) => {
    const token = await getCookie("user_token");
    if (!token) {
        throw new Error(ErrorMessages.NotConnected);
    }
    const { discordId } = decodeToken(token);
    const invite = await getInviteByToken(inviteToken);
    if (!invite || invite.discordId !== discordId) {
        throw new Error(ErrorMessages.InvalidInvite);
    }

    if (invite.expiresAt < new Date()) {
        deleteInvite(invite.id);
        throw new Error(ErrorMessages.ExpiredInvite);
    }
    return invite;
};
