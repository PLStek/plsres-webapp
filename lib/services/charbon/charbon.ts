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
) => ({
    ...charbon,
    status: charbon.status as CharbonStatus,
    actionneurIds: charbon.actionneurs.map((ca) => ca.actionneurId),
});

export const getCharbonsService = async (): Promise<Charbon[]> => {
    const charbons = await getCharbons();
    return charbons.map(buildCharbonWithActionneurs);
};

export const getCharbonsGroupedByMonthService = async (): Promise<
    Record<string, Charbon[]>
> => {
    const charbons = await getCharbonsService();
    return charbons.reduce((acc, charbon) => {
        const month = charbon.timestamp.toISOString().slice(0, 7);
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(charbon);
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

export const getCharbonByDiscordEventIdService = async (
    discordEventId: string
): Promise<Charbon | null> => {
    const charbon = await getCharbonByDiscordEventId(discordEventId);
    return buildCharbonWithActionneurs(charbon);
};

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
    return {
        ...newCharbon,
        status: newCharbon.status as CharbonStatus,
        actionneurIds: [actionneurId],
    };
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

    const updatedCharbon = await putCharbon(id, newCharbonPutData);
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

    return {
        ...updatedCharbon,
        status: updatedCharbon.status as CharbonStatus,
        actionneurIds: actionneurIds ?? [], //TODO: update actionneurs
    };
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
