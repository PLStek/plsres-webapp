import { ResourceCreateInput } from "@lib/models/resource";
import { useResourceContext } from "../context/ResourceContext";
import { useState } from "react";
import { createResourceAction, deleteResourceAction } from "@lib/actions";

export const useResourcesQuery = () => {
    const { resources } = useResourceContext();
    return [resources] as const;
};

export const useResourceByIdQuery = (id: number) => {
    const { resources } = useResourceContext();
    const resource = resources.find((c) => c.id === id);
    return [resource] as const;
};

export const useCreateResourceMutation = () => {
    const { addResource } = useResourceContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (newResource: ResourceCreateInput) => {
        try {
            const resource = await createResourceAction(newResource);
            addResource(resource);
            setError(null); //TODO: voir si besoin des setErrors ici (partout)
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return [mutate, loading, error] as const;
};

export const useDeleteResourceMutation = () => {
    const { removeResource } = useResourceContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (id: number) => {
        try {
            setLoading(true);
            await deleteResourceAction(id);
            removeResource(id);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return [mutate, loading, error] as const;
};
