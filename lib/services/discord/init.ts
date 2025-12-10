import { discordClient } from "@lib/discord";
import { guildScheduledEventCreate } from "./events/guildScheduledEventCreate";
import { voiceStateUpdate } from "./events/voiceStateUpdate";
import { guildScheduledEventUpdate } from "./events/guildScheduledEventUpdate";
import { guildScheduledEventDelete } from "./events/guildScheduledEventDelete";

let isInitialized = false;

export const initDiscordClient = async () => {
    if (isInitialized || discordClient.isReady()) {
        return;
    }

    isInitialized = true;

    await discordClient.login(process.env.DISCORD_BOT_TOKEN);

    discordClient.on("clientReady", () => {
        console.log(
            `Bot Discord connecté en tant que ${discordClient.user?.tag}`
        );
    });

    discordClient.on("messageCreate", (message) => {
        if (message.content === "ping") {
            message.reply("Pong!");
        }
    });

    discordClient.on("guildScheduledEventCreate", guildScheduledEventCreate);
    discordClient.on("guildScheduledEventUpdate", guildScheduledEventUpdate);
    discordClient.on("guildScheduledEventDelete", guildScheduledEventDelete);
    discordClient.on("voiceStateUpdate", voiceStateUpdate);

    const shutdown = async () => {
        console.log("Arrêt du client discord...");
        await discordClient.destroy();
        process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
};

export const stopDiscordClient = async () => {
    if (!discordClient.isReady()) {
        return;
    }

    console.log("Arrêt du client discord...");
    await discordClient.destroy();
};
