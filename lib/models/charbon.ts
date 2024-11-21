import { Resource } from "./resource";

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
};

export type CharbonCreateInput = CharbonBase & {
    courseId: number;
    actionneurId: number;
};

export type CharbonCreateResponse = Charbon & {
    resources: Resource[];
};

export type CharbonUpdateInput = Partial<
    CharbonBase & {
        draft: boolean;
        courseId: number;
        actionneurIds: number[];
    }
>;
