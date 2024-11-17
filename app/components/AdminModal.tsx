"use client";

import { useAuth } from "@app/hooks/useAuth";
import Modal from "./Modal";
import { useActionneurs } from "@app/hooks/useActionneurs";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const AdminModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { createActionneurInviteAction, isAdmin } = useAuth();

    const [generatedLink, setGeneratedLink] = useState<string | undefined>(
        undefined
    );

    const { actionneurs, deleteActionneur } = useActionneurs();

    const submit = async (formData: FormData) => {
        const discordId = formData.get("discordId") as string;
        const newLink = await createActionneurInviteAction(discordId);
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
