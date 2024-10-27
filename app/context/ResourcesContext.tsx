"use client";

import { Resource } from "@lib/models/resource";
import { createContext, ReactNode, useState } from "react";

type ResourcesContextType = {
    resources: Resource[];
    addResource: (newResource: Resource) => void;
    removeResource: (id: number) => void;
};

export const ResourcesContext = createContext<ResourcesContextType | undefined>(
    undefined
);

const ResourcesProvider = ({
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
        <ResourcesContext.Provider
            value={{
                resources,
                addResource,
                removeResource,
            }}
        >
            {children}
        </ResourcesContext.Provider>
    );
};

export default ResourcesProvider;
