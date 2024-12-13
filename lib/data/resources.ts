import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";

export const getResources = async () => {
    return prisma.resource.findMany();
};

export const getResourceById = async (id: number) => {
    return prisma.resource.findUnique({
        where: { id },
    });
};

export const getResourcesByCharbonId = async (id: number) => {
    return prisma.resource.findMany({
        where: {
            charbonId: id,
        },
    });
};

export const postResource = async (data: Prisma.ResourceCreateInput) => {
    return prisma.resource.create({
        data,
    });
};

export const postResources = async (data: Prisma.ResourceCreateManyInput[]) => {
    return prisma.resource.createMany({
        data,
    });
};

export const putResource = async (
    id: number,
    data: Prisma.ResourceUpdateInput
) => {
    return prisma.resource.update({
        where: { id },
        data,
    });
};

export const deleteResource = async (id: number) => {
    return prisma.resource.delete({
        where: { id },
    });
};

export const deleteResourcesByCharbonId = async (id: number) => {
    return prisma.resource.deleteMany({
        where: {
            charbonId: id,
        },
    });
};
