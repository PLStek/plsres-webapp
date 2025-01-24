import { CourseCategory } from "./course";

export type CharbonStatus = "SCHEDULED" | "ONGOING" | "FINISHED";

type CharbonBase = {
    title: string;
    description: string;
    timestamp: Date;
};

export type Charbon = CharbonBase & {
    id: number;
    courseId: number;
    actionneurIds: number[];
    status: CharbonStatus; //TODO: remove
    isDraft: boolean; //TODO: remove
    hasReplay: boolean;
    resourcesCount: number;
};

export type FullCharbon = Charbon & {
    replayUrl: string | null;
    status: CharbonStatus;
    isDraft: boolean;
    discordEventId: string;
};

export type CharbonCreateInput = CharbonBase & {
    courseId: number;
    actionneurId: number;
    status?: CharbonStatus;
    replayUrl?: string | null;
    discordEventId: string;
};

export type CharbonUpdateInput = Partial<
    CharbonBase & {
        courseId: number;
        actionneurIds: number[];
        status: CharbonStatus;
        isDraft: boolean;
        replayUrl: string | null;
        discordEventId: string;
    }
>;

export type CharbonFilters = {
    search: string;
    category: CourseCategory | null;
    courseId: number | null;
    level: string;
    year: string; //TODO: change to semester
    month: string;
    hasReplay: boolean;
    hasResources: boolean;
};
