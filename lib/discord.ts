import { Client, GatewayIntentBits, Partials } from "discord.js";

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

export default discordClient;
