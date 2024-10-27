import { ResourceCreateInput } from "@lib/models/resource";
import { ResourcesContext } from "../context/ResourcesContext";
import { useContext, useState } from "react";
import {
    createResourceService,
    deleteResourceService,
} from "@lib/services/resource";

export const useResources = () => {
    const context = useContext(ResourcesContext);

    if (!context) {
        throw new Error("useResources must be used within a ResourcesProvider");
    }

    const { resources, addResource, removeResource } = context;

    const [loading, setLoading] = useState({
        create: false,
        delete: false,
    });

    const fetchResourceById = (id: number) =>
        resources.find((c) => c.id === id);

    const createResource = async (newResource: ResourceCreateInput) => {
        setLoading((prev) => ({ ...prev, create: true }));
        const resource = await createResourceService(newResource);
        addResource(resource);
        setLoading((prev) => ({ ...prev, create: false }));
    };

    const deleteResource = async (id: number) => {
        setLoading((prev) => ({ ...prev, delete: true }));
        await deleteResourceService(id);
        removeResource(id);
        setLoading((prev) => ({ ...prev, delete: false }));
    };

    return {
        resources,
        fetchResourceById,
        createResource,
        deleteResource,
        loading,
    };
};
