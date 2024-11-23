import { getOngoingCharbonsService } from "@lib/services/charbon/charbon";
import { tryCreateCharbonAttendeeService } from "@lib/services/charbon/charbonAttendee";
import { getCourseByDiscordVoiceChannelIdService } from "@lib/services/course";
import { VoiceState } from "discord.js";

export const voiceStateUpdate = async (
    oldState: VoiceState,
    newState: VoiceState
) => {
    const channelId = newState.channelId;
    if (!channelId || channelId === oldState.channelId) {
        return;
    }

    const ongoingCharbons = await getOngoingCharbonsService();
    if (ongoingCharbons.length === 0) {
        return;
    }

    const course = await getCourseByDiscordVoiceChannelIdService(channelId);
    if (!course) {
        return;
    }

    const charbon = ongoingCharbons.find(
        (charbon) => charbon.courseId === course.id
    );
    if (!charbon) {
        return;
    }

    await tryCreateCharbonAttendeeService({
        charbonId: charbon.id,
        discordUserId: newState.id,
    });
};
