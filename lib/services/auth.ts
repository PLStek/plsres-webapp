import {
    checkDiscordUserGuildService,
    getDiscordAccessTokenService,
    getDiscordUserService,
    revokeDiscordAccessTokenService,
} from "./discord/auth";
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
import { AuthData } from "@lib/models/auth";

//TODO: meilleur typage et vérifications
export const connectService = async (code: string) => {
    const accessToken = await getDiscordAccessTokenService(code);
    await checkDiscordUserGuildService(accessToken);
    const { id: discordId } = await getDiscordUserService(accessToken);
    const actionneur = await getActionneurByDiscordId(discordId);
    const token = createUserToken({
        isAdmin: actionneur?.isAdmin ?? false,
        discordId,
        actionneurId: actionneur?.id,
    });
    setCookie("user_token", token);
    await revokeDiscordAccessTokenService(token);
};

export const connectActionneurService = async (secret: number) => {
    const userToken = await getCookie("user_token");
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

export const disconnectService = async () => {
    const userToken = await getCookie("user_token");
    const actionneurToken = await getCookie("actionneur_token");
    if (userToken) {
        removeTokenCookie("user_token");
        revokeTokenService(userToken);
    }
    if (actionneurToken) {
        removeTokenCookie("actionneur_token");
        revokeTokenService(actionneurToken);
    }
};

export const authenticateService = async (): Promise<AuthData> => {
    const userToken = await getCookie("user_token");
    if (!userToken) {
        return {
            isVerified: false,
            actionneurId: null,
            isActionneurAuthentified: false,
            isAdmin: false,
            discordId: null,
            exp: 0,
        };
    }
    const revokedToken = await getRevokedToken(userToken);
    if (revokedToken) {
        removeTokenCookie("user_token");
        return {
            isVerified: false,
            actionneurId: null,
            isActionneurAuthentified: false,
            isAdmin: false,
            discordId: null,
            exp: 0,
        };
    }
    const payload = decodeToken(userToken); //TODO: cas ou le token a juste expiré
    const actionneurToken = await getCookie("actionneur_token");

    let isActionneurAuthentified = false;
    if (actionneurToken) {
        decodeActionneurToken(actionneurToken);
        isActionneurAuthentified = true;
    }

    return { isVerified: true, isActionneurAuthentified, ...payload };
};

export const refreshAuthService = async (
    newActionneurId?: number | null
): Promise<AuthData> => {
    const token = await getCookie("user_token");
    if (!token) {
        throw new Error("Couldn't find authentication token");
    }
    const { actionneurId, isAdmin, discordId } = decodeToken(token);
    const newToken = createUserToken({
        isAdmin,
        discordId,
        actionneurId:
            newActionneurId === null
                ? undefined
                : newActionneurId ?? actionneurId ?? undefined,
    });
    setCookie("user_token", newToken);
    revokeTokenService(token);

    const payload = decodeToken(newToken);
    const actionneurToken = await getCookie("actionneur_token");

    let isActionneurAuthentified = false;
    if (actionneurToken) {
        decodeActionneurToken(actionneurToken);
        isActionneurAuthentified = true;
    }

    return { isVerified: true, isActionneurAuthentified, ...payload };
};

export const checkAuthService = async () => {
    const token = await getCookie("user_token");
    if (!token) {
        throw new Error("Couldn't find authentication token");
    }
    decodeToken(token);
};

export const checkActionneurService = async (checkAdmin: boolean) => {
    /* const token = getCookie("actionneur_token");
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
    return actionneur; */
    const token = await getCookie("user_token");
    if (!token) {
        throw new Error("Couldn't find authentication token");
    }
    return decodeToken(token);
};

export const cleanExpiredTokensService = async () => {
    const { count } = await deleteExpiredTokens();
    console.log("Cleaned ", count, " expired tokens");
};

export const revokeTokenService = async (token: string) => {
    const { exp } = decodeToken(token);
    const expiresAt = new Date(exp);
    await postRevokedToken({ token, expiresAt });
};
