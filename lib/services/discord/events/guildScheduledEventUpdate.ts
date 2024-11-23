import { Charbon } from "@lib/models/charbon";
import { getActionneursByIdsService } from "@lib/services/actionneur";
import {
    finishCharbonService,
    getCharbonByDiscordEventIdService,
    startCharbonService,
} from "@lib/services/charbon/charbon";
import {
    GuildScheduledEvent,
    GuildScheduledEventStatus,
    PartialGuildScheduledEvent,
} from "discord.js";
import { sendFeedback } from "../utils/sendFeedback";

const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL;

const onEventStart = async (event: GuildScheduledEvent) => {
    const charbon = await getCharbonByDiscordEventIdService(event.id);
    if (!charbon || charbon.status !== "SCHEDULED") {
        return;
    }
    startCharbonService(charbon.id);
};

const buildEventEndMessage = (
    charbon: Charbon,
    actionneurDiscordIds: string[]
) => {
    if (!WEBAPP_URL) {
        throw new Error("Missing environment variable NEXT_PUBLIC_WEBAPP_URL");
    }
    const charbonUrl = `${WEBAPP_URL}?charbon=${charbon.id}`;
    const tags = actionneurDiscordIds.map((id) => `<@${id}>`).join(" ");

    return `${tags} le charbon [${charbon.name}](${charbonUrl}) s'est terminé avec succès ! Merci d'ajouter ses ressources en cliquant sur ce lien.`;
};

const onEventEnd = async (event: GuildScheduledEvent) => {
    const charbon = await getCharbonByDiscordEventIdService(event.id);
    if (!charbon || charbon.status !== "ONGOING") {
        return;
    }

    const actionneurs = await getActionneursByIdsService(charbon.actionneurIds);
    const actionneurDiscordIds = actionneurs.map(
        (actionneur) => actionneur.discordId
    );
    const message = buildEventEndMessage(charbon, actionneurDiscordIds);
    sendFeedback(message);
    await finishCharbonService(charbon.id);
};

export const guildScheduledEventUpdate = async (
    oldEvent: GuildScheduledEvent | PartialGuildScheduledEvent | null,
    newEvent: GuildScheduledEvent
) => {
    if (!oldEvent || oldEvent.partial) {
        return;
    } else if (
        oldEvent?.status == GuildScheduledEventStatus.Scheduled &&
        newEvent.status == GuildScheduledEventStatus.Active
    ) {
        onEventStart(newEvent);
    } else if (
        oldEvent?.status == GuildScheduledEventStatus.Active &&
        newEvent.status == GuildScheduledEventStatus.Completed
    ) {
        onEventEnd(newEvent);
    }
};
