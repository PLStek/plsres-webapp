import { Charbon } from "@lib/models/charbon";
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
import { getActionneursByCharbonId } from "@lib/data/actionneur";

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
    const charbonUrl = `${WEBAPP_URL}?charbon=${charbon.id}`;
    const tags = actionneurDiscordIds.map((id) => `<@${id}>`).join(" ");

    return `${tags} le charbon [${charbon.title}](${charbonUrl}) s'est terminé avec succès ! Merci d'ajouter ses ressources en cliquant sur ce lien.`;
};

const onEventEnd = async (event: GuildScheduledEvent) => {
    const charbon = await getCharbonByDiscordEventIdService(event.id);
    if (!charbon || charbon.status !== "ONGOING") {
        return;
    }

    const actionneurs = await getActionneursByCharbonId(charbon.id);
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
