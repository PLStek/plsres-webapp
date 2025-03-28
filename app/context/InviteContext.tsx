"use client";

import { Invite } from "@lib/models/actionneur";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

//TODO: make a map instead
type InviteContextType = {
    invites: Invite[];
    setInvites: (invites: Invite[]) => void;
    addInvite: (newInvite: Invite) => void;
    updateInvite: (id: number, updatedInvite: Invite) => void;
    removeInvite: (id: number) => void;
};

export const InviteContext = createContext<InviteContextType | null>(null);

const InviteProvider = ({
    initialInvites,
    children,
}: {
    initialInvites?: Invite[];
    children: ReactNode;
}) => {
    const [invites, setInvites] = useState(initialInvites ?? []);

    const addInvite = (newInvite: Invite) =>
        setInvites([...invites, newInvite]);
    const updateInvite = (id: number, updatedInvite: Invite) =>
        setInvites(
            invites.map((c) => (c.id === id ? { ...c, ...updatedInvite } : c))
        );
    const removeInvite = (id: number) =>
        setInvites(invites.filter((c) => c.id !== id));

    const value = useMemo(
        () => ({
            invites,
            setInvites,
            addInvite,
            updateInvite,
            removeInvite,
        }),
        [invites]
    );

    return (
        <InviteContext.Provider value={value}>
            {children}
        </InviteContext.Provider>
    );
};

export default InviteProvider;

export const useInviteContext = () => {
    const context = useContext(InviteContext);
    if (context === null) {
        throw new Error("useInvites must be used within a InviteProvider");
    }
    return context;
};
