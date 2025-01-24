"use client";

import { useConnect } from "@app/hooks/useAuth";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { createContext, ReactNode, useContext } from "react";

type VerificationModalContextType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
};

const VerificationModalContext =
    createContext<VerificationModalContextType | null>(null);

const VerificationModal = ({ children }: { children: ReactNode }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [connect, ,] = useConnect();

    return (
        //TODO: review html here
        <VerificationModalContext.Provider
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
                    <div>
                        <ModalHeader>Verification</ModalHeader>
                        <ModalBody>
                            <p>
                                <strong>
                                    Pourquoi devez-vous vous vérifier ?
                                </strong>
                                <br />
                                Certaines ressources du site sont réservés aux
                                étudiants de l{"'"}UTBM pour des raisons de
                                droits d{"'"}auteurs. Pour y accéder, nous
                                devons nous assurer que vous êtes bel et bien un
                                étudiant de l{"'"}UTBM en vérifiant que vous
                                êtes présent sur le pôle UTBM de discord.
                            </p>
                            <br />
                            <p>
                                <strong>Etape 1: connexion au pôle UTBM</strong>
                                <br />
                                Dans un premier temps, rejoignez le pôle UTBM de
                                discord en utilisant{" "}
                                <a
                                    onClick={onClose}
                                    className="underline cursor-pointer"
                                >
                                    cette invitation.
                                </a>
                                <br />
                                Vous aurez besoin de vérifier votre mail UTBM
                                afin de rejoindre le pôle.
                            </p>
                            <p>
                                <strong>
                                    Etape 2: liaison du compte discord au site
                                </strong>
                                <br />
                                Ensuite, il vous faut lier votre compte discord
                                au site afin que nous puissions vérifier que
                                vous êtes membr/e du pôle UTBM.{" "}
                                <a
                                    onClick={() => connect(onClose)}
                                    className="underline cursor-pointer"
                                >
                                    Lier votre compte discord au site.
                                </a>
                                <br />
                            </p>
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
