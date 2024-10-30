"use server";

import { getActionneurByIdService } from "./actionneur";
import {
    checkDiscordUserGuild,
    getDiscordAccessToken,
    getDiscordUser,
    revokeDiscordAccessToken,
} from "./discord";
import { deleteExpiredTokens, postRevokedToken } from "@lib/data/auth";
import { getActionneurById } from "@lib/data/actionneur";
import { getCookie, removeTokenCookie, setCookie } from "@lib/utils/cookies";
import {
    createActionneurToken,
    createUserToken,
    decodeActionneurToken,
    decodeToken,
} from "@lib/utils/token";
import { verifySecret } from "@lib/utils/encryption";

//TODO: meilleur typage et vérifications
export const connect = async (code: string) => {
    const accessToken = await getDiscordAccessToken(code);
    await checkDiscordUserGuild(accessToken);
    const { id } = await getDiscordUser(accessToken);
    const actionneur = await getActionneurByIdService(id);
    const token = createUserToken(actionneur?.isAdmin ?? false, actionneur?.id);
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
    if (userToken) {
        removeTokenCookie("user_token");
        revokeToken(userToken);
    }
    if (actionneurToken) {
        removeTokenCookie("actionneur_token");
        revokeToken(actionneurToken);
    }
};

export const authenticate = () => {
    const token = getCookie("user_token");
    if (!token) {
        throw new Error("Couldn't find authentication token");
    }
    return decodeToken(token);
};

/* export const authenticateActionneur = async () => {
    const token = getCookie("actionneur_token");
    if (!token) {
        throw new Error("Couldn't find authentication token");
    }

    const { actionneurId } = decodeActionneurToken(token);
    if (!actionneurId) {
        removeTokenCookie("actionneur_token");
        throw new Error("User isn't an actionneur");
    }

    const actionneur = await getActionneurByIdService(actionneurId);
    if (!actionneur || !actionneur.isActive) {
        removeTokenCookie("actionneur_token");
        throw new Error("User isn't an actionneur");
    }
    return;
}; */

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
