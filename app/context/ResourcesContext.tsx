"use client";

import { Resource } from "@/lib/models/resource";
import { createContext, ReactNode, useContext, useState } from "react";

type ResourcesContextType = {
    getResources: () => Resource[];
    getResourceById: (id: number) => Resource | undefined;
    addResource: (newResource: Resource) => void;
    removeResource: (id: number) => void;
};

const ResourcesContext = createContext<ResourcesContextType | undefined>(
    undefined
);

export function ResourcesProvider({
    initialResources,
    children,
}: {
    initialResources: Resource[];
    children: ReactNode;
}) {
    const [resources, setResources] = useState(initialResources || []);

    const getResources = () => resources;
    const getResourceById = (id: number) => resources.find((c) => c.id === id);
    const addResource = (newResource: Resource) =>
        setResources([...resources, newResource]);
    const removeResource = (id: number) =>
        setResources(resources.filter((c) => c.id !== id));

    return (
        <ResourcesContext.Provider
            value={{
                getResources,
                getResourceById,
                addResource,
                removeResource,
            }}
        >
            {children}
        </ResourcesContext.Provider>
    );
}

export function useResources() {
    const context = useContext(ResourcesContext);
    if (context === undefined) {
        throw new Error("useResources must be used within a ResourcesProvider");
    }
    return context;
}
