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
import { AuthData, AuthState } from "@lib/models/auth";
import { ErrorMessages } from "@lib/utils/errorMessages";
import { getActionneurByIdService } from "./actionneur";
import {
    deletePendingAuth,
    getPendingAuthByDiscordUserId,
    postPendingAuth,
} from "@lib/data/pendingAuth";

//TODO: meilleur typage et vérifications
export const connectService = async (code: string): Promise<AuthState> => {
    //TODO: add type in model
    const accessToken = await getDiscordAccessTokenService(code);
    const isInGuild = await checkDiscordUserGuildService(accessToken);
    const { id: discordId } = await getDiscordUserService(accessToken);
    if (!isInGuild) {
        const expiresAt = new Date(Date.now() + 3600 * 1000);
        await postPendingAuth({ discordId, expiresAt, accessToken });
    } else {
        // TODO: mettre en commun avec connectFromDiscordIdService
        const actionneur = await getActionneurByDiscordId(discordId);
        const token = createUserToken({
            isAdmin: actionneur?.isAdmin ?? false,
            discordId,
            actionneurId: actionneur?.id,
        });
        await setCookie("user_token", token);
        revokeDiscordAccessTokenService(token);
    }
    return { isInGuild, discordId };
};

export const connectFromDiscordIdService = async (discordId: string) => {
    const pendingAuth = await getPendingAuthByDiscordUserId(discordId);
    if (!pendingAuth) {
        throw new Error(ErrorMessages.NoConnectionInitiated);
    }
    if (pendingAuth.expiresAt < new Date()) {
        throw new Error(ErrorMessages.DiscordConnectionExpired);
    }
    const isInGuild = await checkDiscordUserGuildService(
        pendingAuth.accessToken
    );
    if (!isInGuild) {
        throw new Error(ErrorMessages.DiscordUserNotInGuild);
    }
    const actionneur = await getActionneurByDiscordId(discordId);
    const token = createUserToken({
        isAdmin: actionneur?.isAdmin ?? false,
        discordId,
        actionneurId: actionneur?.id,
    });
    await setCookie("user_token", token);
    deletePendingAuth(discordId);
    revokeDiscordAccessTokenService(token);
};

export const connectActionneurService = async (secret: string) => {
    const userToken = await getCookie("user_token");
    if (!userToken) {
        throw new Error(ErrorMessages.NotConnected);
    }
    const { actionneurId } = decodeToken(userToken);
    if (!actionneurId) {
        throw new Error(ErrorMessages.UserNotActionneur);
    }

    const actionneur = await getActionneurById(actionneurId);
    if (!actionneur) {
        //TODO: revoke ou refresh le user token + faire pareil si il n'est pas admin
        throw new Error(ErrorMessages.UserNotActionneur);
    }
    await verifySecret(secret, actionneur.secretHash);
    const actionneurToken = createActionneurToken(actionneurId);
    await setCookie("actionneur_token", actionneurToken);
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
        throw new Error(ErrorMessages.NotConnected);
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
    await setCookie("user_token", newToken);
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
        throw new Error(ErrorMessages.NotConnected);
    }
    decodeToken(token);
};

export const checkActionneurService = async (checkAdmin: boolean) => {
    const token = await getCookie("actionneur_token");
    if (!token) {
        throw new Error(ErrorMessages.ActionneurNotConnected);
    }
    const { actionneurId } = decodeActionneurToken(token);
    if (!actionneurId) throw new Error(ErrorMessages.UserNotActionneur);

    const actionneur = await getActionneurByIdService(actionneurId);
    if (!actionneur || !actionneur.isActive) {
        throw new Error(ErrorMessages.UserNotActionneur);
    }
    if (checkAdmin && !actionneur.isAdmin) {
        throw new Error(ErrorMessages.UserNotAdmin);
    }
    return actionneur;
    /* const token = await getCookie("user_token");
    if (!token) {
        throw new Error(ErrorMessages.NotConnected);
    }
    return decodeToken(token); */
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
