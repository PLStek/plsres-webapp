"use client";

import { Resource } from "@lib/models/resource";
import { createContext, ReactNode, useContext, useState } from "react";

//TODO: make a map instead
type ResourceContextType = {
    resourcesByCharbonId: Record<number, Resource[]>;
    setResourcesByCharbonId: (charbonId: number, resources: Resource[]) => void;
    removeResourcesByCharbonId: (charbonId: number) => void;
};

export const ResourceContext = createContext<ResourceContextType | null>(null);

const ResourceProvider = ({ children }: { children: ReactNode }) => {
    const [resourcesByCharbonId, setResources] = useState<
        Record<number, Resource[]>
    >({});

    const setResourcesByCharbonId = (charbonId: number, resources: Resource[]) =>
        setResources((prev) => ({
            ...prev,
            [charbonId]: resources,
        })); //TODO: more like setResources, maybe allow setting a unique resource ?

    const removeResourcesByCharbonId = (charbonId: number) =>
        setResources((prev) => {
            const updatedResources = { ...prev };
            delete updatedResources[charbonId];
            return updatedResources;
        });

    return (
        <ResourceContext.Provider
            value={{
                resourcesByCharbonId,
                setResourcesByCharbonId,
                removeResourcesByCharbonId,
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
};

export default ResourceProvider;

export const useResourceContext = () => {
    const context = useContext(ResourceContext);
    if (context === null) {
        throw new Error("useResources must be used within a ResourceProvider");
    }
    return context;
};
