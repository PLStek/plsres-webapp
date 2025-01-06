"use client";

import { Charbon, CharbonUpdateInput } from "@lib/models/charbon";
import styles from "./CharbonForm.module.css";
import { useCoursesQuery } from "@app/hooks/useCourses";
import { useActionneursQuery } from "@app/hooks/useActionneurs";
import { useUpdateCharbonMutation } from "@app/hooks/useCharbons";
import CardResources from "@app/home/charbonMine/charbonCard/CardResources";
import { useResourcesByCharbonIdQuery } from "@app/hooks/useResources";

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
            <div>
                <input
                    type="text"
                    name="name"
                    className={styles.formField}
                    defaultValue={defaultCharbon.name}
                />
            </div>

            <div>
                <textarea
                    name="description"
                    className={styles.formField}
                    defaultValue={defaultCharbon.description}
                    rows={4}
                />
            </div>

            <div className="flex gap-4">
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
            <div className="my-4">
                {defaultResources && (
                    <CardResources resources={defaultResources} editMode />
                )}
            </div>

            <div className="flex">
                <button
                    type="button"
                    disabled={loading}
                    className={`${styles.submitButton} ${
                        loading && styles.submitButtonDisabled
                    }`}
                    onClick={onClose}
                >
                    {loading ? "Loading..." : "Annuler"}
                </button>
                <button
                    type="reset"
                    disabled={loading}
                    className={`${styles.submitButton} ${
                        loading && styles.submitButtonDisabled
                    }`}
                >
                    {loading ? "Loading..." : "Réinitialiser"}
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`${styles.submitButton} ${
                        loading && styles.submitButtonDisabled
                    }`}
                >
                    {loading
                        ? "Loading..."
                        : defaultCharbon.isDraft
                        ? "Publier"
                        : "Editer"}
                </button>
            </div>
        </form>
    );
};

export default CharbonForm;
