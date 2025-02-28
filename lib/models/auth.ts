type RevokedTokenBase = {
    token: string;
    expiresAt: Date;
};

export type RevokedToken = RevokedTokenBase;

export type RevokedTokenCreateInput = RevokedToken & {
    id: number;
};

export type AuthData = {
    isVerified: boolean;
    actionneurId: number | null;
    isActionneurAuthentified: boolean;
    isAdmin: boolean;
    discordId: string | null;
    exp: number;
};

export type AuthState = { isInGuild: boolean; discordId: string };

export type UserTokenPayload = {
    actionneurId: number | null;
    isAdmin: boolean;
    discordId: string;
    exp: number;
};

export type CookieType = "user_token" | "actionneur_token";

export type AccessLevel = "guest" | "verified" | "actionneur" | "admin";
