"use server";

import { Resource } from "@prisma/client";
import {
    deleteResource,
    getResources,
    postResource,
    putResource,
} from "../data/resources";
import { ResourceCreateInput, ResourceUpdateInput } from "../models/resource";
import { withAuth } from "./auth";

export const getResourcesService = async (): Promise<Resource[]> => {
    return getResources();
};

export const getResourcesByIdsService = async (
    ids: number[]
): Promise<Resource[]> => {
    const resources = await getResources();
    return resources.filter((resource) => ids.includes(resource.id));
};

export const createResourceService = withAuth("actionneur")(
    async (data: ResourceCreateInput): Promise<Resource> => {
        const newResourceData = {
            ...data,
            charbon: { connect: { id: data.charbonId } },
        };
        return postResource(newResourceData);
    }
);

export const updateResourceService = withAuth("actionneur")(
    async (id: number, data: ResourceUpdateInput) => {
        const newResourceData = data.charbonId
            ? { ...data, charbon: { connect: { id: data.charbonId } } }
            : data;

        return putResource(id, newResourceData);
    }
);

export const deleteResourceService = withAuth("actionneur")(
    async (id: number) => {
        return deleteResource(id);
    }
);
