"use client";

import { useCourseByIdQuery } from "@app/hooks/useCourses";
import {
    CircularProgress,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
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
import EditCourseModalContent from "./EditCourseModalContent";
import { useIsAdmin } from "@app/hooks/useAuth";

type EditCourseModalContextType = {
    isOpen: boolean;
    onOpen: (courseId: number) => void;
    onClose: () => void;
};

const EditCourseModalContext = createContext<EditCourseModalContextType | null>(
    null
);

const EditCourseModal = ({ children }: { children: ReactNode }) => {
    const [courseId, setCourseId] = useState<number | null>(null);
    const [isAdmin] = useIsAdmin();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure({
        onClose: () => {
            setCourseId(null);
        },
        onChange: (isOpen) => {
            if (!isOpen) {
                setCourseId(null);
            }
        },
    });

    const [course] = useCourseByIdQuery(courseId);

    useEffect(() => {
        if (!courseId && !course && isOpen) {
            onClose(); //TODO: afficher message à la place
        }
    }, [course, courseId, isOpen, onClose]);

    return (
        <EditCourseModalContext.Provider
            value={{
                isOpen,
                onOpen: (courseId: number) => {
                    if (isAdmin) {
                        setCourseId(courseId);
                        onOpen();
                    }
                },
                onClose,
            }}
        >
            {children}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader>Modifier le cours</ModalHeader>
                    <ModalBody className="p-4 h-full">
                        {course ? (
                            <EditCourseModalContent defaultCourse={course} />
                        ) : (
                            <div className="w-full flex justify-center my-16">
                                <CircularProgress label="Chargement de du cours" />
                            </div>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </EditCourseModalContext.Provider>
    );
};

export default memo(EditCourseModal);

export const useEditCourseModal = () => {
    const context = useContext(EditCourseModalContext);
    if (!context) {
        throw new Error(
            "useEditCourseModal must be used within the EditCourseModal provider"
        );
    }
    return context;
};
