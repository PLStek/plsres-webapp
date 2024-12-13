"use client";

import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";
import CardResources from "./CardResources";

const LazyCardResources = ({
    charbonId,
    collapsed,
}: {
    charbonId: number;
    collapsed: boolean;
}) => {
    const [maxHeight, setMaxHeight] = useState("0px");
    const [opacity, setOpacity] = useState("opacity-0");

    const resourcesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (resourcesRef.current) {
            const height = !collapsed
                ? `${resourcesRef.current.scrollHeight}px`
                : "0px";
            const timeout = setTimeout(() => {
                setMaxHeight(height);
                setOpacity(collapsed ? "opacity-0" : "opacity-100");
            }, 10);
            return () => clearTimeout(timeout);
        }
    }, [collapsed]);

    return (
        <div
            ref={resourcesRef}
            className={clsx(
                "mt-2 overflow-hidden transition-all duration-500 ease-in-out",
                opacity
            )}
            style={{ maxHeight }}
        >
            <hr className=" border-gray-200" />
            <CardResources charbonId={charbonId} />
        </div>
    );
};

export default memo(LazyCardResources);
