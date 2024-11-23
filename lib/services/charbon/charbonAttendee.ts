import {
    addCharbonAttendee,
    deleteCharbonAttendeesByCharbonId,
    getCharbonAttendeesByDiscordUserId,
} from "@lib/data/charbonAttendee";
import {
    CharbonAttendee,
    CharbonAttendeeCreateInput,
} from "@lib/models/charbonAttendee";

export const getCharbonAttendeesByDiscordUserIdService = async (
    discordUserId: string
): Promise<CharbonAttendee[]> => {
    return getCharbonAttendeesByDiscordUserId(discordUserId);
};

export const tryCreateCharbonAttendeeService = async ({
    charbonId,
    discordUserId,
}: CharbonAttendeeCreateInput): Promise<CharbonAttendee | undefined> => {
    const userCharbons = await getCharbonAttendeesByDiscordUserIdService(
        discordUserId
    );
    if (userCharbons.map((uc) => uc.charbonId).includes(charbonId)) {
        return;
    }

    const data = {
        discordUserId,
        charbon: { connect: { id: charbonId } },
    };
    try {
        return addCharbonAttendee(data);
    } catch {}
};

export const deleteCharbonAttendeesByCharbonIdService = async (
    charbonId: number
) => {
    return deleteCharbonAttendeesByCharbonId(charbonId);
};
