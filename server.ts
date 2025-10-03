import { createServer } from "http";
import { parse } from "url";
import next from "next";
import "./lib/prisma.ts";
import { initDiscordClient } from "./lib/services/discord/init.js";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const environnementVariables = [
    "TOKEN_SECRET",
    "PEPPER",
    "NEXT_PUBLIC_DISCORD_CLIENT_ID",
    "NEXT_PUBLIC_DISCORD_REDIRECT_URI",
    "DISCORD_CLIENT_SECRET",
    "DISCORD_GUILD_ID",
    "DISCORD_WEBHOOK_URL",
    "DISCORD_COMMUNICATION_CHANNEL_ID",
    "DISCORD_BOT_TOKEN",
    "NEXT_PUBLIC_WEBAPP_URL",
    "TURSO_AUTH_TOKEN",
    "TURSO_DATABASE_URL",
    "LOCAL_DATABASE_URL",
];

app.prepare().then(() => {
    environnementVariables.forEach((key) => {
        if (!process.env[key]) {
            console.error(`Missing environnment variable '${key}'.`);
            process.exit(1);
        }
    });

    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url || "", true);
        handle(req, res, parsedUrl);
    });

    server.listen(port, async () => {
        console.log(
            `> Server listening at http://localhost:${port} as ${
                dev ? "development" : process.env.NODE_ENV
            }`
        );

        try {
            await initDiscordClient();
        } catch (error) {
            console.error("Erreur lors de l'initialisation de Discord:", error);
        }
    });
});
