import { useAuthContext } from "@app/context/AuthContext";
import { useEffect, useState } from "react";
import {
    connectAction,
    authenticateAction,
    connectActionneurAction,
    disconnectAction,
    connectFromDiscordIdAction,
} from "@lib/actions";
import { AuthState } from "@lib/models/auth";
import { addToast } from "@heroui/react";

export const useIsVerified = () => {
    const { authData } = useAuthContext();
    return authData.isVerified;
};

export const useIsActionneur = () => {
    const { authData } = useAuthContext();
    return !!authData.actionneurId;
};

export const useIsAdmin = () => {
    const { authData } = useAuthContext();
    return authData.isAdmin;
};

export const useIsActionneurAuthentified = () => {
    //TODO: change ?
    const { authData } = useAuthContext();
    return !!authData.isActionneurAuthentified;
};

//TODO: maybe refactor to use a single hook for auth data

export const useConnect = () => {
    const { setAuthData } = useAuthContext();
    const [data, setData] = useState<AuthState | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connect = async (callback?: () => void) => {
        const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;

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
                const { data: connectionData, error: connectionError } =
                    await connectAction(code);
                setData(connectionData);
                if (connectionError) {
                    setError(connectionError);
                    setLoading(false);
                    return;
                }

                const { data: authData, error: authError } =
                    await authenticateAction();

                if (authData) {
                    setAuthData(authData);
                }
                callback?.();
                setError(authError);
                setLoading(false);
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

    useEffect(() => {
        if (error) {
            addToast({
                title: error,
                color: "danger",
            });
        }
    }, [error]);

    return { connect, data, loading, error };
};

export const useConnectFromDiscordId = () => {
    const { setAuthData } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connect = async (discordId: string, callback?: () => void) => {
        setLoading(true);
        const { error: connectionError } = await connectFromDiscordIdAction(
            discordId
        );
        if (connectionError) {
            setError(connectionError);
            setLoading(false);
            return;
        }
        const { data: authData, error: authError } = await authenticateAction();
        if (authData) {
            setAuthData(authData);
        }
        callback?.();
        setError(authError);
        setLoading(false);
    };

    return { connect, loading, error };
};

export const useAuthenticate = () => {
    const { setAuthData } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authenticate = async () => {
        setLoading(true);
        const { data: authData, error } = await authenticateAction();
        if (authData) {
            setAuthData(authData);
        }
        setError(error);
        setLoading(false);
    };

    return { authenticate, loading, error };
};

export const useConnectActionneur = () => {
    const { setAuthData } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connectActionneur = async (secret: string) => {
        setLoading(true);
        const { error: connectionError } = await connectActionneurAction(
            secret
        );
        if (connectionError) {
            setError(connectionError);
            setLoading(false);
            return;
        }
        const { data: authData, error: authError } = await authenticateAction();
        if (authData) {
            setAuthData(authData);
        }
        setError(authError);
        setLoading(false);
    };

    return { connectActionneur, loading, error };
};

export const useDisconnect = () => {
    const { setAuthData } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const disconnect = async () => {
        setLoading(true);
        const { error: disconnectError } = await disconnectAction();
        if (disconnectError) {
            setError(disconnectError);
            setLoading(false);
            return;
        }
        const { data: authData, error: authError } = await authenticateAction();
        if (authData) {
            setAuthData(authData);
        }
        setError(authError);
        setLoading(false);
    };

    return { disconnect, loading, error };
};
