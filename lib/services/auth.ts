"use server";

import { AuthData } from "@lib/models/auth";
import {
    getActionneurByDiscordIdService,
    getActionneurByIdService,
} from "./actionneur";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import {
    checkDiscordUserGuild,
    getDiscordAccessToken,
    getDiscordUser,
    revokeDiscordAccessToken,
} from "./discord";

const SECRET_KEY = process.env.TOKEN_SECRET;

//TODO: meilleur typage et vérifications
export const generateToken = async (code: string) => {
    const accessToken = await getDiscordAccessToken(code);
    await checkDiscordUserGuild(accessToken);
    const { id } = await getDiscordUser(accessToken);
    const actionneur = await getActionneurByDiscordIdService(id); //TODO: désactiver le cache pour cette requete
    const token = createToken(actionneur?.isAdmin ?? false, actionneur?.id);
    setToken(token);
    await revokeDiscordAccessToken(token);
};

export const authenticate = () => {
    const token = getToken();
    if (!token) {
        throw new Error("Couldn't find authentication token");
    }
    return decodeToken(token);
};

export const checkActionneur = async (checkAdmin: boolean) => {
    const { actionneurId } = authenticate();
    if (!actionneurId) {
        throw new Error("User isn't an actionneur");
    }
    const actionneur = await getActionneurByIdService(actionneurId);
    if (!actionneur || !actionneur.isActive) {
        throw new Error("User isn't an actionneur");
    }
    if (checkAdmin && !actionneur.isAdmin) {
        throw new Error("User isn't admin");
    }
};

const createToken = (isAdmin: boolean, actionneurId?: number): string => {
    if (!SECRET_KEY) {
        throw new Error("Variables d'environnement manquantes");
    }

    const actionneurExp = Math.floor(Date.now() / 1000) + 3600 * 48;

    const payload: AuthData = {
        actionneurId,
        isAdmin,
        actionneurExp,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });

    return token;
};

const decodeToken = (token: string): AuthData => {
    if (!SECRET_KEY) {
        throw new Error("Variables d'environnement manquantes");
    }

    try {
        const { actionneurId, isAdmin, actionneurExp } = jwt.verify(
            token,
            SECRET_KEY
        ) as JwtPayload;
        return { actionneurId, isAdmin, actionneurExp };
    } catch {
        throw new Error("Invalid token");
    }
};

const getToken = () => cookies().get("token")?.value;

const setToken = (token: string) =>
    cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 3600 * 24 * 30,
    });
