import { useCallback, useEffect, useState } from "react";
import {
    createActionneurInviteAction,
    getActionneurInvitesAction,
    deleteActionneurInvitesAction,
} from "@lib/actions";
import { Invite } from "@lib/models/actionneur";
import { useInviteContext } from "@app/context/InviteContext";

export const useActionneurInvitesQuery = () => {
    const { invites, setInvites } = useInviteContext();
    const [data, setData] = useState<Invite[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!invites.length) {
            setLoading(true);
            const { data: fetchedInvites, error } =
                await getActionneurInvitesAction();
            if (fetchedInvites) {
                setInvites(fetchedInvites);
            }
            setError(error);
            setLoading(false);
        }
        setData(invites);
        return invites;
    }, [invites, setInvites]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [data, loading, error] as const;
};

export const useCreateActionneurInviteMutation = () => {
    const { addInvite } = useInviteContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (discordId: string) => {
        setLoading(true);

        const { data: newInvite, error } = await createActionneurInviteAction(
            discordId
        );
        if (newInvite) {
            addInvite(newInvite);
        }
        setError(error);
        setLoading(false);
        return newInvite;
    };

    return [mutate, loading, error] as const;
};

export const useDeleteActionneurInvitesMutation = () => {
    const { removeInvite } = useInviteContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (ids: number[]) => {
        setLoading(true);

        const { error } = await deleteActionneurInvitesAction(ids);
        if (!error) {
            ids.forEach(removeInvite); //TODO: implement multiple delete in context (else sync error)
        }
        setError(error);
        setLoading(false);
    };

    return [mutate, loading, error] as const;
};
