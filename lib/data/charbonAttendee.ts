import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";

export const getCharbonAttendeesByCharbonId = async (charbonId: number) => {
    return prisma.charbonAttendee.findMany({
        where: {
            charbonId,
        },
    });
};

export const getCharbonAttendeesByDiscordUserId = async (
    discordUserId: string
) => {
    return prisma.charbonAttendee.findMany({
        where: {
            discordUserId,
        },
    });
};

export const addCharbonAttendee = async (
    data: Prisma.CharbonAttendeeCreateInput
) => {
    return prisma.charbonAttendee.create({
        data,
    });
};

export const deleteCharbonAttendee = async (id: number) => {
    return prisma.charbonAttendee.delete({
        where: {
            id,
        },
    });
};

export const deleteCharbonAttendeesByCharbonId = async (charbonId: number) => {
    return prisma.charbonAttendee.deleteMany({
        where: {
            charbonId,
        },
    });
};
