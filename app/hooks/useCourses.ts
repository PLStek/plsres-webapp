import { createCourseAction, deleteCourseAction } from "@lib/actions";
import { useState } from "react";
import { CourseCreateInput } from "@lib/models/course";
import { useCourseContext } from "@app/context/CourseContext";

export const useCoursesQuery = () => {
    const { courses } = useCourseContext();
    return [courses] as const;
};

export const useCourseByIdQuery = (id: number) => {
    const { courses } = useCourseContext();
    const course = courses.find((c) => c.id === id);
    return [course] as const;
};

export const useCreateCourseMutation = () => {
    const { addCourse } = useCourseContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (newCourse: CourseCreateInput) => {
        try {
            const course = await createCourseAction(newCourse);
            addCourse(course);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return [mutate, loading, error] as const;
};

export const useDeleteCourseMutation = () => {
    const { removeCourse } = useCourseContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (id: number) => {
        try {
            setLoading(true);
            await deleteCourseAction(id);
            removeCourse(id);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return [mutate, loading, error] as const;
};
