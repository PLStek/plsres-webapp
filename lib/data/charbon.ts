import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";

export const getCharbons = async () => {
    return prisma.charbon.findMany({
        include: {
            actionneurs: {
                select: {
                    actionneurId: true,
                },
            },
        },
        where: {
            isDraft: false,
        },
    });
};

export const getOngoingCharbons = async () => {
    return prisma.charbon.findMany({
        include: {
            actionneurs: {
                select: {
                    actionneurId: true,
                },
            },
        },
        where: {
            status: "ONGOING",
        },
    });
};

export const getCharbonById = async (id: number) => {
    //TODO: check error handling
    return prisma.charbon.findUniqueOrThrow({
        where: { id },
        include: {
            actionneurs: {
                select: {
                    actionneurId: true,
                },
            },
        },
    });
};

export const getCharbonByDiscordEventId = async (discordEventId: string) => {
    return prisma.charbon.findUniqueOrThrow({
        where: { discordEventId },
        include: {
            actionneurs: {
                select: {
                    actionneurId: true,
                },
            },
        },
    });
};

export const postCharbon = async (data: Prisma.CharbonCreateInput) => {
    return prisma.charbon.create({
        data,
    });
};

export const putCharbon = async (
    id: number,
    data: Prisma.CharbonUpdateInput
) => {
    return prisma.charbon.update({
        where: { id },
        data,
    });
};

export const deleteCharbon = async (id: number) => {
    return prisma.charbon.delete({
        where: { id },
    });
};
