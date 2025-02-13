"use client";

import {
    useConnectActionneur,
    useIsActionneur,
    useIsActionneurAuthentified,
} from "@app/hooks/useAuth";
import {
    CircularProgress,
    InputOtp,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";

type ActionneurConnectionModalContextType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
};

const ActionneurConnectionModalContext =
    createContext<ActionneurConnectionModalContextType | null>(null);

const ActionneurConnectionModal = ({ children }: { children: ReactNode }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [isActionneur] = useIsActionneur();
    const [isActionneurAuthentified] = useIsActionneurAuthentified();
    const [connectActionneur, loadingConnect, errorConnect] =
        useConnectActionneur();

    const onCodeChange = (code: string) => {
        if (code.length === 4) {
            connectActionneur(code);
        }
    };

    useEffect(() => {
        if (isOpen && (!isActionneur || isActionneurAuthentified)) {
            onClose();
        }
    }, [isOpen, isActionneur, isActionneurAuthentified, onClose]);

    return (
        //TODO: review html here
        <ActionneurConnectionModalContext.Provider
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
                    <ModalHeader>Vérification actionneur</ModalHeader>
                    <ModalBody>
                        <p>Entrez votre code secret</p>
                        <InputOtp
                            length={4}
                            onValueChange={onCodeChange}
                            disabled={loadingConnect}
                            size="lg"
                            autoFocus
                        ></InputOtp>
                        {loadingConnect && <CircularProgress />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ActionneurConnectionModalContext.Provider>
    );
};

export default ActionneurConnectionModal;

export const useActionneurConnectionModal = () => {
    const context = useContext(ActionneurConnectionModalContext);
    if (context === null) {
        throw new Error(
            "useActionneurConnectionModal must be used within the ActionneurConnectionModal provider"
        );
    }
    return context;
};
