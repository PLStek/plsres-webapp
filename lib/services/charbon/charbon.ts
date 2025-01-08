import {
    deleteCharbon,
    getCharbonByDiscordEventId,
    getCharbonById,
    getCharbons,
    getOngoingCharbons,
    postCharbon,
    putCharbon,
} from "../../data/charbon";
import {
    Charbon,
    CharbonCreateInput,
    CharbonStatus,
    CharbonUpdateInput,
} from "../../models/charbon";
import {
    deleteCharbonActionneurByCharbonIds,
    postCharbonActionneurs,
} from "../../data/charbonActionneur";
import { deleteResourcesByCharbonIdService } from "../resource/resource";
import { deleteCharbonAttendeesByCharbonIdService } from "./charbonAttendee";
import { Prisma } from "@prisma/client";

const buildCharbonWithActionneurs = (
    charbon: Prisma.PromiseReturnType<typeof getCharbonById>
): Charbon => ({
    ...charbon,
    status: charbon.status as CharbonStatus,
    actionneurIds: charbon.actionneurs.map((ca) => ca.actionneurId),
    hasReplay: !!charbon.replayUrl,
    resourcesCount: charbon._count.resources,
});
export const getCharbonsGroupedByMonthService = async (): Promise<
    Record<string, Charbon[]>
> => {
    const charbons = await getCharbons();
    return charbons.reduce((acc, charbon) => {
        const month = charbon.timestamp.toISOString().slice(0, 7);
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(buildCharbonWithActionneurs(charbon));
        return acc;
    }, {} as Record<string, Charbon[]>);
    //TODO: cache
};

export const getCharbonByIdWithDraftService = async (
    id: number
): Promise<Charbon | null> => {
    const charbon = await getCharbonById(id);
    if (!charbon) {
        return null;
    }
    return buildCharbonWithActionneurs(charbon);
};

export const getCharbonByIdService = async (
    id: number
): Promise<Charbon | null> => {
    //TODO: create provider
    const charbon = await getCharbonByIdWithDraftService(id);
    return charbon?.isDraft ? null : charbon;
};

export const getCharbonReplayByIdService = async (
    id: number
): Promise<string | null> => {
    const charbon = await getCharbonById(id);
    return charbon?.replayUrl ?? null;
};

export const getCharbonByDiscordEventIdService = async (
    discordEventId: string
): Promise<Charbon | null> => {
    const charbon = await getCharbonByDiscordEventId(discordEventId);
    return buildCharbonWithActionneurs(charbon);
};

//TODO: delete
export const getOngoingCharbonsService = async (): Promise<Charbon[]> => {
    const charbons = await getOngoingCharbons();
    return charbons.map(buildCharbonWithActionneurs);
};

export const createCharbonService = async ({
    courseId,
    actionneurId,
    ...data
}: CharbonCreateInput): Promise<Charbon> => {
    const newCharbonPostData = {
        ...data,
        course: { connect: { id: courseId } },
    };
    const newCharbon = await postCharbon(newCharbonPostData);
    const charbonActionneursPostData = {
        charbonId: newCharbon.id,
        actionneurId,
    };

    await postCharbonActionneurs([charbonActionneursPostData]);
    //TODO: use createManyAndReturn
    return buildCharbonWithActionneurs({
        ...newCharbon,
        actionneurs: [charbonActionneursPostData],
    });
};

export const updateCharbonService = async (
    id: number,
    { courseId, actionneurIds, ...data }: CharbonUpdateInput
): Promise<Charbon> => {
    const course = courseId ? { connect: { id: courseId } } : undefined;
    const newCharbonPutData = courseId
        ? {
              ...data,
              course,
              courseId: undefined,
          }
        : data;

    if (actionneurIds) {
        await deleteCharbonActionneurByCharbonIds([id]);
        const charbonActionneursPostData = actionneurIds.map(
            (actionneurId) => ({
                charbonId: id,
                actionneurId,
            })
        );
        await postCharbonActionneurs(charbonActionneursPostData);
        //TODO: refactor to avoid deleting and reinserting (look at prisma doc)
    }
    const updatedCharbon = await putCharbon(id, newCharbonPutData);

    return buildCharbonWithActionneurs(updatedCharbon);
};

export const startCharbonService = async (id: number): Promise<Charbon> => {
    return updateCharbonService(id, { status: "ONGOING" });
};

export const finishCharbonService = async (id: number): Promise<Charbon> => {
    return updateCharbonService(id, { status: "FINISHED" });
};

export const deleteCharbonService = async (
    id: number
): Promise<Charbon | null> => {
    const charbon = await getCharbonByIdService(id);

    //TODO: Voir si on peut plutot le faire avec un cascade delete et juste update le cache
    await Promise.all([
        deleteCharbonActionneurByCharbonIds([id]),
        deleteCharbonAttendeesByCharbonIdService(id),
        deleteResourcesByCharbonIdService(id),
    ]);
    await deleteCharbon(id);
    return charbon;
};
