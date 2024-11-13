import { AuthContext } from "@app/context/AuthContext";
import { useContext, useState } from "react";
import {
    connectAction,
    authenticateAction,
    connectActionneurAction,
    disconnectAction,
    createActionneurInviteAction,
} from "@lib/actions";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    const { authData, setAuthData } = context;

    const [loading, setLoading] = useState(false);
    const isVerified = authData.isVerified;
    const isActionneur = !!authData.actionneurId;
    const isAdmin = authData.isAdmin;

    // TODO: add error callback
    const connect = async (callback?: () => void) => {
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
                setLoading(true);
                await connectAction(code);
                const authData = await authenticateAction();
                setAuthData(authData);
                setLoading(false);
                callback?.();
            }
        };

        window.addEventListener("message", handleAuthMessage);

        const checkPopupClosed = setInterval(() => {
            if (authWindow && authWindow.closed) {
                clearInterval(checkPopupClosed);
                window.removeEventListener("message", handleAuthMessage);
            }
        }, 1000);

        //TODO: handle other popup closing cases
    };

    const connectActionneur = async (secret: number) => {
        setLoading(true);
        await connectActionneurAction(secret);
        const authData = await authenticateAction();
        setAuthData(authData);
        setLoading(false);
    };

    const disconnect = async () => {
        setLoading(true);
        await disconnectAction();
        const authData = await authenticateAction();
        setAuthData(authData);
        setLoading(false);
    };

    return {
        connect,
        connectActionneur,
        disconnect,
        createActionneurInviteAction, //TODO: remove from here if invitation cache is implemented
        isVerified,
        isActionneur,
        isAdmin,
        loading,
    };
};
