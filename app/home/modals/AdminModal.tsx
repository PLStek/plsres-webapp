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
import {
    Button,
    Code,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    useDisclosure,
} from "@heroui/react";
import { createContext, ReactNode, useContext, useState } from "react";

type AdminModalContextType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
};

const AdminModalContext = createContext<AdminModalContextType | null>(null);

const AdminModal = ({ children }: { children: ReactNode }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [createInvite, , errorCreateInvite] =
        useCreateActionneurInviteMutation();
    const [isAdmin] = useIsAdmin();

    const [generatedLink, setGeneratedLink] = useState<string | null>(null);

    const [actionneurs] = useActionneursQuery();
    const [deleteActionneur, ,] = useDeleteActionneurMutation();

    const [discordIdInput, setDiscordIdInput] = useState<string>("");

    const onGenerateLink = async () => {
        const newLink = await createInvite(discordIdInput);
        setGeneratedLink(newLink);
    };

    return (
        //TODO: séparer en plusieurs composants -> adminDashboard
        (<AdminModalContext.Provider
            value={{
                isOpen,
                onOpen,
                onClose,
                onOpenChange,
            }}
        >
            {children}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {isAdmin && (
                        <ModalBody>
                            {actionneurs.map((actionneur) => (
                                <div key={actionneur.id} className="flex">
                                    <p className="mr-3">
                                        {actionneur.username}
                                    </p>
                                    <p className="mr-3">
                                        Admin:{" "}
                                        {actionneur.isAdmin ? "Oui" : "Non"}
                                    </p>
                                    <TrashIcon
                                        className="h-5 w-5"
                                        onClick={() =>
                                            deleteActionneur(actionneur.id)
                                        }
                                    />
                                </div>
                            ))}
                            {!generatedLink && (
                                <div>
                                    <Input
                                        label="Discord ID"
                                        type="number"
                                        size="sm"
                                        isInvalid={!!errorCreateInvite}
                                        errorMessage={
                                            errorCreateInvite
                                        }
                                        onChange={(e) =>
                                            setDiscordIdInput(e.target.value)
                                        }
                                    />
                                    <Button
                                        type="submit"
                                        onPress={onGenerateLink}
                                    >
                                        Créer un lien dinvitation
                                    </Button>
                                </div>
                            )}
                            {generatedLink && <Code>{generatedLink}</Code>}
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </AdminModalContext.Provider>)
    );
};

export default AdminModal;

export const useAdminModal = () => {
    const context = useContext(AdminModalContext);
    if (context === null) {
        throw new Error(
            "useAdminModal must be used within the AdminModal provider"
        );
    }
    return context;
};
