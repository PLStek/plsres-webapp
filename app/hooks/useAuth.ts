import { AuthContext } from "@app/context/AuthContext";
import { authenticate, connect } from "@lib/services/auth";
import { revokeDiscordAccessToken } from "@lib/services/discord";
import { useContext, useState } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    const { authData, setAuthData } = context;

    const [loading, setLoading] = useState(false);
    const isVerified = !!authData;
    const isActionneur = !!(authData && authData.actionneurId);
    const isAdmin = !!(authData && authData.isAdmin);

    const auth = async (code: string) => {
        setLoading(true);
        await connect(code);
        const authData = authenticate();
        setAuthData(authData);
        setLoading(false);
    };

    const disconnect = async () => {
        setLoading(false);
        await revokeDiscordAccessToken();
    };

    return { auth, isVerified, isActionneur, isAdmin, loading };
};
