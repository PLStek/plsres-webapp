import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";

const include = {
    actionneurs: {
        select: {
            actionneurId: true,
        },
    },
    _count: {
        select: {
            resources: true,
        },
    },
};

export const getCharbons = async () => {
    return prisma.charbon.findMany({
        include,
        where: {
            isDraft: false,
            isCancelled: false,
            course: {
                isActive: true,
            },
        },
    });
};

//TODO: delete
export const getOngoingCharbons = async () => {
    return prisma.charbon.findMany({
        include,
        where: {
            status: "ONGOING",
        },
    });
};

export const getCharbonById = async (id: number) => {
    //TODO: check error handling
    return prisma.charbon.findUniqueOrThrow({
        where: { id },
        include,
    });
};

export const getCharbonByDiscordEventId = async (discordEventId: string) => {
    return prisma.charbon.findUniqueOrThrow({
        where: { discordEventId },
        include,
    });
};

export const postCharbon = async (data: Prisma.CharbonCreateInput) => {
    return prisma.charbon.create({
        data,
        include,
    });
};

export const putCharbon = async (
    id: number,
    data: Prisma.CharbonUpdateInput
) => {
    return prisma.charbon.update({
        where: { id },
        data,
        include,
    });
};

export const deleteCharbon = async (id: number) => {
    return prisma.charbon.delete({
        where: { id },
    });
};
