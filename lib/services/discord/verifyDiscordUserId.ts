import discordClient from "@lib/discord";

export const verifyDiscordUserIdService = async (discordId: string) => {
    try {
        await discordClient.users.fetch(discordId);
    } catch {
        throw new Error("Couldn't find user with this ID");
    }
};
