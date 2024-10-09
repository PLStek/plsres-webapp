import { Prisma, Actionneur } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getActionneurs = async () => {
    return prisma.actionneur.findMany();
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
