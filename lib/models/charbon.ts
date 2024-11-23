export type CharbonStatus = "SCHEDULED" | "ONGOING" | "FINISHED";

type CharbonBase = {
    name: string;
    description: string;
    timestamp: Date;
    replayUrl?: string | null;
    discordEventId: string;
};

export type Charbon = CharbonBase & {
    id: number;
    courseId: number;
    actionneurIds: number[];
    status: CharbonStatus;
    isDraft: boolean;
};

export type CharbonCreateInput = CharbonBase & {
    courseId: number;
    actionneurId: number;
    status?: CharbonStatus;
};

export type CharbonUpdateInput = Partial<
    CharbonBase & {
        courseId: number;
        actionneurIds: number[];
        status: CharbonStatus;
        isDraft: boolean;
    }
>;
