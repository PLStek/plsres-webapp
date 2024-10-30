type ActionneurBase = {
    discordId: string;
    username: string;
    isAdmin: boolean;
    isActive: boolean;
};

export type Actionneur = ActionneurBase & {
    id: number;
};

export type ActionneurCreateInput = ActionneurBase & {
    secret: number;
};

export type ActionneurUpdateInput = Partial<ActionneurBase>;
