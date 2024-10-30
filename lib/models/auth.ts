type RevokedTokenBase = {
    token: string;
    expiresAt: Date;
};

export type RevokedToken = RevokedTokenBase;

export type RevokedTokenCreateInput = RevokedToken & {
    id: number;
};

export type AuthData = {
    actionneurId: number | undefined;
    isAdmin: boolean;
    exp: number;
};

export type TokenPayload = {
    actionneurId: number | undefined;
    isAdmin: boolean;
    exp: number;
};

export type CookieType = "user_token" | "actionneur_token";
