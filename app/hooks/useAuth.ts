import { useAuthContext } from "@app/context/AuthContext";
import { useState } from "react";
import {
    connectAction,
    authenticateAction,
    connectActionneurAction,
    disconnectAction,
    createActionneurInviteAction,
} from "@lib/actions";

export const useIsVerified = () => {
    const { authData } = useAuthContext();
    return [authData.isVerified] as const;
};

export const useIsActionneur = () => {
    const { authData } = useAuthContext();
    return [!!authData.actionneurId] as const;
};

export const useIsAdmin = () => {
    const { authData } = useAuthContext();
    return [authData.isAdmin] as const;
};

//TODO: maybe refactor to use a single hook for auth data

export const useConnect = () => {
    const { setAuthData } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

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

    return [connect, loading, error] as const;
};

export const useConnectActionneur = () => {
    const { setAuthData } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const connectActionneur = async (secret: number) => {
        try {
            setLoading(true);
            await connectActionneurAction(secret);
            const authData = await authenticateAction();
            setAuthData(authData);
            setLoading(false);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return [connectActionneur, loading, error] as const;
};

export const useDisconnect = () => {
    const { setAuthData } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const disconnect = async () => {
        try {
            setLoading(true);
            await disconnectAction();
            const authData = await authenticateAction();
            setAuthData(authData);
            setLoading(false);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return [disconnect, loading, error] as const;
};

export const useCreateActionneurInviteMutation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (discordId: string) => {
        try {
            setLoading(true);
            const link = await createActionneurInviteAction(discordId);
            setError(null);
            return link;
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return [mutate, loading, error] as const;
};
