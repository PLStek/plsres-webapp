export const formatDate = (date: Date, showHour = true): string => {
    const dateString = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    if (!showHour) {
        return dateString;
    }

    const timeString = date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${dateString} à ${timeString}`;
};
