"use client";

import { memo, useEffect, useRef, useState } from "react";
import CardResources from "./CardResources";
import { useResourcesByCharbonIdQuery } from "@app/hooks/useResources";
import clsx from "clsx";
import { CircularProgress } from "@nextui-org/react";

const LazyCardResources = ({
    charbonId,
    isOpen,
}: {
    charbonId: number;
    isOpen: boolean;
}) => {
    const [resources, loading] = useResourcesByCharbonIdQuery(charbonId);

    const [maxHeight, setMaxHeight] = useState("0px");
    const [opacity, setOpacity] = useState("opacity-0");

    const resourcesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (resourcesRef.current) {
            const height = isOpen
                ? `${resourcesRef.current.scrollHeight}px`
                : "0px";
            const timeout = setTimeout(() => {
                setMaxHeight(height);
                setOpacity(isOpen ? "opacity-100" : "opacity-0");
            }, 10);
            return () => clearTimeout(timeout);
        }
    }, [isOpen, loading]);

    return (
        <div
            ref={resourcesRef}
            className={clsx(
                "overflow-hidden transition-all duration-500 ease-in-out",
                opacity
            )}
            style={{ maxHeight }}
        >
            {!loading && !!resources?.length && (
                <div className="mt-4 mb-2">
                    <CardResources resources={resources ?? []} />
                </div>
            )}
            {loading && (
                <div className="w-full flex justify-center my-4">
                    <CircularProgress label="Chargement des ressources" />
                </div>
            )}
        </div>
    );
};

export default memo(LazyCardResources);
