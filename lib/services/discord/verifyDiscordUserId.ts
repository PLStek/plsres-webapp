import discordClient from "@lib/discord";
import { ErrorMessages } from "@lib/utils/errorMessages";

export const verifyDiscordUserIdService = async (discordId: string) => {
    try {
        await discordClient.users.fetch(discordId);
    } catch {
        throw new Error(ErrorMessages.DiscordUserNotFound);
    }
};
