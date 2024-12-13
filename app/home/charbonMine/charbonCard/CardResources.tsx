"use client";

import { useResourcesByCharbonIdQuery } from "@app/hooks/useResources";
import { memo } from "react";

type CardResourcesProps = {
    charbonId: number;
};

const CardResources = ({ charbonId }: CardResourcesProps) => {
    const [resources, loading, ] = useResourcesByCharbonIdQuery(charbonId);
    console.log(resources);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {resources?.map((resource) => (
                        <li key={resource.id}>{resource.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default memo(CardResources);
