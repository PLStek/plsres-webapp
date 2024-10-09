type ActionneurBase = {
    username: string;
    isAdmin: boolean;
    isActive: boolean;
};

export type Actionneur = ActionneurBase & {
    id: number;
};

export type ActionneurCreateInput = ActionneurBase;

export type ActionneurUpdateInput = Partial<ActionneurBase>;
