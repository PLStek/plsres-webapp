import { Resource } from "@lib/models/resource";
import { useResourceContext } from "../context/ResourceContext";
import { useEffect, useState } from "react";
import { getResourcesByCharbonIdAction } from "@lib/actions";

/* export const useResourceByIdQuery = (id: number) => {
    const { resources } = useResourceContext();
    const resource = resources.find((c) => c.id === id);
    return [resource] as const;
}; */

export const useResourcesByCharbonIdQuery = (charbonId: number) => {
    const { resourcesByCharbonId, addResources } = useResourceContext();
    const [data, setData] = useState<Resource[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const resource = resourcesByCharbonId[charbonId];
            if (resource) {
                setData(resource);
                setLoading(false);
                setError(null);
                return;
            }

            try {
                const resources = await getResourcesByCharbonIdAction(
                    charbonId
                );
                addResources(charbonId, resources);
                setData(resources);
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [charbonId, resourcesByCharbonId, addResources]);

    return [data, loading, error] as const;
};

export const useResourceFileById = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const download = async (id: number, filename: string) => {
        try {
            setLoading(true);
            const response = await fetch("/resource?id=" + id);
            if (!response.ok) {
                const errorData = await response.json();
                const message = errorData?.error
                    ? errorData.error
                    : "An error occurred";
                throw new Error(message);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            setLoading(false);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };
    return [download, loading, error] as const;
};

/* export const useCreateResourceMutation = () => {
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
}; */
