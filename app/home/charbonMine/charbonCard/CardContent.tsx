import { PlayCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type CardContentProps = {
    title: string;
    course: string;
    description: string;
    color: "math" | "elec" | "info" | "meca" | "default";
};

const styles = {
    wrapper: "flex justify-between items-start",
    titleContainer: "flex items-center",
    title: "text-xl font-semibold",
    description: "text-sm text-gray-600 whitespace-pre-line",
    badge: "text-xs font-semibold py-1 px-3 rounded-full",
    badgeColor: {
        math: "bg-red-100 text-red-700 border border-red-400",
        elec: "bg-green-100 text-green-700 border border-green-400",
        info: "bg-yellow-100 text-yellow-600 border border-yellow-400",
        meca: "bg-blue-100 text-blue-700 border border-blue-400",
        default: "bg-gray-100 text-gray-700 border border-gray-400",
    },
};

const CardContent = ({
    title,
    course,
    description,
    color,
}: CardContentProps) => {
    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.titleContainer}>
                    <h2 className={styles.title}>{title}</h2>
                    <PlayCircleIcon className="h-5 w-5 ml-2" />
                </div>
                <p className={styles.description}>{description}</p>
            </div>

            <div className={clsx(styles.badge, styles.badgeColor[color])}>
                {course}
            </div>
        </div>
    );
};

export default CardContent;
