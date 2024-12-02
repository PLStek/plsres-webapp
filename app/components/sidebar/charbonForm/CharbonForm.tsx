"use client";

import { Charbon, CharbonUpdateInput } from "@lib/models/charbon";
import styles from "./CharbonForm.module.css";
import { useCoursesQuery } from "@app/hooks/useCourses";
import { useActionneursQuery } from "@app/hooks/useActionneurs";
import { useUpdateCharbonMutation } from "@app/hooks/useCharbons";

type CharbonFormProps = {
    defaultCharbon: Charbon;
};

const CharbonForm = ({ defaultCharbon }: CharbonFormProps) => {
    const [courses] = useCoursesQuery();
    const defaultCourse = courses.find((c) => c.id === defaultCharbon.courseId);

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
        };
        await updateCharbon(defaultCharbon.id, charbon);
    };

    return (
        <form action={submit} className={styles.formContainer}>
            <div>
                <label htmlFor="name" className={styles.formLabel}>
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    className={styles.formField}
                    defaultValue={defaultCharbon.name}
                />
            </div>

            <div>
                <label htmlFor="description" className={styles.formLabel}>
                    Description
                </label>
                <textarea
                    name="description"
                    className={styles.formField}
                    defaultValue={defaultCharbon.description}
                />
            </div>

            <div>
                <label htmlFor="courseId" className={styles.formLabel}>
                    Course
                </label>
                <select
                    name="courseId"
                    className={styles.selectField}
                    defaultValue={defaultCourse?.id ?? ""}
                >
                    <option value="" disabled>
                        UV
                    </option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.code}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="actionneurIds" className={styles.formLabel}>
                    Actionneur IDs
                </label>
                <select
                    name="actionneurIds"
                    multiple
                    className={styles.selectField}
                    defaultValue={defaultActionneurs}
                >
                    {actionneurs.map((actionneur) => (
                        <option key={actionneur.id} value={actionneur.id}>
                            {actionneur.username}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`${styles.submitButton} ${
                        loading && styles.submitButtonDisabled
                    }`}
                >
                    {loading ? "Loading..." : "Add Charbon"}
                </button>
            </div>
        </form>
    );
};

export default CharbonForm;
