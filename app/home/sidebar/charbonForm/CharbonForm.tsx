"use client";

import { Charbon, CharbonUpdateInput } from "@lib/models/charbon";
import { useCoursesQuery } from "@app/hooks/useCourses";
import { useActionneursQuery } from "@app/hooks/useActionneurs";
import { useUpdateCharbonMutation } from "@app/hooks/useCharbons";
import CardResources from "@app/home/charbonMine/charbonCard/CardResources";
import { useResourcesByCharbonIdQuery } from "@app/hooks/useResources";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

type CharbonFormProps = {
    defaultCharbon: Charbon;
    onClose: () => void;
};

const CharbonForm = ({ defaultCharbon, onClose }: CharbonFormProps) => {
    const [courses] = useCoursesQuery();
    const defaultCourse = courses.find((c) => c.id === defaultCharbon.courseId); //TODO: useCourseByCharbonId ?
    const [defaultResources] = useResourcesByCharbonIdQuery(defaultCharbon.id);

    const [actionneurs] = useActionneursQuery();
    const defaultActionneurs = actionneurs.reduce((acc, actionneur) => {
        if (defaultCharbon.actionneurIds.includes(actionneur.id)) {
            acc.push(actionneur.id.toString());
        }
        return acc;
    }, [] as string[]);

    const [updateCharbon, loading] = useUpdateCharbonMutation();

    const submit = async (formData: FormData) => {
        const charbon: CharbonUpdateInput = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            courseId: Number(formData.get("courseId")),
            actionneurIds: Array.from(formData.getAll("actionneurIds")).map(
                Number
            ),
            isDraft: false,
        };
        await updateCharbon(defaultCharbon.id, charbon);
        onClose();
    };

    return (
        <form action={submit} className="flex flex-col gap-4">
            <Input
                name="name"
                label="Titre"
                defaultValue={defaultCharbon.name}
                size="sm"
                isRequired
            />
            <Textarea
                name="description"
                label="Description"
                defaultValue={defaultCharbon.description}
                size="sm"
                isRequired
            />
            <div className="flex gap-4">
                <Select
                    name="courseId"
                    placeholder="UV"
                    defaultSelectedKeys={
                        defaultCourse
                            ? [defaultCourse.id.toString()]
                            : undefined
                    }
                    size="sm"
                >
                    {courses.map((course) => (
                        <SelectItem key={course.id}>{course.code}</SelectItem>
                    ))}
                </Select>
                <Select
                    name="actionneurIds"
                    selectionMode="multiple"
                    placeholder="Actionneurs"
                    defaultSelectedKeys={defaultActionneurs}
                    size="sm"
                >
                    {actionneurs.map((actionneur) => (
                        <SelectItem key={actionneur.id}>
                            {actionneur.username}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="my-4">
                {defaultResources && (
                    <CardResources resources={defaultResources} editMode />
                )}
            </div>

            <div className="flex justify-evenly gap-4">
                <Button
                    type="button"
                    disabled={loading}
                    onPress={onClose}
                    size="md"
                    fullWidth
                >
                    {loading ? "Loading..." : "Annuler"}
                </Button>
                <Button
                    type="reset"
                    disabled={loading}
                    size="md"
                    fullWidth
                >
                    {loading ? "Loading..." : "Réinitialiser"}
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    fullWidth
                    size="md"
                    isLoading={loading}
                >
                    {defaultCharbon.isDraft ? "Publier" : "Editer"}
                </Button>
            </div>
        </form>
    );
};

export default CharbonForm;
