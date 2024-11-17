const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export const sendLogMessage = async (operation: string, userId: string) => {
    if (!WEBHOOK_URL) {
        throw new Error("Missing Discord Webhook URL");
    }

    const message = {
        content: `<@${userId}> a effectué une opération.`,
        embeds: [
            {
                title: "Log d'opération",
                color: 5814783, // Vous pouvez changer la couleur
                fields: [
                    {
                        name: "Utilisateur",
                        value: `<@${userId}>`,
                        inline: true,
                    },
                    {
                        name: "Opération",
                        value: operation,
                        inline: true,
                    },
                    {
                        name: "Heure",
                        value: new Date().toLocaleString(),
                        inline: true,
                    },
                ],
            },
        ],
    };

    const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
    console.log("Log message sent", res);
};
