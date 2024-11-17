import { Resource, ResourceCreateInputForCharbon } from "./resource";

type CharbonBase = {
    name: string;
    description: string;
    timestamp: Date;
    replayUrl?: string | null;
};

export type Charbon = CharbonBase & {
    id: number;
    courseId: number;
    actionneurIds: number[];
};

export type CharbonCreateInput = CharbonBase & {
    courseId: number;
    actionneurIds: number[];
    resources: ResourceCreateInputForCharbon[];
};

export type CharbonCreateResponse = Charbon & {
    resources: Resource[];
};

export type CharbonUpdateInput = Partial<CharbonBase> & {
    courseId: number;
    actionneurIds: number[];
};
