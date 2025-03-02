import { GuildScheduledEvent, PartialGuildScheduledEvent } from "discord.js";
import { getCourseByDiscordVoiceChannelIdService } from "../../course";
import { getActionneurByDiscordId } from "@lib/data/actionneur";
import { Charbon } from "@lib/models/charbon";
import {
    getCharbonByDiscordEventIdService,
    updateCharbonService,
} from "../../charbon/charbon";
import { sendFeedback } from "../utils/sendFeedback";
const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL;

const buildEventDeleteMessage = (charbon: Charbon, creatorId: string) => {
    const charbonUrl = `${WEBAPP_URL}?charbon=${charbon.id}`;
    return `<@${creatorId}>, le charbon [${charbon.title}](${charbonUrl}) vient d'être annulé.`;
};

export const guildScheduledEventDelete = async (
    event: GuildScheduledEvent | PartialGuildScheduledEvent
) => {
    const channelId = event.channelId;
    const creatorId = event.creatorId;
    const startAt = event.scheduledStartAt;
    if (!channelId || !creatorId || !startAt) {
        return;
    }
    const course = await getCourseByDiscordVoiceChannelIdService(channelId);
    if (!course) {
        return;
    }
    const actionneur = await getActionneurByDiscordId(creatorId);
    if (!actionneur) {
        return;
    }

    const charbon = await getCharbonByDiscordEventIdService(event.id);
    if (charbon) {
        await updateCharbonService(charbon.id, {
            isCancelled: true,
        });
        const message = buildEventDeleteMessage(charbon, creatorId);
        await sendFeedback(message);
    }
};
