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
};

export type CharbonUpdateInput = Partial<CharbonBase> & {
    courseId: number;
    actionneurIds: number[];
};
