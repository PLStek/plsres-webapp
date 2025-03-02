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
    Drawer,
    DrawerBody,
    DrawerContent,
    useDisclosure,
} from "@heroui/react";
import { createContext, ReactNode, useContext, useState } from "react";

type AdminDrawerContextType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
};

const AdminDrawerContext = createContext<AdminDrawerContextType | null>(null);

const AdminDrawer = ({ children }: { children: ReactNode }) => {
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
        (<AdminDrawerContext.Provider
            value={{
                isOpen,
                onOpen,
                onClose,
                onOpenChange,
            }}
        >
            {children}
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {isAdmin && (
                        <DrawerBody>
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
                        </DrawerBody>
                    )}
                </DrawerContent>
            </Drawer>
        </AdminDrawerContext.Provider>)
    );
};

export default AdminDrawer;

export const useAdminDrawer = () => {
    const context = useContext(AdminDrawerContext);
    if (context === null) {
        throw new Error(
            "useAdminDrawer must be used within the AdminDrawer provider"
        );
    }
    return context;
};
