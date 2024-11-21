import { ChannelType, GuildScheduledEvent } from "discord.js";
import { getCourseByDiscordVoiceChannelIdService } from "../../course";
import { getActionneurByDiscordId } from "@lib/data/actionneur";
import { Charbon, CharbonCreateInput } from "@lib/models/charbon";
import { createCharbonDraftService } from "../../charbon";
import discordClient from "@lib/discord";

const FEEDBACK_CHANNEL_ID = process.env.DISCORD_COMMUNICATION_CHANNEL_ID;
const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL;

const sendFeedback = async (message: string) => {
    if (!FEEDBACK_CHANNEL_ID) {
        throw new Error(
            "Missing environment variable DISCORD_COMMUNICATION_CHANNEL_ID"
        );
    }

    const feedbackChannel = await discordClient.channels.fetch(
        FEEDBACK_CHANNEL_ID
    );
    if (!feedbackChannel || feedbackChannel.type !== ChannelType.GuildText) {
        return;
    }
    await feedbackChannel.send(message);
};

const buildEventMessage = (charbon: Charbon) => {
    if (!WEBAPP_URL) {
        throw new Error("Missing environment variable NEXT_PUBLIC_WEBAPP_URL");
    }
    const charbonUrl = `${WEBAPP_URL}?charbon=${charbon.id}`;
    return `Un charbon a été créé : ${charbon.name} - [Voir le charbon](${charbonUrl})`;
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

    const newCharbonPostData: CharbonCreateInput = {
        courseId: course.id,
        actionneurId: actionneur.id,
        description: event.description ?? "",
        name: event.name,
        timestamp: startAt,
        discordEventId: event.id,
    };
    const newCharbon = await createCharbonDraftService(newCharbonPostData);
    const message = buildEventMessage(newCharbon);
    await sendFeedback(message);
};
