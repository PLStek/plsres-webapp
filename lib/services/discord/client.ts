import { discordClient } from "@lib/discord";

export const initDiscordClient = async () => {
    if (discordClient.isReady()) {
        return;
    }
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
};

export const stopDiscordClient = async () => {
    console.log("Arrêt du client discord...");
    await discordClient.destroy();
};
