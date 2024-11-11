import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";

export const getInvitation = async (token: string) => {
    return prisma.invitation.findUnique({ where: { token } });
};

export const postInvitation = async (data: Prisma.InvitationCreateInput) => {
    return prisma.invitation.create({ data });
};

export const deleteInvitation = async (id: number) => {
    return prisma.invitation.delete({ where: { id } });
};

export const deleteExpiredInvitations = async () => {
    return prisma.invitation.deleteMany({
        where: {
            expiresAt: { lt: new Date() },
        },
    });
};
