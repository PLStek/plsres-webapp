"use client";

import Modal from "./Modal";
import {
    useActionneursQuery,
    useDeleteActionneurMutation,
} from "@app/hooks/useActionneurs";
import { useCreateActionneurInviteMutation, useIsAdmin } from "@app/hooks/useAuth";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const AdminModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [createInvite] = useCreateActionneurInviteMutation();
    const [isAdmin] = useIsAdmin();

    const [generatedLink, setGeneratedLink] = useState<string | undefined>(
        undefined
    );

    const [actionneurs] = useActionneursQuery();
    const [deleteActionneur, loading, error] = useDeleteActionneurMutation();

    const submit = async (formData: FormData) => {
        const discordId = formData.get("discordId") as string;
        const newLink = await createInvite(discordId);
        setGeneratedLink(newLink);
        /* await navigator.clipboard.writeText(newLink); */
    };

    if (!isAdmin) return null;

    return (
        //TODO: séparer en plusieurs composants -> adminDashboard
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                {actionneurs.map((actionneur) => (
                    <div key={actionneur.id} className="flex">
                        <p className="mr-3">{actionneur.username}</p>
                        <p className="mr-3">
                            Admin: {actionneur.isAdmin ? "Oui" : "Non"}
                        </p>
                        <TrashIcon
                            className="h-5 w-5"
                            onClick={() => deleteActionneur(actionneur.id)}
                        />
                    </div>
                ))}
            </div>
            {!generatedLink && (
                <form action={submit}>
                    <div>
                        <label htmlFor="discordId">Discord ID</label>
                        <input type="number" name="discordId" />
                    </div>
                    <button type="submit">Créer un lien dinvitation</button>
                </form>
            )}
            {generatedLink && generatedLink}
        </Modal>
    );
};

export default AdminModal;
