import discordClient from "@lib/discord";
import { ChannelType } from "discord.js";

const FEEDBACK_CHANNEL_ID = process.env.DISCORD_COMMUNICATION_CHANNEL_ID;

export const sendFeedback = async (message: string) => {
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
