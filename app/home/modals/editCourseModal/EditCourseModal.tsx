"use client";

import {
    useCourseByIdQuery,
    useUpdateCourseMutation,
} from "@app/hooks/useCourses";
import {
    CircularProgress,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Input,
    Select,
    SelectItem,
    useDisclosure,
    Button,
} from "@heroui/react";
import {
    createContext,
    memo,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { CourseCategory } from "@lib/models/course";
import EditCourseModalContent from "./EditCourseModalContent";

type EditCourseModalContextType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
    setCourseId: (courseId: number) => void;
};

const EditCourseModalContext = createContext<EditCourseModalContextType | null>(
    null
);

const EditCourseModal = ({ children }: { children: ReactNode }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [courseId, setCourseId] = useState<number | null>(null);

    const [course] = useCourseByIdQuery(courseId);
    const [updateCourse] = useUpdateCourseMutation();

    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [discordResourceChannelId, setDiscordResourceChannelId] =
        useState("");
    const [discordVoiceChannelId, setDiscordVoiceChannelId] = useState("");
    const [category, setCategory] = useState<CourseCategory | undefined>(
        undefined
    );

    const reset = useCallback(() => {
        if (course) {
            setCode(course.code);
            setTitle(course.title);
            setDiscordResourceChannelId(course.discordResourceChannelId);
            setDiscordVoiceChannelId(course.discordVoiceChannelId);
            setCategory(course.category);
        }
    }, [course]);

    useEffect(() => {
        reset();
    }, [reset]);

    useEffect(() => {
        if (!courseId && !course && isOpen) {
            onClose(); //TODO: afficher message à la place
            setCourseId(null);
        }
    }, [course, courseId, isOpen, onClose]);

    const submit = () => {
        updateCourse(courseId!, {
            code,
            title,
            discordResourceChannelId,
            discordVoiceChannelId,
            category, //TODO: handle case where undefined
        });
        onClose();
    };

    return (
        <EditCourseModalContext.Provider
            value={{
                isOpen,
                onOpen,
                onClose,
                onOpenChange,
                setCourseId,
            }}
        >
            {children}
            <Modal
                isOpen={isOpen}
                onOpenChange={() => {
                    onOpenChange();
                }}
                size="2xl"
            >
                <ModalContent>
                    <ModalHeader>Modifier le cours</ModalHeader>
                    <ModalBody className="p-4 h-full">
                        {course ? (
                            <EditCourseModalContent
                                defaultCourse={course}
                                onClose={onClose}
                            />
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
