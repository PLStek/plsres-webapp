import { Resource } from "@prisma/client";
import {
    deleteResource,
    getResources,
    postResource,
    putResource,
} from "../data/resourcesData";
import { ResourceCreateInput, ResourceUpdateInput } from "../models/resource";

export const getResourcesService = async (): Promise<Resource[]> => {
    return getResources();
};

export const getResourcesByIdsService = async (
    ids: number[]
): Promise<Resource[]> => {
    const resources = await getResources();
    return resources.filter((resource) => ids.includes(resource.id));
};

export const createResourceService = async (
    data: ResourceCreateInput
): Promise<Resource> => {
    const newResourceData = {
        ...data,
        charbon: { connect: { id: data.charbonId } },
    };
    return postResource(newResourceData);
};

export const updateResourceService = async (
    id: number,
    data: ResourceUpdateInput
) => {
    const newResourceData = data.charbonId
        ? { ...data, charbon: { connect: { id: data.charbonId } } }
        : data;

    return putResource(id, newResourceData);
};

export const deleteResourceService = async (id: number) => {
    return deleteResource(id);
};
