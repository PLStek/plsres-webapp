import { useCallback, useEffect } from "react";
import {
    createActionneurInviteAction,
    getActionneurInvitesAction,
    deleteActionneurInvitesAction,
} from "@lib/actions";
import { Invite } from "@lib/models/actionneur";
import { useInviteContext } from "@app/context/InviteContext";
import { useMutationState, useQueryState } from "./useQueryState";

export const useActionneurInvitesQuery = () => {
    const { invites, setInvites } = useInviteContext();
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
    const { addInvite } = useInviteContext();

    const mutation = async (discordId: string) => {
        const result = await createActionneurInviteAction(discordId);
        if (result.data) {
            addInvite(result.data);
        }
        return result;
    };

    const result = useMutationState<Invite>({ mutation });
    return result;
};

export const useDeleteActionneurInvitesMutation = () => {
    const { removeInvite } = useInviteContext();

    const mutation = async (ids: number[]) => {
        const result = await deleteActionneurInvitesAction(ids);
        if (!result.error) {
            ids.forEach(removeInvite); //TODO: implement multiple delete in context (else sync error)
        }
        return result;
    };

    const result = useMutationState<void>({ mutation });

    return result;
};
