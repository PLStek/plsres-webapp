import { Resource } from "@prisma/client";
import {
    deleteResource,
    deleteResourcesByCharbonId,
    getResourceByCharbonId,
    getResourceById,
    getResources,
    postResource,
    putResource,
} from "../../data/resources";
import {
    ResourceCreateInput,
    ResourceUpdateInput,
} from "../../models/resource";
import {
    uploadResourceFileService,
    deleteResourceFileService,
} from "./resourceFile";

export const getResourcesService = async (): Promise<Resource[]> => {
    return getResources();
};

export const getResourceByIdService = async (
    id: number
): Promise<Resource | null> => {
    return getResourceById(id);
};

export const createResourceService = async (
    data: ResourceCreateInput
): Promise<Resource> => {
    const extension = data.file.name.split(".").pop() || "";
    const newResourceData = {
        ...data,
        charbon: { connect: { id: data.charbonId } },
        extension,
    };
    const newResource = await postResource(newResourceData);

    try {
        await uploadResourceFileService(
            data.charbonId,
            newResource.id,
            data.file
        );
        return newResource;
    } catch (error) {
        await deleteResource(newResource.id);
        console.error(error);
        throw new Error("Failed to save the file");
    }
};

/* export const createResourcesForCharbonService = async (
    charbonId: number,
    data: ResourceCreateInputForCharbon[]
): Promise<Resource[]> => {
    const newResourcesData = data.map((resource) => {
        const extension = resource.file.name.split(".").pop() || "";
        return {
            ...resource,
            charbon: { connect: { id: charbonId } },
            extension,
        };
    });
    await postResources(newResourcesData);
    const newResources = await getResourceByCharbonId(charbonId);

    const fileMap = new Map(
        data.map((resource) => [resource.name, resource.file])
    );

    const fileUploadPromises = newResources.map(async (resource) => {
        const file = fileMap.get(resource.name);
        if (!file) throw new Error("File not found");
        await uploadResourceFileService(charbonId, resource.id, file);
        return resource;
    });

    try {
        return Promise.all(fileUploadPromises);
    } catch (error) {
        await deleteResourcesByCharbonId(charbonId);
        console.error(error);
        throw new Error("Failed to save the files");
    }
}; */

export const updateResourceService = async (
    id: number,
    data: ResourceUpdateInput
) => {
    //TODO: Handle file upload in update
    const newResourceData = data.charbonId
        ? { ...data, charbon: { connect: { id: data.charbonId } } }
        : data;

    return putResource(id, newResourceData);
};

export const deleteResourceService = async (id: number) => {
    const resource = await getResourceByIdService(id);
    if (!resource) return;

    deleteResourceFileService(resource.charbonId, id);

    return deleteResource(id);
};

export const deleteResourcesByCharbonIdService = async (id: number) => {
    const resources = await getResourceByCharbonId(id);
    if (!resources) return;

    const deletePromises = resources.map((resource) =>
        deleteResourceFileService(resource.charbonId, resource.id)
    );

    await Promise.all(deletePromises);

    return deleteResourcesByCharbonId(id);
};

//TODO: delete multiple resources
