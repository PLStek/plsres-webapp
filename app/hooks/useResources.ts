import { Resource, ResourceCreateInput } from "@lib/models/resource";
import { useResourceContext } from "../context/ResourceContext";
import { useCallback, useEffect, useState } from "react";
import {
    createResourceAction,
    deleteResourceAction,
    getResourcesByCharbonIdAction,
} from "@lib/actions";
import { ErrorMessages } from "@lib/utils/errorMessages";

/* export const useResourceByIdQuery = (id: number) => {
    const { resources } = useResourceContext();
    const resource = resources.find((c) => c.id === id);
    return [resource] as const;
}; */

export const useResourcesByCharbonIdQuery = (charbonId: number) => {
    const { resourcesByCharbonId, setResourcesByCharbonId } =
        useResourceContext();
    const [data, setData] = useState<Resource[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        const resource = resourcesByCharbonId[charbonId];
        if (resource) {
            setData(resource);
            setLoading(false);
            setError(null);
            return;
        }

        const { data: resources, error } = await getResourcesByCharbonIdAction(
            charbonId
        );
        if (resources) {
            setResourcesByCharbonId(charbonId, resources);
        }
        setData(resources);
        setError(error);

        setLoading(false);
    }, [charbonId, resourcesByCharbonId, setResourcesByCharbonId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [data, loading, error] as const;
};

export const useResourceFileById = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const download = async (id: number, filename: string) => {
        try {
            setLoading(true);
            const response = await fetch("/resource?id=" + id);
            if (!response.ok) {
                const errorData = await response.json();
                const message = errorData?.error
                    ? errorData.error
                    : ErrorMessages.UnknownError;
                setError(message);
                setLoading(false);
                return;
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch {
            setError(ErrorMessages.UnknownError);
        } finally {
            setLoading(false);
        }
    };
    return [download, loading, error] as const;
};

export const useCreateResourceMutation = () => {
    const { resourcesByCharbonId, setResourcesByCharbonId } =
        useResourceContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (newResource: ResourceCreateInput) => {
        const { data: resource, error } = await createResourceAction(
            newResource
        );
        if (resource) {
            const charbonId = resource.charbonId;
            setResourcesByCharbonId(charbonId, [
                ...resourcesByCharbonId[charbonId],
                resource,
            ]);
        }
        setError(error);
        setLoading(false);
    };

    return [mutate, loading, error] as const;
};

export const useDeleteResourceMutation = () => {
    const { resourcesByCharbonId, setResourcesByCharbonId } =
        useResourceContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (id: number, charbonId: number) => {
        setLoading(true);
        const { error } = await deleteResourceAction(id);
        setResourcesByCharbonId(
            charbonId,
            resourcesByCharbonId[charbonId].filter((r) => r.id !== id)
        );
        setError(error);
        setLoading(false);
    };

    return [mutate, loading, error] as const;
};
