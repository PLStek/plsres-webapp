"use client";

import { AuthData } from "@lib/models/auth";
import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
    authData: AuthData | undefined;
    setAuthData: (authData: AuthData) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

const AuthProvider = ({
    initialAuthData,
    children,
}: {
    initialAuthData?: AuthData;
    children: ReactNode;
}) => {
    const [authData, setAuthData] = useState(initialAuthData);

    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
