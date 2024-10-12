import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";

export const getCharbonActionneurs = async () => {
    return prisma.charbonActionneur.findMany();
};

//TODO: Post with unique charbonId
export const postCharbonActionneurs = async (
    data: Prisma.CharbonActionneurCreateManyInput[]
) => {
    return prisma.charbonActionneur.createMany({
        data,
    });
};

//TODO: Single or many ?
export const deleteCharbonActionneurByCharbonIds = async (
    charbonId: number[]
) => {
    return prisma.charbonActionneur.deleteMany({
        where: {
            charbonId: {
                in: charbonId,
            },
        },
    });
};
