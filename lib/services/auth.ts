"use server";

import { getActionneurByIdService } from "./actionneur";
import {
    checkDiscordUserGuild,
    getDiscordAccessToken,
    getDiscordUser,
    revokeDiscordAccessToken,
} from "./discord";
import {
    deleteExpiredTokens,
    getRevokedToken,
    postRevokedToken,
} from "@lib/data/auth";
import {
    getActionneurByDiscordId,
    getActionneurById,
} from "@lib/data/actionneur";
import { getCookie, removeTokenCookie, setCookie } from "@lib/utils/cookies";
import {
    createActionneurToken,
    createUserToken,
    decodeActionneurToken,
    decodeToken,
} from "@lib/utils/token";
import { verifySecret } from "@lib/utils/encryption";
import { cookies } from "next/headers";
import { AccessLevel, AuthData } from "@lib/models/auth";

//TODO: meilleur typage et vérifications
export const connect = async (code: string) => {
    const accessToken = await getDiscordAccessToken(code);
    await checkDiscordUserGuild(accessToken);
    const { id: discordId } = await getDiscordUser(accessToken);
    const actionneur = await getActionneurByDiscordId(discordId);
    const token = createUserToken(
        actionneur?.isAdmin ?? false,
        discordId,
        actionneur?.id
    );
    setCookie("user_token", token);
    await revokeDiscordAccessToken(token);
};

export const connectActionneur = async (secret: number) => {
    const userToken = getCookie("user_token");
    if (!userToken) {
        throw new Error("Couldn't find authentication token");
    }
    const { actionneurId } = decodeToken(userToken);
    if (!actionneurId) {
        throw new Error("User isn't an actionneur");
    }

    const actionneur = await getActionneurById(actionneurId);
    if (!actionneur) {
        //TODO: revoke ou refresh le user token + faire pareil si il n'est pas admin
        throw new Error("User isn't an actionneur");
    }

    verifySecret(secret, actionneur.secretHash);
    const actionneurToken = createActionneurToken(actionneurId);
    setCookie("actionneur_token", actionneurToken);
};

export const disconnect = async () => {
    const userToken = getCookie("user_token");
    const actionneurToken = getCookie("actionneur_token");
    console.log(cookies().getAll());
    if (userToken) {
        removeTokenCookie("user_token");
        revokeToken(userToken);
    }
    if (actionneurToken) {
        removeTokenCookie("actionneur_token");
        revokeToken(actionneurToken);
    }
};

export const authenticate = async (): Promise<AuthData> => {
    const userToken = getCookie("user_token");
    if (!userToken) {
        return {
            isVerified: false,
            actionneurId: undefined,
            isActionneurAuthentified: false,
            isAdmin: false,
            discordId: undefined,
            exp: 0,
        };
    }
    const revokedToken = await getRevokedToken(userToken);
    if (revokedToken) {
        removeTokenCookie("user_token");
        return {
            isVerified: false,
            actionneurId: undefined,
            isActionneurAuthentified: false,
            isAdmin: false,
            discordId: undefined,
            exp: 0,
        };
    }
    const payload = decodeToken(userToken); //TODO: cas ou le token a juste expiré
    const actionneurToken = getCookie("actionneur_token");

    let isActionneurAuthentified = false;
    if (actionneurToken) {
        decodeActionneurToken(actionneurToken);
        isActionneurAuthentified = true;
    }

    return { isVerified: true, isActionneurAuthentified, ...payload };
};

export const checkAuth = async () => {
    const token = getCookie("user_token");
    if (!token) {
        throw new Error("Couldn't find authentication token");
    }
    decodeToken(token);
};

export const checkActionneur = async (checkAdmin: boolean) => {
    const token = getCookie("actionneur_token");
    if (!token) {
        throw new Error("Couldn't find authentication token");
    }
    const { actionneurId } = decodeActionneurToken(token);
    if (!actionneurId) throw new Error("User isn't an actionneur");

    const actionneur = await getActionneurByIdService(actionneurId);
    if (!actionneur || !actionneur.isActive) {
        throw new Error("User isn't an actionneur");
    }
    if (checkAdmin && !actionneur.isAdmin) {
        throw new Error("User isn't admin");
    }
};

export const cleanExpiredTokens = async () => {
    const { count } = await deleteExpiredTokens();
    console.log("Cleaned ", count, " expired tokens");
};

export const revokeToken = async (token: string) => {
    const { exp } = decodeToken(token);
    const expiresAt = new Date(exp);
    await postRevokedToken({ token, expiresAt });
};

export const withAuth =
    (accesLevel: AccessLevel) =>
    async (fn: Function) =>
    async (...args: unknown[]) => {
        try {
            if (accesLevel !== "none") {
                await checkAuth();
                if (accesLevel === "actionneur" || accesLevel === "admin") {
                    await checkActionneur(accesLevel === "admin");
                }
            }
        } catch (e) {
            return {
                error: e instanceof Error ? e.message : "Erreur inconnue",
            };
        }
        return fn(...args);
    };
