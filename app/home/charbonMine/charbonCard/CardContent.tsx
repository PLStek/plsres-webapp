import Icon from "@app/home/components/Icon";
import { useEditCharbonDrawer } from "@app/home/modals/editCharbonDrawer/EditCharbonDrawer";
import {
    useIsActionneur,
    useIsActionneurAuthentified,
    useIsVerified,
} from "@app/hooks/useAuth";
import {
    ArchiveBoxIcon,
    Cog6ToothIcon,
    PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { Charbon } from "@lib/models/charbon";
import clsx from "clsx";

type CardContentProps = {
    charbon: Charbon;
    course: string;
    color: "math" | "elec" | "info" | "meca" | "default";
    resourcesOpen: boolean;
    toggleResources: () => void;
};

const styles = {
    wrapper: "flex justify-between items-start",
    titleContainer: "flex items-center w-full justify-between mb-1",
    title: "text-xl font-semibold text-center",
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
    charbon,
    course,
    color,
    resourcesOpen,
    toggleResources,
}: CardContentProps) => {
    const { onOpen: onEditModalOpen } = useEditCharbonDrawer();

    const [isVerified] = useIsVerified();
    const [isActionneur] = useIsActionneur();

    return (
        <div>
            <div className={styles.titleContainer}>
                <p className={styles.title}>{charbon.title}</p>
                <div className="flex gap-4 items-center">
                    <div
                        className={clsx(
                            resourcesOpen
                                ? "flex gap-2 opacity-100"
                                : "flex gap-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        )}
                    >
                        <Icon
                            onClick={() => {
                                if (isVerified) {
                                    toggleResources();
                                }
                            }}
                            tooltipContent={
                                charbon.resourcesCount
                                    ? ""
                                    : "Aucune ressource disponible"
                            }
                            disabled={!charbon.resourcesCount}
                        >
                            <ArchiveBoxIcon />
                        </Icon>
                        <Icon
                            onClick={() => {}}
                            disabled={!charbon.resourcesCount}
                        >
                            <PlayCircleIcon />
                        </Icon>
                        {isActionneur && (
                            <Icon
                                onClick={() => {
                                    onEditModalOpen(charbon.id);
                                }}
                            >
                                <Cog6ToothIcon />
                            </Icon>
                        )}
                    </div>
                    <div
                        className={clsx(styles.badge, styles.badgeColor[color])}
                    >
                        {course}
                    </div>
                </div>
            </div>
            <p className={styles.description}>{charbon.description}</p>
        </div>
    );
};

export default CardContent;
