import { useCallback, useEffect } from "react";
import {
    createActionneurInviteAction,
    getActionneurInvitesAction,
    deleteActionneurInvitesAction,
} from "@lib/actions";
import { Invite } from "@lib/models/actionneur";
import { useMutationState, useQueryState } from "./useQueryState";
import {
    addInviteAtom,
    invitesAtom,
    removeInviteAtom,
} from "@app/atoms/inviteAtoms";
import { useAtom } from "jotai";

export const useActionneurInvitesQuery = () => {
    const [invites, setInvites] = useAtom(invitesAtom);
    const { state, setResult, makeLoading } = useQueryState<Invite[]>({});

    const fetchData = useCallback(async () => {
        if (invites === null) {
            makeLoading();
            const result = await getActionneurInvitesAction();
            if (result.data) {
                setInvites(result.data);
            }
            setResult(result);
        } else {
            setResult({ data: invites, error: null });
        }
    }, [invites, setResult, setInvites, makeLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return state;
};

export const useCreateActionneurInviteMutation = () => {
    const [, addInvite] = useAtom(addInviteAtom);

    const mutation = async (discordId: string) => {
        const result = await createActionneurInviteAction(discordId);
        if (result.data) {
            addInvite(result.data);
        }
        return result;
    };

    const result = useMutationState({ mutation });
    return result;
};

export const useDeleteActionneurInvitesMutation = () => {
    const [, removeInvite] = useAtom(removeInviteAtom);

    const mutation = async (ids: number[]) => {
        const result = await deleteActionneurInvitesAction(ids);
        if (!result.error) {
            ids.forEach(removeInvite); //TODO: implement multiple delete in context (else sync error)
        }
        return result;
    };

    const result = useMutationState({ mutation });

    return result;
};
