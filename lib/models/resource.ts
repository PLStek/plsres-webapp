export type ResourceBase = {
    name: string;
    charbonId: number;
};

export type Resource = ResourceBase & {
    id: number;
    extension: string;
    filename: string;
};

/* export type ResourceCreateInputForCharbon = {
    name: string;
    file: File;
}; */ //TODO: delete

export type ResourceCreateInput = ResourceBase & {
    file: File;
};

export type ResourceUpdateInput = Partial<ResourceBase> & {
    file?: File;
};
