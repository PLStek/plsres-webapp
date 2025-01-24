import { UserIcon, ClockIcon, CalendarDateRangeIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { Actionneur } from "@lib/models/actionneur";

type CardFooterProps = {
    actionneurs: Actionneur[];
    timestamp: Date;
};

const styles = {
    footer: "relative mt-4 flex items-center justify-between text-gray-400",
    iconTextContainer: "flex items-center",
    icon: "h-5 w-5 mr-1",
};  

const CardFooter = ({ actionneurs, timestamp }: CardFooterProps) => {
    return (
        <div className={styles.footer}>
            <div className={styles.iconTextContainer}>
                <UserIcon className={styles.icon} />
                <span className="text-sm">
                    {actionneurs.map((a) => a.username).join(", ")}
                </span>
            </div>

            <div className={styles.iconTextContainer}>
                <CalendarIcon className={styles.icon} />
                <span className="text-sm">
                    {new Date(timestamp).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
        </div>
    );
};

export default CardFooter;
