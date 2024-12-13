"use client";

import { Resource } from "@lib/models/resource";
import { createContext, ReactNode, useContext, useState } from "react";

type ResourceContextType = {
    resourcesByCharbonId: Record<number, Resource[]>;
    addResources: (charbonId: number, resources: Resource[]) => void;
    removeResources: (charbonId: number) => void;
};

export const ResourceContext = createContext<ResourceContextType | null>(null);

const ResourceProvider = ({ children }: { children: ReactNode }) => {
    const [resourcesByCharbonId, setResources] = useState<
        Record<number, Resource[]>
    >({});

    const addResources = (charbonId: number, resources: Resource[]) =>
        setResources((prev) => ({
            ...prev,
            [charbonId]: resources,
        }));

    const removeResources = (charbonId: number) =>
        setResources((prev) => {
            const updatedResources = { ...prev };
            delete updatedResources[charbonId];
            return updatedResources;
        });

    return (
        <ResourceContext.Provider
            value={{
                resourcesByCharbonId,
                addResources,
                removeResources,
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
