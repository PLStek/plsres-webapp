import {
    deleteCharbon,
    getCharbons,
    postCharbon,
    putCharbon,
} from "../../data/charbon";
import {
    Charbon,
    CharbonCreateInput,
    CharbonUpdateInput,
} from "../../models/charbon";
import {
    deleteCharbonActionneurByCharbonIds,
    postCharbonActionneurs,
} from "../../data/charbonActionneur";
import { deleteResourcesByCharbonIdService } from "../resource/resource";
import { deleteCharbonAttendeesByCharbonIdService } from "./charbonAttendee";

export const getAllCharbonsService = async (): Promise<Charbon[]> => {
    const charbons = await getCharbons();

    const charbonsWithActionneurs = charbons.map((charbon) => ({
        ...charbon,
        actionneurIds: charbon.actionneurs.map((ca) => ca.actionneurId),
    }));

    return charbonsWithActionneurs;
};

export const getPublicCharbonsService = async (): Promise<Charbon[]> => {
    const charbons = await getAllCharbonsService();
    return charbons.filter((charbon) => !charbon.isDraft);
};

export const getCharbonByIdService = async (
    id: number
): Promise<Charbon | undefined> => {
    const charbons = await getAllCharbonsService();
    return charbons.find((charbon) => charbon.id === id);
};

export const getCharbonByDiscordEventIdService = async (
    discordEventId: string
): Promise<Charbon | undefined> => {
    const charbons = await getAllCharbonsService();
    return charbons.find(
        (charbon) => charbon.discordEventId === discordEventId
    );
};

export const getOngoingCharbonsService = async (): Promise<Charbon[]> => {
    const charbons = await getAllCharbonsService();
    return charbons.filter((charbon) => charbon.status === "ONGOING");
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

    /* const newResources = await createResourcesForCharbonService(
        newCharbon.id,
        resources.map((resource) => ({
            ...resource,
            charbonId: newCharbon.id,
        }))
    ); */ //TODO: delete

    return {
        ...newCharbon,
        actionneurIds: [actionneurId],
        // resources: newResources,
    };
};

export const updateCharbonService = async (
    id: number,
    data: CharbonUpdateInput
): Promise<Charbon> => {
    const newCharbonPutData = data.courseId
        ? { ...data, course: { connect: { id: data.courseId } } }
        : data;

    const updatedCharbon = await putCharbon(id, newCharbonPutData);
    if (data.actionneurIds) {
        await deleteCharbonActionneurByCharbonIds([id]);
    }

    return {
        ...updatedCharbon,
        actionneurIds: data.actionneurIds ?? [], //TODO: update actionneurs
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
): Promise<Charbon | undefined> => {
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
