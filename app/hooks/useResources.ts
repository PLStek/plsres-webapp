import { ResourceCreateInput } from "@/lib/models/resource";
import { useResourcesContext } from "../context/ResourcesContext";
import { useState } from "react";
import {
    createResourceService,
    deleteResourceService,
} from "@/lib/services/resourceService";

export function useResources() {
    const { getResources } = useResourcesContext();
    return getResources;
}

export function useGetResourceById() {
    const { getResources } = useResourcesContext();
    const getResourceById = (id: number) =>
        getResources().find((c) => c.id === id);
    return getResourceById;
}

export function useCreateResource() {
    const { addResource } = useResourcesContext();

    const [loading, setLoading] = useState(false);
    const createResource = async (newResource: ResourceCreateInput) => {
        setLoading(true);
        const resource = await createResourceService(newResource);
        addResource(resource);
        setLoading(false);
    };

    return { createResource, loading };
}

export function useDeleteResource() {
    const { removeResource } = useResourcesContext();

    const [loading, setLoading] = useState(false);
    const deleteResource = async (id: number) => {
        setLoading(true);
        await deleteResourceService(id);
        removeResource(id);
        setLoading(false);
    };

    return { deleteResource, loading };
}
