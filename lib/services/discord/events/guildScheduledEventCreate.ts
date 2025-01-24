import { GuildScheduledEvent } from "discord.js";
import { getCourseByDiscordVoiceChannelIdService } from "../../course";
import { getActionneurByDiscordId } from "@lib/data/actionneur";
import { Charbon } from "@lib/models/charbon";
import { createCharbonService } from "../../charbon/charbon";
import { sendFeedback } from "../utils/sendFeedback";
const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL;

const buildEventMessage = (charbon: Charbon, creatorId: string) => {
    if (!WEBAPP_URL) {
        throw new Error("Missing environment variable NEXT_PUBLIC_WEBAPP_URL");
    }
    const charbonUrl = `${WEBAPP_URL}?charbon=${charbon.id}`;
    return `<@${creatorId}>, le charbon [${charbon.title}](${charbonUrl}) a été ajouté en brouillon ! Merci de finaliser sa création en cliquant sur ce lien.`;
};

export const guildScheduledEventCreate = async (event: GuildScheduledEvent) => {
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

    const newCharbonPostData = {
        courseId: course.id,
        actionneurId: actionneur.id,
        description: event.description ?? "",
        title: event.name,
        timestamp: startAt,
        discordEventId: event.id,
    };
    const newCharbon = await createCharbonService(newCharbonPostData);
    const message = buildEventMessage(newCharbon, creatorId);
    await sendFeedback(message);
};
