"use client";

import {
    useCreateCourseMutation,
    useUpdateCourseMutation,
} from "@app/hooks/useCourses";
import {
    Input,
    Select,
    SelectItem,
    Button,
    SharedSelection,
} from "@heroui/react";
import { FormEvent, memo, useCallback, useEffect, useState } from "react";
import { Course, CourseCategory } from "@lib/models/course";
import { useEditCourseModal } from "./EditCourseModal";

type EditCourseModalContentProps = {
    isUpdating?: boolean;
    defaultCourse?: Course;
};

const EditCourseModalContent = ({
    isUpdating = false,
    defaultCourse,
}: EditCourseModalContentProps) => {
    const { onClose } = useEditCourseModal();

    const { mutate: updateCourse } = useUpdateCourseMutation();
    const { mutate: createCourse } = useCreateCourseMutation();

    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [discordResourceChannelId, setDiscordResourceChannelId] =
        useState("");
    const [discordVoiceChannelId, setDiscordVoiceChannelId] = useState("");
    const [category, setCategory] = useState<CourseCategory | undefined>(
        undefined
    );

    const [isSubmitting, setIsSubmitting] = useState(false);

    const reset = useCallback(() => {
        if (defaultCourse) {
            setCode(defaultCourse.code);
            setTitle(defaultCourse.title);
            setDiscordResourceChannelId(defaultCourse.discordResourceChannelId);
            setDiscordVoiceChannelId(defaultCourse.discordVoiceChannelId);
            setCategory(defaultCourse.category);
        } else {
            setCode("");
            setTitle("");
            setDiscordResourceChannelId("");
            setDiscordVoiceChannelId("");
            setCategory(undefined);
        }
    }, [defaultCourse]);

    useEffect(() => {
        reset();
    }, [reset]);

    useEffect(() => {
        if (isUpdating && !defaultCourse) {
            onClose();
        }
    }, [isUpdating, defaultCourse, onClose]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!code.trim() || !title.trim() || !category) {
            return;
        }

        setIsSubmitting(true);

        if (isUpdating && defaultCourse) {
            updateCourse(defaultCourse.id, {
                code: code.trim(),
                title: title.trim(),
                discordResourceChannelId,
                discordVoiceChannelId,
                category,
            });
        } else {
            createCourse({
                code: code.trim(),
                title: title.trim(),
                discordResourceChannelId,
                discordVoiceChannelId,
                category,
            });
        }
        setIsSubmitting(false);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4">
            <Input
                className="col-span-3"
                label="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                size="sm"
                isRequired
            />
            <Select
                label="Catégorie"
                size="sm"
                className="col-span-3"
                selectedKeys={category ? [category] : []}
                onSelectionChange={(value: SharedSelection) => {
                    setCategory([...value][0] as CourseCategory);
                }}
                isRequired
            >
                <SelectItem key="ELEC">Elec</SelectItem>
                <SelectItem key="INFO">Info</SelectItem>
                <SelectItem key="MECA">Meca</SelectItem>
                <SelectItem key="MATH">Math</SelectItem>
            </Select>
            <Input
                className="col-span-6"
                label="Nom du cours"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="sm"
                isRequired
            />
            <Input
                className="col-span-3"
                label="Id du salon de ressource discord"
                value={discordResourceChannelId}
                onChange={(e) => setDiscordResourceChannelId(e.target.value)}
                size="sm"
                isRequired
            />
            <Input
                className="col-span-3"
                label="Id du salon vocal discord"
                value={discordVoiceChannelId}
                onChange={(e) => setDiscordVoiceChannelId(e.target.value)}
                size="sm"
                isRequired
            />
            <Button onPress={onClose} className="col-span-2">
                Annuler
            </Button>
            <Button onPress={reset} className="col-span-2">
                Réinitialiser
            </Button>
            <Button type="submit" className="col-span-2" isLoading={isSubmitting}>
                Enregistrer
            </Button>
        </form>
    );
};

export default memo(EditCourseModalContent);
