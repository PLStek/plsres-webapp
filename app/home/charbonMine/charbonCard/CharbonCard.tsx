"use client";

import type { Charbon } from "@lib/models/charbon";
import {
    ChevronDownIcon,
    ArchiveBoxIcon,
    PlayCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCourseByIdQuery } from "@app/hooks/useCourses";
import { useActionneursByIdsQuery } from "@app/hooks/useActionneurs";
import CardFooter from "./CardFooter";
import CardContent from "./CardContent";
import { lazy, memo, useState } from "react";

const LazyCardResources = lazy(() => import("./LazyCardResources"));

const styles = {
    container:
        "relative p-5 overflow-hidden border border-gray-300 bg-[#F6F6F6]",
    borderLeft:
        "absolute top-0 left-0 h-full border-l-4 group-hover:border-l-5",
    chevronIconButton:
        "absolute left-1/2 -bottom-0 transform -translate-x-1/2 translate-y-6",
    chevronIcon:
        "h-5 w-5 text-gray-500 transition-transform duration-100 ease-in-out hover:scale-110 hover:text-gray-700",
    borderColor: {
        math: "border-red-400",
        elec: "border-green-400",
        info: "border-yellow-400",
        meca: "border-blue-400",
        default: "border-gray-400",
    },
};

const CharbonCard = ({
    charbon,
    isFirst,
    isLast,
}: {
    charbon: Charbon;
    isFirst: boolean;
    isLast: boolean;
}) => {
    const [showResources, setShowResources] = useState(false);
    const [resourcesCollapsed, setResourcesCollapsed] = useState(true);

    const [actionneurs] = useActionneursByIdsQuery(charbon.actionneurIds);
    const [course] = useCourseByIdQuery(charbon.courseId);

    const borderTopClass = isFirst ? "rounded-t-xl" : "";
    const borderBottomClass = isLast ? "rounded-b-xl" : "border-b-0";

    const color = (course?.category?.toLowerCase() ||
        "default") as keyof typeof styles.borderColor;


    return (
        <div
            className={clsx(
                styles.container,
                borderTopClass,
                borderBottomClass,
                "group"
            )}
        >
            <div
                className={clsx(styles.borderLeft, styles.borderColor[color])}
            />

            <CardContent
                title={charbon.name}
                course={course?.code ?? "-"}
                description={charbon.description}
                color={color}
            />
            {showResources && (
                <LazyCardResources
                    charbonId={charbon.id}
                    collapsed={resourcesCollapsed}
                />
            )}

            <CardFooter
                actionneurs={actionneurs}
                timestamp={charbon.timestamp}
            />
            <div
                className={clsx(
                    styles.chevronIconButton,
                    "border border-gray-300 border-solid border-b-0 rounded-t-xl px-2 py-0.5",
                    "transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 "
                )}
                
            >
                <div className="flex gap-1">
                    <button
                        type="button"
                        className={clsx(styles.chevronIcon)}
                        onClick={() => {
                            setShowResources(true);
                            setResourcesCollapsed(!resourcesCollapsed);
                        }}
                        tabIndex={-1}
                    >
                        <ArchiveBoxIcon />
                    </button>
                    <button
                        type="button"
                        className={clsx(styles.chevronIcon)}
                        onClick={() => {}}
                        tabIndex={-1}
                    >
                        <PlayCircleIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(CharbonCard);
