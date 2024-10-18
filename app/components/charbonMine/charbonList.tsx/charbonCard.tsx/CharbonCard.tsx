import type { Charbon } from "@lib/models/charbon";
import { useGetCourseById } from "@app/hooks/useCourses";
import { useGetActionneursByIds } from "@app/hooks/useActionneurs";
import {
    UserIcon,
    ClockIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";

const CharbonCard = ({
    charbon,
    isFirst,
    isLast,
}: {
    charbon: Charbon;
    isFirst: boolean;
    isLast: boolean;
}) => {
    const getCourseById = useGetCourseById();
    const getActionneursByIds = useGetActionneursByIds();
    const course = getCourseById(charbon.courseId);
    const actionneurs = getActionneursByIds(charbon.actionneurIds);

    const borderTopClass = isFirst ? "rounded-t-xl" : "";
    const borderBottomClass = isLast ? "rounded-b-xl" : "border-b-0";

    return (
        <div
            className={`relative p-6 overflow-hidden border border-gray-400 bg-white ${borderTopClass} ${borderBottomClass}`}
        >
            <div className="absolute top-0 left-0 h-full border-l-4 border-green-400"></div>

            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold">{charbon.name}</h2>
                    <p className="text-sm text-gray-600">
                        {charbon.description}
                    </p>
                </div>

                <div className="text-xs font-semibold py-1 px-3 rounded-full bg-green-100 text-green-700">
                    {course?.category}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-gray-500">
                <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">
                        {actionneurs.map((a) => a.username).join(", ")}
                    </span>
                </div>

                <div className="relative flex-grow">
                    <ChevronDownIcon className="absolute inset-x-0 mx-auto h-5 w-5 text-gray-500" />
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
        </div>
    );
};

export default CharbonCard;
