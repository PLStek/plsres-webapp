"use client";

import { useConnectFromDiscordId } from "@app/hooks/useAuth";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

type VerificationModalContextType = {
    isOpen: boolean;
    onOpen: (discordId: string) => void;
    onClose: () => void;
};

const VerificationModalContext =
    createContext<VerificationModalContextType | null>(null);

const VerificationModal = ({ children }: { children: ReactNode }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure({
        onClose: () => {
            setDiscordId(null);
        },
        onChange: (isOpen) => {
            if (!isOpen) {
                setDiscordId(null);
            }
        },
    });

    const [discordId, setDiscordId] = useState<string | null>(null);
    const [showValidateButton, setShowValidateButton] = useState(false);

    const [connect] = useConnectFromDiscordId();

    useEffect(() => {
        if (!discordId && isOpen) {
            onClose(); //TODO: afficher message à la place
            setDiscordId(null);
        }
    }, [discordId, isOpen, onClose]);

    const onConnect = () => {
        if (discordId) {
            connect(discordId, onClose);
        }
    };

    return (
        //TODO: review html here
        <VerificationModalContext.Provider
            value={{
                isOpen,
                onOpen: (discordId: string) => {
                    setDiscordId(discordId);
                    onOpen();
                },
                onClose,
            }}
        >
            {children}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <div>
                        <ModalHeader>Verification</ModalHeader>
                        <ModalBody>
                            <h2>Bienvenue !</h2>
                            <p>
                                Afin que nous puissions vérifier que tu es bien
                                un étudiant de l'UTBM, merci de bien vouloir
                                rejoindre le pôle UTBM de discord.
                            </p>
                            <Button
                                onPress={() => {
                                    window.open(
                                        "https://discord.gg/nMdXGCnM8J"
                                    );
                                    setShowValidateButton(true);
                                }}
                            >
                                Rejoindre le pôle UTBM
                            </Button>
                            {showValidateButton && (
                                <Button onPress={onConnect}>
                                    {"J'ai rejoint le pôle UTBM"}
                                </Button>
                            )}
                        </ModalBody>
                    </div>
                </ModalContent>
            </Modal>
        </VerificationModalContext.Provider>
    );
};

export default VerificationModal;

export const useVerificationModal = () => {
    const context = useContext(VerificationModalContext);
    if (context === null) {
        throw new Error(
            "useVerificationModal must be used within the VerificationModal provider"
        );
    }
    return context;
};
