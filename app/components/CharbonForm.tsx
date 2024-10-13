"use client";

import { CharbonCreateInput } from "@lib/models/charbon";
import { useCreateCharbon } from "../hooks/useCharbons";
import { useGetCourses } from "../hooks/useCourses";
import { useGetActionneurs } from "../hooks/useActionneurs";
import Loading from "./loading/Loading";

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
            actionneurIds: [],
        };
        createCharbon(charbon);
    };

    const courses = getCourses();

    const actionneurs = getActionneurs();

    return loading ? (
        <Loading />
    ) : (
        <form action={submit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" />
            <label htmlFor="timestamp">Timestamp</label>
            <input type="datetime-local" name="timestamp" />
            <label htmlFor="courseId">Course</label>
            <select name="courseId">
                {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                        {course.code}
                    </option>
                ))}
            </select>
            <label htmlFor="actionneurIds">Actionneur IDs</label>
            <select name="actionneurIds" multiple>
                {actionneurs.map((actionneur) => (
                    <option key={actionneur.id} value={actionneur.id}>
                        {actionneur.username}
                    </option>
                ))}
            </select>
            <button>Add Charbon</button>
        </form>
    );
};

export default CharbonForm;
