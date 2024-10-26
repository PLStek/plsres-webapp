"use server";

import { AuthResponse, Payload } from "@lib/models/auth";
import {
    getActionneurByDiscordIdService,
    getActionneurByIdService,
} from "./actionneurService";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { Actionneur } from "@lib/models/actionneur";

const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const SECRET_KEY = process.env.SECRET_KEY;

//TODO: meilleur typage et vérifications
export const generateToken = async (code: string) => {
    const accessToken = await getDiscordAccessToken(code);
    await checkDiscordUserGuild(accessToken);
    const { id } = await getDiscordUser(accessToken);
    const actionneur = await getActionneurByDiscordIdService(id); //TODO: désactiver le cache pour cette requete
    const token = createToken(actionneur?.isAdmin ?? false, actionneur?.id);
    setToken(token);
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

const getDiscordAccessToken = async (code: string) => {
    if (!CLIENT_ID || !REDIRECT_URI || !CLIENT_SECRET) {
        //TODO: gérer variables d'env proprement
        throw new Error("Variables d'environnement manquantes");
    }

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            grant_type: "authorization_code",
            redirect_uri: REDIRECT_URI,
        }),
    });

    const tokenData = await tokenResponse.json();
    //TODO: validate data and throw
    return tokenData?.access_token;
};

const getDiscordUser = async (accessToken: string) => {
    const response = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const user = response.json();
    //TODO: validation
    return user;
};

const checkDiscordUserGuild = async (accessToken: string) => {
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const guilds = await response.json();
    if (!guilds.some((guild) => guild.id === GUILD_ID)) {
        throw new Error("User is not in the required guild");
    }
};

const createToken = (isAdmin: boolean, actionneurId?: number): string => {
    if (!SECRET_KEY) {
        throw new Error("Variables d'environnement manquantes");
    }

    const actionneurExp = Math.floor(Date.now() / 1000) + 3600 * 48;

    const payload: Payload = {
        actionneurId,
        isAdmin,
        actionneurExp,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });

    return token;
};

export const decodeToken = (token: string): Payload => {
    if (!SECRET_KEY) {
        throw new Error("Variables d'environnement manquantes");
    }

    try {
        const { actionneurId, isAdmin, actionneurExp } = jwt.verify(
            token,
            SECRET_KEY
        ) as JwtPayload;
        if (!isAdmin || !actionneurExp) throw new Error("Invalid token");
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
