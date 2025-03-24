"use client";

import {
    useCreateCourseMutation,
    useUpdateCourseMutation,
} from "@app/hooks/useCourses";
import { Input, Select, SelectItem, Button } from "@heroui/react";
import { memo, useCallback, useEffect, useState } from "react";
import { Course, CourseCategory } from "@lib/models/course";
import { useEditCourseModal } from "./EditCourseModal";

type EditCourseModalContentProps = {
    defaultCourse: Course;
};

const EditCourseModalContent = ({
    defaultCourse,
}: EditCourseModalContentProps) => {
    const isUpdating = !!defaultCourse;
    const { onClose } = useEditCourseModal();

    const [updateCourse] = useUpdateCourseMutation();
    const [createCourse] = useCreateCourseMutation();

    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [discordResourceChannelId, setDiscordResourceChannelId] =
        useState("");
    const [discordVoiceChannelId, setDiscordVoiceChannelId] = useState("");
    const [category, setCategory] = useState<CourseCategory | undefined>(
        undefined
    );

    const reset = useCallback(() => {
        if (defaultCourse) {
            setCode(defaultCourse.code);
            setTitle(defaultCourse.title);
            setDiscordResourceChannelId(defaultCourse.discordResourceChannelId);
            setDiscordVoiceChannelId(defaultCourse.discordVoiceChannelId);
            setCategory(defaultCourse.category);
        }
    }, [defaultCourse]);

    useEffect(() => {
        reset();
    }, [reset]);

    const submit = () => {
        if (isUpdating) {
            updateCourse(defaultCourse.id, {
                code,
                title,
                discordResourceChannelId,
                discordVoiceChannelId,
                category, //TODO: handle case where undefined
            });
        } else {
            createCourse({
                code,
                title,
                discordResourceChannelId,
                discordVoiceChannelId,
                category, //TODO: handle case where undefined
            });
        }
        onClose();
    };

    return (
        <div className="grid grid-cols-6 gap-4">
            <Input
                className="col-span-3"
                label="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                size="sm"
            />
            <Select
                label="Catégorie"
                size="sm"
                className="col-span-3"
                value={category}
                onChange={(e) => setCategory(e.target.value as CourseCategory)}
            >
                <SelectItem key="ELEC" value="ELEC">
                    Elec
                </SelectItem>
                <SelectItem key="INFO" value="INFO">
                    Info
                </SelectItem>
                <SelectItem key="MECA" value="MECA">
                    Meca
                </SelectItem>
                <SelectItem key="MATH" value="MATH">
                    Math
                </SelectItem>
            </Select>
            <Input
                className="col-span-6"
                label="Nom du cours"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="sm"
            />
            <Input
                className="col-span-3"
                label="Id du salon de ressource discord"
                value={discordResourceChannelId}
                onChange={(e) => setDiscordResourceChannelId(e.target.value)}
                size="sm"
            />
            <Input
                className="col-span-3"
                label="Id du salon vocal discord"
                value={discordVoiceChannelId}
                onChange={(e) => setDiscordVoiceChannelId(e.target.value)}
                size="sm"
            />
            <Button onPress={onClose} className="col-span-2">
                Annuler
            </Button>
            <Button onPress={reset} className="col-span-2">
                Réinitialiser
            </Button>
            <Button onPress={submit} className="col-span-2">
                Enregistrer
            </Button>
        </div>
    );
};

export default memo(EditCourseModalContent);
