import { Prisma, Actionneur } from "@prisma/client";
import { prisma } from "@lib/prisma";

export const getActionneurs = async () => {
    return prisma.actionneur.findMany();
};

export const getActionneurById = async (id: number) => {
    return prisma.actionneur.findUnique({ where: { id } });
};

export const getActionneursByCharbonId = async (charbonId: number) => {
    return prisma.actionneur.findMany({
        where: {
            charbons: {
                some: {
                    charbonId,
                },
            },
        },
    });
};

export const getActionneurByDiscordId = async (discordId: string) => {
    return prisma.actionneur.findUnique({ where: { discordId } });
};

export const postActionneur = async (
    data: Prisma.ActionneurCreateInput
): Promise<Actionneur> => {
    return prisma.actionneur.create({
        data,
    });
};

export const putActionneur = async (
    id: number,
    data: Prisma.ActionneurUpdateInput
) => {
    return prisma.actionneur.update({
        where: { id },
        data,
    });
};

export const deleteActionneur = async (id: number) => {
    return prisma.actionneur.delete({
        where: { id },
    });
};
