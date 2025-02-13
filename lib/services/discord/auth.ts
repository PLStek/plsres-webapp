import { ErrorMessages } from "@lib/utils/errorMessages";

const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

export const getDiscordAccessTokenService = async (code: string) => {
    const response = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            grant_type: "authorization_code",
            redirect_uri: REDIRECT_URI,
        }),
    });

    const tokenData = await response.json();
    //TODO: validate data and throw
    return tokenData?.access_token;
};

export const revokeDiscordAccessTokenService = async (accessToken: string) => {
    await fetch("https://discord.com/api/oauth2/token/revoke", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            token: accessToken,
            token_type_hint: "access_token",
        }),
    });
};

export const getDiscordUserService = async (accessToken: string) => {
    const response = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const user = response.json();
    //TODO: validation
    return user;
};

export const checkDiscordUserGuildService = async (accessToken: string) => {
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const guilds = (await response.json()) as { id: string }[];

    if (!guilds.some((guild) => guild.id === GUILD_ID)) {
        throw new Error(ErrorMessages.DiscordUserNotInGuild);
    }
};
