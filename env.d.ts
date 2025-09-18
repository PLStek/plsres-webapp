declare namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends Record<EnvKeys, string> {
        TOKEN_SECRET: string;
        PEPPER: string;
        NEXT_PUBLIC_DISCORD_CLIENT_ID: string;
        NEXT_PUBLIC_DISCORD_REDIRECT_URI: string;
        DISCORD_CLIENT_SECRET: string;
        DISCORD_GUILD_ID: string;
        DISCORD_WEBHOOK_URL: string;
        DISCORD_COMMUNICATION_CHANNEL_ID: string;
        DISCORD_BOT_TOKEN: string;
        NEXT_PUBLIC_WEBAPP_URL: string;
    }
}
