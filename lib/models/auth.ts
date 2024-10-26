export type TokenResponse = {
    token: string;
    expirationDate: number;
    actionneurExpirationDate: number;
};

export type AuthResponse = {
    actionneurId: number;
};

export type Payload = {
    actionneurId: number | undefined;
    isAdmin: boolean;
    actionneurExp: number;
};
