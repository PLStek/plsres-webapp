"use client";

import CharbonForm from "../../sidebar/charbonForm/CharbonForm";
import { useFullCharbonByIdQuery } from "@app/hooks/useCharbons";
import {
    CircularProgress,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    useDisclosure,
} from "@heroui/react";
import {
    createContext,
    memo,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

type EditCharbonModalContextType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
    setCharbonId: (charbonId: number) => void;
};

const EditCharbonModalContext =
    createContext<EditCharbonModalContextType | null>(null);

const EditCharbonModal = ({ children }: { children: ReactNode }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [charbonId, setCharbonId] = useState<number | null>(null);

    const [charbon, isLoading] = useFullCharbonByIdQuery(charbonId);
    useEffect(() => {
        if (isLoading === false && !charbonId && !charbon && isOpen) {
            onClose(); //TODO: afficher message à la place
            setCharbonId(null);
        }
    }, [isLoading, charbon, charbonId, isOpen, onClose]);

    return (
        <EditCharbonModalContext.Provider
            value={{
                isOpen,
                onOpen,
                onClose,
                onOpenChange,
                setCharbonId,
            }}
        >
            {children}
            <Drawer
                isOpen={isOpen}
                onOpenChange={() => {
                    if (isOpen) {
                        setCharbonId(null);
                    }
                    onOpenChange();
                }}
                size="2xl"
            >
                <DrawerContent>
                    <DrawerHeader>Modifier le charbon</DrawerHeader>
                    <DrawerBody className="p-4 h-full">
                        {!isLoading && charbon ? (
                            <CharbonForm
                                defaultCharbon={charbon}
                                onClose={() => {
                                    onClose();
                                }}
                            />
                        ) : (
                            <div className="w-full flex justify-center my-16">
                                <CircularProgress label="Chargement du charbon" />
                            </div>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </EditCharbonModalContext.Provider>
    );
};

export default memo(EditCharbonModal);

export const useEditCharbonModal = () => {
    const context = useContext(EditCharbonModalContext);
    if (!context) {
        throw new Error(
            "useEditCharbonModal must be used within the EditCharbonModal provider"
        );
    }
    return context;
};
