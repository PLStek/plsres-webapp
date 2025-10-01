import { useActionneursQuery } from "@app/hooks/useActionneurs";
import { useUpdateCharbonMutation } from "@app/hooks/useCharbons";
import { useCoursesQuery } from "@app/hooks/useCourses";
import {
    Input,
    Select,
    SelectItem,
    SharedSelection,
    Textarea,
} from "@heroui/react";
import { FullCharbon } from "@lib/models/charbon";
import { useState, useRef } from "react";
import Icon from "../components/Icon";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

type CharbonFormProps = {
    defaultCharbon: FullCharbon;
};

export const CharbonForm = ({ defaultCharbon }: CharbonFormProps) => {
    const { mutate: updateCharbon } = useUpdateCharbonMutation();

    const { data: courses } = useCoursesQuery();
    const defaultCourse = courses.find((c) => c.id === defaultCharbon.courseId);

    const { data: actionneurs } = useActionneursQuery();
    const defaultActionneurs = actionneurs.reduce((acc, actionneur) => {
        if (defaultCharbon.actionneurIds.includes(actionneur.id)) {
            acc.push(actionneur.id.toString());
        }
        return acc;
    }, [] as string[]);

    const [titleInput, setTitleInput] = useState(defaultCharbon.title);
    const [descriptionInput, setDescriptionInput] = useState(
        defaultCharbon.description
    );
    const [replayUrlInput, setReplayUrlInput] = useState(
        defaultCharbon.replayUrl ?? null
    );

    const [editingReplayUrl, setEditingReplayUrl] = useState(
        !!defaultCharbon.replayUrl
    );

    const isValidUrl = !!replayUrlInput?.match(
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/
    );

    const titleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const descriptionTimerRef = useRef<NodeJS.Timeout | null>(null);
    const replayUrlTimerRef = useRef<NodeJS.Timeout | null>(null);

    const transformUrl = (url: string) => {
        const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        if (videoIdMatch) {
            return `https://youtu.be/${videoIdMatch[1]}`;
        }
    };

    const updateTitle = () => {
        if (titleInput !== defaultCharbon.title) {
            if (titleTimerRef.current) {
                clearTimeout(titleTimerRef.current);
            }
            updateCharbon(defaultCharbon.id, {
                title: titleInput,
            });
        }
    };

    const updateDescription = () => {
        if (descriptionInput !== defaultCharbon.description) {
            if (descriptionTimerRef.current) {
                clearTimeout(descriptionTimerRef.current);
            }
            updateCharbon(defaultCharbon.id, {
                description: descriptionInput,
            });
        }
    };

    const updateReplayUrl = () => {
        if (
            replayUrlInput &&
            isValidUrl &&
            replayUrlInput !== defaultCharbon.replayUrl
        ) {
            const transformedUrl = transformUrl(replayUrlInput);
            if (transformedUrl) {
                if (replayUrlTimerRef.current) {
                    clearTimeout(replayUrlTimerRef.current);
                }
                updateCharbon(defaultCharbon.id, {
                    replayUrl: transformedUrl,
                });
            }
        }
    };

    const handleTitleChange = (value: string) => {
        setTitleInput(value);

        if (titleTimerRef.current) {
            clearTimeout(titleTimerRef.current);
        }

        titleTimerRef.current = setTimeout(() => {
            if (value !== defaultCharbon.title) {
                updateCharbon(defaultCharbon.id, {
                    title: value,
                });
            }
        }, 1500);
    };

    const handleDescriptionChange = (value: string) => {
        setDescriptionInput(value);

        if (descriptionTimerRef.current) {
            clearTimeout(descriptionTimerRef.current);
        }

        descriptionTimerRef.current = setTimeout(() => {
            if (value !== defaultCharbon.description) {
                updateCharbon(defaultCharbon.id, {
                    description: value,
                });
            }
        }, 1500);
    };

    const handleReplayUrlChange = (value: string) => {
        setReplayUrlInput(value);

        if (replayUrlTimerRef.current) {
            clearTimeout(replayUrlTimerRef.current);
        }

        replayUrlTimerRef.current = setTimeout(() => {
            if (value !== defaultCharbon.replayUrl) {
                updateReplayUrl();
            }
        }, 1500);
    };

    const updateCourse = (course: SharedSelection) => {
        updateCharbon(defaultCharbon.id, {
            courseId: Number([...course][0]),
        });
    };

    const updateActionneurs = (actionneurs: SharedSelection) => {
        updateCharbon(defaultCharbon.id, {
            actionneurIds: [...actionneurs].map((id) => Number(id)),
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <Input
                label="Titre"
                defaultValue={defaultCharbon.title}
                size="sm"
                isRequired
                onValueChange={handleTitleChange}
                onBlur={updateTitle}
                isDisabled={defaultCharbon.isCancelled}
            />
            <Textarea
                label="Description"
                defaultValue={defaultCharbon.description}
                size="sm"
                isRequired
                onValueChange={handleDescriptionChange}
                onBlur={updateDescription}
                isDisabled={defaultCharbon.isCancelled}
            />
            <div className="flex gap-4">
                <Select
                    placeholder="Cours"
                    defaultSelectedKeys={
                        defaultCourse
                            ? [defaultCourse.id.toString()]
                            : undefined
                    }
                    size="sm"
                    onSelectionChange={updateCourse}
                    isDisabled={defaultCharbon.isCancelled}
                >
                    {courses.map((course) => (
                        <SelectItem key={course.id}>{course.code}</SelectItem>
                    ))}
                </Select>
                <Select
                    selectionMode="multiple"
                    placeholder="Actionneurs"
                    defaultSelectedKeys={defaultActionneurs}
                    size="sm"
                    onSelectionChange={updateActionneurs}
                    isDisabled={defaultCharbon.isCancelled}
                >
                    {actionneurs.map((actionneur) => (
                        <SelectItem key={actionneur.id}>
                            {actionneur.username}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            {defaultCharbon.status === "FINISHED" && (
                <Input
                    label="Lien du replay"
                    defaultValue={defaultCharbon.replayUrl ?? undefined}
                    size="sm"
                    onValueChange={handleReplayUrlChange}
                    onBlur={updateReplayUrl}
                    isDisabled={defaultCharbon.isCancelled}
                    /* isReadOnly */
                    isInvalid={!isValidUrl}
                    errorMessage="URL invalide"
                    endContent={
                        <Icon>
                            <PencilSquareIcon></PencilSquareIcon>
                        </Icon>
                    }
                />
            )}
        </div>
    );
};
