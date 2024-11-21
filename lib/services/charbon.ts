import {
    deleteCharbon,
    getCharbons,
    postCharbon,
    putCharbon,
} from "../data/charbon";
import {
    Charbon,
    CharbonCreateInput,
    CharbonUpdateInput,
} from "../models/charbon";
import {
    deleteCharbonActionneurByCharbonIds,
    postCharbonActionneurs,
} from "../data/charbonActionneur";
import { deleteResourcesByCharbonIdService } from "./resource/resource";

export const getCharbonsService = async (): Promise<Charbon[]> => {
    const charbons = await getCharbons();

    const charbonsWithActionneurs = charbons.map((charbon) => ({
        ...charbon,
        actionneurIds: charbon.actionneurs.map((ca) => ca.actionneurId),
    }));

    return charbonsWithActionneurs;
};

export const getCharbonByIdService = async (
    id: number
): Promise<Charbon | undefined> => {
    const charbons = await getCharbonsService();
    return charbons.find((charbon) => charbon.id === id);
};

export const createCharbonDraftService = async ({
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

export const deleteCharbonService = async (
    id: number
): Promise<Charbon | undefined> => {
    const charbon = await getCharbonByIdService(id);
    await deleteCharbonActionneurByCharbonIds([id]);
    await deleteResourcesByCharbonIdService(id);
    await deleteCharbon(id);
    return charbon;
};
