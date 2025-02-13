type ActionneurBase = {
    discordId: string;
    username: string;
};

export type Actionneur = ActionneurBase & {
    isActive: boolean;
    isAdmin: boolean;
    id: number;
};

export type ActionneurCreateInput = {
    invitationToken: string;
    username: string;
    secret: string;
};

export type ActionneurUpdateInput = Partial<ActionneurBase>;

export type Invitation = {
    token: string;
    discordId: string;
    expiresAt: Date;
};
