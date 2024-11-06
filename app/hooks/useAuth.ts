import { AuthContext } from "@app/context/AuthContext";
import { authenticate } from "@lib/services/auth";
import { useContext, useState } from "react";
import {
    connect as connectService,
    disconnect as disconnectService,
} from "@lib/services/auth";
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

    const connect = async (code: string) => {
        setLoading(true);
        await connectService(code);
        const authData = await authenticate();
        setAuthData(authData);
        setLoading(false);
    };

    const disconnect = async () => {
        setLoading(true);
        await disconnectService();
        const authData = await authenticate();
        setAuthData(authData);
        setLoading(false);
    };

    return { connect, disconnect, isVerified, isActionneur, isAdmin, loading };
};
