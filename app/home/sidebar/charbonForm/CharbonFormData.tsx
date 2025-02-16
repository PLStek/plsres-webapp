import { useActionneursQuery } from "@app/hooks/useActionneurs";
import { useCoursesQuery } from "@app/hooks/useCourses";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Charbon } from "@lib/models/charbon";

type CharbonFormDataProps = {
    defaultCharbon: Charbon;
};

export const CharbonFormData = ({ defaultCharbon }: CharbonFormDataProps) => {
    const [courses] = useCoursesQuery();
    const defaultCourse = courses.find((c) => c.id === defaultCharbon.courseId);

    const [actionneurs] = useActionneursQuery();
    const defaultActionneurs = actionneurs.reduce((acc, actionneur) => {
        if (defaultCharbon.actionneurIds.includes(actionneur.id)) {
            acc.push(actionneur.id.toString());
        }
        return acc;
    }, [] as string[]);

    return (
        <div className="flex flex-col gap-4">
            <Input
                name="title"
                label="Titre"
                defaultValue={defaultCharbon.title}
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
        </div>
    );
};
