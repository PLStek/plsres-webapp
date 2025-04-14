import { Resource, ResourceCreateInput } from "@lib/models/resource";
import { useCallback, useEffect } from "react";
import {
    createResourceAction,
    deleteResourceAction,
    getResourcesByCharbonIdAction,
} from "@lib/actions";
import { ErrorMessages } from "@lib/utils/errorMessages";
import { useMutationState, useQueryState } from "./useQueryState";
import { useAtom, useAtomValue } from "jotai";
import {
    addResourceAtom,
    removeCharbonResourcesAtom,
    resourcesAtom,
    setCharbonResourcesAtom,
} from "@app/atoms/resourceAtoms";

export const useResourcesByCharbonIdQuery = (charbonId: number) => {
    const resourcesByCharbonId = useAtomValue(resourcesAtom);
    const [, setResourcesByCharbonId] = useAtom(setCharbonResourcesAtom);
    const { state, setResult } = useQueryState<Resource[]>({});

    const fetchData = useCallback(async () => {
        const resource = resourcesByCharbonId[charbonId];
        if (resource) {
            setResult({ data: resource, error: null });
            return;
        }

        const result = await getResourcesByCharbonIdAction(charbonId);
        if (result.data) {
            setResourcesByCharbonId(charbonId, result.data);
        }
        setResult(result);
    }, [charbonId, resourcesByCharbonId, setResourcesByCharbonId, setResult]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return state;
};

export const useResourceFileById = () => {
    const download = async (id: number, filename: string) => {
        try {
            const response = await fetch("/resource?id=" + id);
            if (!response.ok) {
                const errorData = await response.json();
                const message = errorData?.error
                    ? errorData.error
                    : ErrorMessages.UnknownError;
                return { error: message };
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
            return { error: ErrorMessages.UnknownError };
        }
        return;
    };

    const { mutate, loading, error } = useMutationState({
        mutation: download,
    });
    return { download: mutate, loading, error };
};

export const useCreateResourceMutation = () => {
    const [, addResource] = useAtom(addResourceAtom);

    const mutation = async (newResource: ResourceCreateInput) => {
        const formData = new FormData();
        Object.entries(newResource).forEach(([key, value]) => {
            //TODO: review (AI generated)
            if (Array.isArray(value)) {
                value.forEach((item) => formData.append(key, item as any));
            } else {
                formData.append(key, value as any);
            }
        });

        const result = await createResourceAction(formData);
        const resource = result.data;
        if (resource) {
            addResource(resource);
        }
        return result;
    };

    const result = useMutationState({
        mutation,
    });
    return result;
};

export const useDeleteResourceMutation = () => {
    const [, removeCharbonResources] = useAtom(removeCharbonResourcesAtom);

    const mutation = async (id: number, charbonId: number) => {
        const result = await deleteResourceAction(id);
        removeCharbonResources(charbonId);
        return result;
    };

    const result = useMutationState({
        mutation,
    });

    return result;
};
