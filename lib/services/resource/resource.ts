import { Resource } from "@lib/models/resource";
import {
    deleteResource,
    deleteResourcesByCharbonId,
    getResourcesByCharbonId,
    getResourceById,
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
import { Prisma } from "@prisma/client";

/* const buildCourse = (
    course: Prisma.PromiseReturnType<typeof getCourseById>
) => ({
    ...course,
    category: course.category as CourseCategory,
}); */

const buildResource = (
    resource: Prisma.PromiseReturnType<typeof getResourceById>
) => ({
    ...resource,
    filename: `${resource.title}.${resource.extension}`,
});

export const getResourceByIdService = async (
    id: number
): Promise<Resource | null> => {
    //TODO: handle error
    const resource = await getResourceById(id);
    return buildResource(resource);
};

export const getResourcesByCharbonIdService = async (
    charbonId: number
): Promise<Resource[]> => {
    const resources = await getResourcesByCharbonId(charbonId);
    return resources.map(buildResource);
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
        await uploadResourceFileService(newResource.id, data.file);
        return buildResource(newResource);
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
        const extension = resource.file.title.split(".").pop() || "";
        return {
            ...resource,
            charbon: { connect: { id: charbonId } },
            extension,
        };
    });
    await postResources(newResourcesData);
    const newResources = await getResourceByCharbonId(charbonId);

    const fileMap = new Map(
        data.map((resource) => [resource.title, resource.file])
    );

    const fileUploadPromises = newResources.map(async (resource) => {
        const file = fileMap.get(resource.title);
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

    deleteResourceFileService(id);

    return deleteResource(id);
};

export const deleteResourcesByCharbonIdService = async (id: number) => {
    const resources = await getResourcesByCharbonId(id);
    if (!resources) return;

    const deletePromises = resources.map((resource) =>
        deleteResourceFileService(resource.id)
    );

    await Promise.all(deletePromises);

    return deleteResourcesByCharbonId(id);
};

//TODO: delete multiple resources
