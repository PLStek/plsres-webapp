"use client";

import CharbonEditor from "../../charbonEditor/CharbonEditor";
import { useFullCharbonByIdQuery } from "@app/hooks/useCharbons";
import {
    CircularProgress,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    useDisclosure,
} from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import {
    createContext,
    memo,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

type EditCharbonDrawerContextType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
    setCharbonId: (charbonId: number) => void;
};

const EditCharbonDrawerContext =
    createContext<EditCharbonDrawerContextType | null>(null);

const EditCharbonDrawer = ({ children }: { children: ReactNode }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [charbonId, setCharbonId] = useState<number | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const [charbon, isLoading] = useFullCharbonByIdQuery(charbonId);
    useEffect(() => {
        if (isLoading === false && !charbonId && !charbon && isOpen) {
            onClose(); //TODO: afficher message à la place
            setCharbonId(null);
        }
    }, [isLoading, charbon, charbonId, isOpen, onClose]);

    const resetAfterClose = () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("charbon")) {
            router.replace(pathname);
            setCharbonId(null);
        }
    };

    return (
        <EditCharbonDrawerContext.Provider
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
                        resetAfterClose();
                    }
                    onOpenChange();
                }}
                size="2xl"
            >
                <DrawerContent>
                    <DrawerHeader>Modifier le charbon</DrawerHeader>
                    <DrawerBody className="p-4 h-full">
                        {!isLoading && charbon ? (
                            <CharbonEditor
                                defaultCharbon={charbon}
                                onClose={() => {
                                    onClose();
                                    resetAfterClose();
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
        </EditCharbonDrawerContext.Provider>
    );
};

export default memo(EditCharbonDrawer);

export const useEditCharbonDrawer = () => {
    const context = useContext(EditCharbonDrawerContext);
    if (!context) {
        throw new Error(
            "useEditCharbonDrawer must be used within the EditCharbonDrawer provider"
        );
    }
    return context;
};
