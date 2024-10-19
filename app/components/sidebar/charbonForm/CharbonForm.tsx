"use client";

import { CharbonCreateInput } from "@lib/models/charbon";
import { useCreateCharbon } from "@app/hooks/useCharbons";
import { useGetCourses } from "@app/hooks/useCourses";
import { useGetActionneurs } from "@app/hooks/useActionneurs";
import styles from './CharbonForm.module.css';

const CharbonForm = () => {
    const getCourses = useGetCourses();
    const getActionneurs = useGetActionneurs();
    const { createCharbon, loading } = useCreateCharbon();

    const submit = async (formData: FormData) => {
        const charbon: CharbonCreateInput = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            timestamp: new Date(formData.get("timestamp") as string),
            courseId: Number(formData.get("courseId")),
            actionneurIds: Array.from(formData.getAll("actionneurIds")).map(Number),
        };
        createCharbon(charbon);
    };

    const courses = getCourses();
    const actionneurs = getActionneurs();

    return (
        <form action={submit} className={styles.formContainer}>
            <div>
                <label htmlFor="name" className={styles.formLabel}>Name</label>
                <input type="text" name="name" className={styles.formField} />
            </div>

            <div>
                <label htmlFor="description" className={styles.formLabel}>Description</label>
                <textarea name="description" className={styles.formField} />
            </div>

            <div>
                <label htmlFor="timestamp" className={styles.formLabel}>Timestamp</label>
                <input type="datetime-local" name="timestamp" className={styles.formField} />
            </div>

            <div>
                <label htmlFor="courseId" className={styles.formLabel}>Course</label>
                <select name="courseId" className={styles.selectField}>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.code}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="actionneurIds" className={styles.formLabel}>Actionneur IDs</label>
                <select name="actionneurIds" multiple className={styles.selectField}>
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
                    className={`${styles.submitButton} ${loading && styles.submitButtonDisabled}`}
                >
                    {loading ? "Loading..." : "Add Charbon"}
                </button>
            </div>
        </form>
    );
};

export default CharbonForm;
