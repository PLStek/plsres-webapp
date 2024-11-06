import { AuthData } from "@lib/models/auth";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.TOKEN_SECRET;

export const createUserToken = (
    isAdmin: boolean,
    actionneurId?: number
): string => {
    if (!SECRET_KEY) {
        throw new Error("Variables d'environnement manquantes");
    }

    const token = jwt.sign({ actionneurId, isAdmin }, SECRET_KEY, {
        expiresIn: "30d",
    });

    return token;
};

export const createActionneurToken = (actionneurId: number): string => {
    if (!SECRET_KEY) {
        throw new Error("Variables d'environnement manquantes");
    }
    const token = jwt.sign({ actionneurId }, SECRET_KEY, { expiresIn: "1d" });

    return token;
};

export const decodeToken = (token: string) => {
    if (!SECRET_KEY) {
        throw new Error("Variables d'environnement manquantes");
    }

    try {
        const { actionneurId, isAdmin, exp } = jwt.verify(
            token,
            SECRET_KEY
        ) as JwtPayload;
        if (!exp) throw new Error("Invalid token");
        return { actionneurId, isAdmin, exp };
    } catch {
        throw new Error("Invalid token");
    }
};

export const decodeActionneurToken = (token: string) => {
    if (!SECRET_KEY) {
        throw new Error("Variables d'environnement manquantes");
    }
    try {
        const { exp, actionneurId } = jwt.verify(
            token,
            SECRET_KEY
        ) as JwtPayload;
        if (!exp || !actionneurId) throw new Error("Invalid token");
        return { exp, actionneurId };
    } catch {
        throw new Error("Invalid token");
    }
};
