import { Resource } from "@prisma/client";
import {
    deleteResource,
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
): Promise<Resource | undefined> => {
    const resource = await getResourcesService();
    return resource.find((r) => r.id === id);
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

//TODO: delete multiple resources
