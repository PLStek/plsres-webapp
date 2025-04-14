const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export const sendLogMessage = async (operation: string, userId: string) => {
    console.log(operation);
    const message = {
        embeds: [
            {
                title: "Opération effectuée",
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

    await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
};
