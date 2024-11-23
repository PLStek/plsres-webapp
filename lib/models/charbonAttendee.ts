type CharbonAttendeeBase = {
    charbonId: number;
    discordUserId: string;
};

export type CharbonAttendee = CharbonAttendeeBase & {
    id: number;
};

export type CharbonAttendeeCreateInput = CharbonAttendeeBase;
