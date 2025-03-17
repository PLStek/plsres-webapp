import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";

export const getInvites = async () => {
    return prisma.invite.findMany({
        where: {
            expiresAt: { gt: new Date() },
        },
    });
};

export const getInviteByToken = async (token: string) => {
    return prisma.invite.findUnique({ where: { token } });
};

export const getInviteByDiscordId = async (discordId: string) => {
    return prisma.invite.findFirst({ where: { discordId } });
};

export const postInvite = async (data: Prisma.InviteCreateInput) => {
    return prisma.invite.create({ data });
};

export const deleteInvite = async (id: number) => {
    return prisma.invite.delete({ where: { id } });
};

export const deleteInvites = async (ids: number[]) => {
    return prisma.invite.deleteMany({ where: { id: { in: ids } } });
};

export const deleteExpiredInvites = async () => {
    return prisma.invite.deleteMany({
        where: {
            expiresAt: { lt: new Date() },
        },
    });
};
