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
    inviteToken: string;
    username: string;
    secret: string;
};

export type ActionneurUpdateInput = Partial<ActionneurBase>;

export type Invite = {
    id: number;
    link: string;
    discordId: string;
    expiresAt: Date;
};
