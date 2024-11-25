"use client";

import { Resource } from "@lib/models/resource";
import { createContext, ReactNode, useContext, useState } from "react";

type ResourceContextType = {
    resources: Resource[];
    addResource: (newResource: Resource) => void;
    removeResource: (id: number) => void;
};

export const ResourceContext = createContext<ResourceContextType | undefined>(
    undefined
);

const ResourceProvider = ({
    initialResources,
    children,
}: {
    initialResources?: Resource[];
    children: ReactNode;
}) => {
    const [resources, setResources] = useState(initialResources ?? []);

    const addResource = (newResource: Resource) =>
        setResources([...resources, newResource]);
    const removeResource = (id: number) =>
        setResources(resources.filter((c) => c.id !== id));

    return (
        <ResourceContext.Provider
            value={{
                resources,
                addResource,
                removeResource,
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
};

export default ResourceProvider;

export const useResourceContext = () => {
    const context = useContext(ResourceContext);
    if (context === undefined) {
        throw new Error("useResources must be used within a ResourceProvider");
    }
    return context;
};
