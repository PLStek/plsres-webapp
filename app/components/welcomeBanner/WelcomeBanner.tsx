"use client";

import React from "react";
import Image from "next/image";
import charbonImage from "@images/charbon.svg";
import styles from "./WelcomeBanner.module.css";
import { authenticate, connect } from "@lib/services/auth";
import { useAuth } from "@app/hooks/useAuth";

const WelcomeBanner = () => {

    const {isVerified, isActionneur, isAdmin} = useAuth();
    console.log("isVerified", isVerified, "isActionneur", isActionneur, "isAdmin", isAdmin)

    const open = () => {
        const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;
        if (!clientId || !redirectUri) return;

        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&response_type=code&scope=identify%20guilds`;

        const authWindow = window.open(authUrl);

        const handleAuthMessage = async (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;

            const { code } = event.data;
            if (code) {
                window.removeEventListener("message", handleAuthMessage);
                authWindow?.close();
                await connect(code);
                console.log(authenticate())
            }
        };

        window.addEventListener("message", handleAuthMessage);

        const checkPopupClosed = setInterval(() => {
            if (authWindow && authWindow.closed) {
                clearInterval(checkPopupClosed);
                window.removeEventListener("message", handleAuthMessage);
            }
        }, 1000);

        //TODO: case where the popup is never closed
    };

    return (
        <div className={styles.wrapper}>
            <div className="flex-1">
                <h1 className="text-4xl flex justify-center font-bold text-gray-800 mb-4">
                    Bienvenue dans la mine du PL$tek
                </h1>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Notre mission ? T’aider à réussir tes UE !
                </h2>
                <p className="text-gray-700">
                    L’équipe du PL$tek est ravie de t’accueillir sur son nouveau
                    site: la mine ! Ici, tu retrouveras tous nos charbons,
                    accompagnés de leurs rediffusions et de leurs ressources,
                    telles que les corrections et les notes des actionneurs.
                </p>
            </div>
            <div className={styles.charbonImage}>
                <Image
                    src={charbonImage}
                    alt="Charbon PL$tek"
                    layout="responsive"
                    width={300}
                    height={300}
                    className="rounded-lg"
                />
            </div>
            <button onClick={() => open()}>Open</button>
        </div>
    );
};

export default WelcomeBanner;
