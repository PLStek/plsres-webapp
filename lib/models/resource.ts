export type ResourceBase = {
    name: string;
    url: string;
    charbonId: number;
};

export type Resource = ResourceBase & {
    id: number;
};

export type ResourceCreateInput = ResourceBase;

export type ResourceUpdateInput = Partial<ResourceBase>;
