import { Client, GatewayIntentBits, Partials } from "discord.js";
import {
    initDiscordClient,
    stopDiscordClient,
} from "./services/discord/client";

const globalForDiscord = globalThis as unknown as {
    discordClient?: Client;
};

export const discordClient: Client =
    globalForDiscord.discordClient ||
    new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildScheduledEvents,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates,
        ],
        partials: [Partials.Message, Partials.Channel],
    });

if (process.env.NODE_ENV !== "production") {
    globalForDiscord.discordClient = discordClient;
}

if (!discordClient.isReady()) {
    await initDiscordClient();

    const shutdown = async () => {
        await stopDiscordClient();
        process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
}

export default discordClient;
