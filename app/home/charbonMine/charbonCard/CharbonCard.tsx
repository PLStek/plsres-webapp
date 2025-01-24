"use client";

import type { Charbon } from "@lib/models/charbon";
import clsx from "clsx";
import { useCourseByIdQuery } from "@app/hooks/useCourses";
import { useActionneursByIdsQuery } from "@app/hooks/useActionneurs";
import CardFooter from "./CardFooter";
import CardContent from "./CardContent";
import { lazy, memo, useState } from "react";

const LazyCardResources = lazy(() => import("./LazyCardResources"));

const styles = {
    container:
        "relative p-5 overflow-hidden border border-gray-200 bg-[#F9F9F9]",
    borderLeft:
        "absolute top-0 left-0 h-full border-l-4 group-hover:border-l-5",
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
    const [resourcesOpen, setResourcesOpen] = useState(false);

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
                charbon={charbon}
                course={course?.code ?? "-"}
                color={color}
                resourcesOpen={resourcesOpen}
                toggleResources={() => {
                    setShowResources(true);
                    setResourcesOpen(!resourcesOpen);
                }}
            />
            {showResources && (
                <LazyCardResources
                    charbonId={charbon.id}
                    isOpen={resourcesOpen}
                />
            )}

            <CardFooter
                actionneurs={actionneurs}
                timestamp={charbon.timestamp}
            />
        </div>
    );
};

export default memo(CharbonCard);
