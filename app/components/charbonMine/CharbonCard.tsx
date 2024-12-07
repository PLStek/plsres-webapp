"use client";

import type { Charbon } from "@lib/models/charbon";
import {
    UserIcon,
    ClockIcon,
    ChevronDownIcon,
    PlayCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCourseByIdQuery } from "@app/hooks/useCourses";
import { useActionneursByIdsQuery } from "@app/hooks/useActionneurs";

const CharbonCard = ({
    charbon,
    isFirst,
    isLast,
}: {
    charbon: Charbon;
    isFirst: boolean;
    isLast: boolean;
}) => {
    const [actionneurs] = useActionneursByIdsQuery(charbon.actionneurIds);
    const [course] = useCourseByIdQuery(charbon.courseId);

    const borderTopClass = isFirst ? "rounded-t-xl" : "";
    const borderBottomClass = isLast ? "rounded-b-xl" : "border-b-0";

    const colorClass = course?.category?.toLowerCase() || "default";

    return (
        <div
            className={clsx(
                "relative p-5 overflow-hidden border border-gray-300 bg-[#F6F6F6]",
                borderTopClass,
                borderBottomClass
            )}
        >
            <div
                className={clsx("absolute top-0 left-0 h-full border-l-4", {
                    "border-red-400": colorClass === "math",
                    "border-green-400": colorClass === "elec",
                    "border-yellow-400": colorClass === "info",
                    "border-blue-400": colorClass === "meca",
                })}
            ></div>

            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center">
                        <h2 className="text-xl font-semibold">{charbon.name}</h2>
                        <PlayCircleIcon className="h-5 w-5 ml-2" />
                    </div>
                    <p className="text-sm text-gray-600">
                        {charbon.description}
                    </p>
                </div>

                <div
                    className={clsx(
                        "text-xs font-semibold py-1 px-3 rounded-full",
                        {
                            "bg-red-100 text-red-700 border border-red-400": colorClass === "math",
                            "bg-green-100 text-green-700 border border-green-400":
                                colorClass === "elec",
                            "bg-yellow-100 text-yellow-600 border border-yellow-400":
                                colorClass === "info",
                            "bg-blue-100 text-blue-700 border border-blue-400": colorClass === "meca",
                        }
                    )}
                >
                    {course?.code}
                </div>
            </div>

            <div className="relative mt-4 flex items-center justify-between text-gray-500">
                <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">
                        {actionneurs.map((a) => a.username).join(", ")}
                    </span>
                </div>

                <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">
                        {new Date(charbon.timestamp).toLocaleDateString(
                            "fr-FR",
                            {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )}
                    </span>
                </div>
            </div>
            <ChevronDownIcon className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
    );
};

export default CharbonCard;
