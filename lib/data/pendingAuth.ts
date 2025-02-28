import { prisma } from "@lib/prisma";
import { Prisma } from "@prisma/client";

export const getPendingAuthByDiscordUserId = async (discordId: string) => {
    return prisma.pendingAuth.findUnique({ where: { discordId } });
};

export const postPendingAuth = async (data: Prisma.PendingAuthCreateInput) => {
    return prisma.pendingAuth.upsert({
        where: { discordId: data.discordId },
        update: data,
        create: data,
    });
};

export const deletePendingAuth = async (discordId: string) => {
    return prisma.pendingAuth.delete({ where: { discordId } });
};
