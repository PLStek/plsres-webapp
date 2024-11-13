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
    actionneurId: number | undefined;
    isActionneurAuthentified: boolean;
    isAdmin: boolean;
    discordId: string | undefined;
    exp: number;
};

export type UserTokenPayload = {
    actionneurId: number | undefined;
    isAdmin: boolean;
    discordId: string;
    exp: number;
};

export type CookieType = "user_token" | "actionneur_token";

export type AccessLevel = "guest" | "verified" | "actionneur" | "admin";
