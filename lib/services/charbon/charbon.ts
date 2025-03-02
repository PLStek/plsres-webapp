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
    FullCharbon,
} from "../../models/charbon";
import {
    deleteCharbonActionneurByCharbonIds,
    postCharbonActionneurs,
} from "../../data/charbonActionneur";
import { deleteResourcesByCharbonIdService } from "../resource/resource";
import { deleteCharbonAttendeesByCharbonIdService } from "./charbonAttendee";
import { Prisma } from "@prisma/client";

type PrismaCharbon = Prisma.PromiseReturnType<typeof getCharbonById>;

const buildFullCharbonWithActionneurs = (
    charbon: PrismaCharbon
): FullCharbon => ({
    id: charbon.id,
    title: charbon.title,
    description: charbon.description,
    timestamp: charbon.timestamp,
    courseId: charbon.courseId,
    discordEventId: charbon.discordEventId,
    replayUrl: charbon.replayUrl,
    isDraft: charbon.isDraft,
    isCancelled: charbon.isCancelled,
    status: charbon.status as CharbonStatus,
    actionneurIds: charbon.actionneurs.map((ca) => ca.actionneurId),
    hasReplay: !!charbon.replayUrl,
    resourcesCount: charbon._count.resources,
});

// TODO: be careful with the type here
const buildCharbonWithActionneurs: (charbon: PrismaCharbon) => Charbon =
    buildFullCharbonWithActionneurs;

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

export const getFullCharbonByIdService = async (
    id: number
): Promise<FullCharbon | null> => {
    const charbon = await getCharbonById(id);
    if (!charbon) {
        return null;
    }
    return buildFullCharbonWithActionneurs(charbon);
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
    return buildCharbonWithActionneurs(charbon) as Charbon;
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

    const actionneursUpdate = actionneurIds
        ? {
              set: actionneurIds.map((actionneurId) => ({
                  charbonId_actionneurId: { charbonId: id, actionneurId },
              })),
          }
        : undefined;

    const newCharbonPutData: Prisma.CharbonUpdateInput = {
        ...data,
        ...(course && { course }),
        ...(actionneursUpdate && { actionneurs: actionneursUpdate }),
    };

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
    //TODO: est-ce qu'on veut le fullcharbon ou juste le charbon ? (voir partout)
    const charbon = await getFullCharbonByIdService(id);

    //TODO: Voir si on peut plutot le faire avec un cascade delete et juste update le cache
    await Promise.all([
        deleteCharbonActionneurByCharbonIds([id]),
        deleteCharbonAttendeesByCharbonIdService(id),
        deleteResourcesByCharbonIdService(id),
    ]);
    await deleteCharbon(id);
    return charbon;
};
