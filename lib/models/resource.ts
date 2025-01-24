export type ResourceBase = {
    title: string;
    charbonId: number;
};

export type Resource = ResourceBase & {
    id: number;
    extension: string;
    filename: string;
};

export type ResourceCreateInput = ResourceBase & {
    file: File;
};

export type ResourceUpdateInput = Partial<ResourceBase> & {
    file?: File;
};
