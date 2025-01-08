"use client";

import {
    useActionneursQuery,
    useDeleteActionneurMutation,
} from "@app/hooks/useActionneurs";
import {
    useCreateActionneurInviteMutation,
    useIsAdmin,
} from "@app/hooks/useAuth";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useState } from "react";

const AdminModal = ({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: () => void;
}) => {
    const [createInvite] = useCreateActionneurInviteMutation();
    const [isAdmin] = useIsAdmin();

    const [generatedLink, setGeneratedLink] = useState<string | null>(null);

    const [actionneurs] = useActionneursQuery();
    const [deleteActionneur, ,] = useDeleteActionneurMutation();

    const submit = async (formData: FormData) => {
        const discordId = formData.get("discordId") as string;
        const newLink = await createInvite(discordId);
        setGeneratedLink(newLink);
        /* await navigator.clipboard.writeText(newLink); */
    };

    if (!isAdmin) return null;

    return (
        //TODO: séparer en plusieurs composants -> adminDashboard
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalBody>
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
                    {!generatedLink && (
                        <form action={submit}>
                            <div>
                                <label htmlFor="discordId">Discord ID</label>
                                <input type="number" name="discordId" />
                            </div>
                            <button type="submit">
                                Créer un lien dinvitation
                            </button>
                        </form>
                    )}
                    {generatedLink && generatedLink}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AdminModal;
