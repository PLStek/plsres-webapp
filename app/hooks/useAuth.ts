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

export const useIsActionneurAuthentified = () => {
    //TODO: change ?
    const { authData } = useAuthContext();
    return [!!authData.isActionneurAuthentified] as const;
};

//TODO: maybe refactor to use a single hook for auth data

export const useConnect = () => {
    const { setAuthData } = useAuthContext();
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
                const { error: connectionError } = await connectAction(code);
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
                setError(authError);
                callback?.();
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

    return [connect, loading, error] as const;
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

    return [authenticate, loading, error] as const;
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

    return [connectActionneur, loading, error] as const;
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

    return [disconnect, loading, error] as const;
};

export const useCreateActionneurInviteMutation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (discordId: string) => {
        setLoading(true);
        const { data: link, error } = await createActionneurInviteAction(
            discordId
        );
        setError(error);
        setLoading(false);
        return link;
    };

    return [mutate, loading, error] as const;
};
