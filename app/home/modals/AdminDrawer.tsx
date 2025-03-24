"use client";

import {
    Drawer,
    DrawerBody,
    DrawerContent,
    useDisclosure,
    DrawerHeader,
} from "@heroui/react";
import { createContext, ReactNode, useContext } from "react";
import AdminSettingsEditor from "../adminSettingsEditor/AdminSettingsEditor";
import { useActionneurConnectionModal } from "./ActionneurConnectionModal";
import { useIsActionneurAuthentified, useIsAdmin } from "@app/hooks/useAuth";

type AdminDrawerContextType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const AdminDrawerContext = createContext<AdminDrawerContextType | null>(null);

const AdminDrawer = ({ children }: { children: ReactNode }) => {
    const { onOpen: onActionneurConnectionModalOpen } =
        useActionneurConnectionModal();
    const [isActionneurAuthentified] = useIsActionneurAuthentified();
    const [isAdmin] = useIsAdmin();

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    return (
        <AdminDrawerContext.Provider
            value={{
                isOpen,
                onOpen: () => {
                    if (!isAdmin) {
                        return;
                    }
                    if (!isActionneurAuthentified) {
                        onActionneurConnectionModalOpen();
                    } else {
                        onOpen();
                    }
                },
                onClose,
            }}
        >
            {children}
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <DrawerContent>
                    <DrawerHeader>Espace administrateur</DrawerHeader>
                    <DrawerBody>
                        <AdminSettingsEditor />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </AdminDrawerContext.Provider>
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
