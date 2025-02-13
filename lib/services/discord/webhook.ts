const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export const sendLogMessage = (operation: string, userId: string) => {
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

    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
};
