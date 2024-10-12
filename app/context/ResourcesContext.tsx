"use client";

import { Resource } from "@/lib/models/resource";
import { createContext, ReactNode, useContext, useState } from "react";

type ResourcesContextType = {
    getResources: () => Resource[];
    addResource: (newResource: Resource) => void;
    removeResource: (id: number) => void;
};

const ResourcesContext = createContext<ResourcesContextType | undefined>(
    undefined
);

const ResourcesProvider = ({
    initialResources,
    children,
}: {
    initialResources: Resource[];
    children: ReactNode;
}) => {
    const [resources, setResources] = useState(initialResources || []);

    const getResources = () => resources;
    const addResource = (newResource: Resource) =>
        setResources([...resources, newResource]);
    const removeResource = (id: number) =>
        setResources(resources.filter((c) => c.id !== id));

    return (
        <ResourcesContext.Provider
            value={{
                getResources,
                addResource,
                removeResource,
            }}
        >
            {children}
        </ResourcesContext.Provider>
    );
};

export default ResourcesProvider;

export const useResourcesContext = () => {
    const context = useContext(ResourcesContext);
    if (context === undefined) {
        throw new Error("useResources must be used within a ResourcesProvider");
    }
    return context;
};
