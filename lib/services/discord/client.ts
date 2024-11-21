import { discordClient } from "@lib/discord";
import { guildScheduledEventCreate } from "./events/guildScheduledEventCreate";
import { voiceStateUpdate } from "./events/voiceStateUpdate";

export const initDiscordClient = async () => {
    await discordClient.login(process.env.DISCORD_BOT_TOKEN);

    discordClient.on("ready", () => {
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

    discordClient.on("voiceStateUpdate", voiceStateUpdate);
};

export const stopDiscordClient = async () => {
    console.log("Arrêt du client discord...");
    await discordClient.destroy();
};
