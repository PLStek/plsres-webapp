import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";

export const getRevokedToken = async (token: string) => {
    return prisma.revokedToken.findUnique({ where: { token } });
};

export const postRevokedToken = async (
    data: Prisma.RevokedTokenCreateInput
) => {
    return prisma.revokedToken.create({ data });
};

export const deleteExpiredTokens = async () => {
    return prisma.revokedToken.deleteMany({
        where: {
            expiresAt: { lt: new Date() },
        },
    });
};
