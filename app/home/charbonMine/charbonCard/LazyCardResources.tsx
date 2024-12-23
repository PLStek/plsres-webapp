"use client";

import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";
import CardResources from "./CardResources";
import { useResourcesByCharbonIdQuery } from "@app/hooks/useResources";

const LazyCardResources = ({
    charbonId,
    collapsed,
}: {
    charbonId: number;
    collapsed: boolean;
}) => {
    const [resources, loading] = useResourcesByCharbonIdQuery(charbonId);

    const [maxHeight, setMaxHeight] = useState("0px");
    const [opacity, setOpacity] = useState("opacity-0");

    const resourcesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (resourcesRef.current && !loading) {
            const height = !collapsed
                ? `${resourcesRef.current.scrollHeight}px`
                : "0px";
            const timeout = setTimeout(() => {
                setMaxHeight(height);
                setOpacity(collapsed ? "opacity-0" : "opacity-100");
            }, 10);
            return () => clearTimeout(timeout);
        }
    }, [collapsed, loading]);

    return (
        <div
            ref={resourcesRef}
            className={clsx(
                "overflow-hidden transition-all duration-500 ease-in-out",
                opacity
            )}
            style={{ maxHeight }}
        >
            <div className="mt-4 mb-2">
                <CardResources resources={resources ?? []} />
            </div>
        </div>
    );
};

export default memo(LazyCardResources);
