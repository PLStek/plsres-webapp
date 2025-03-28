import { createCourseAction, updateCourseAction } from "@lib/actions";
import {
    Course,
    CourseCreateInput,
    CourseUpdateInput,
} from "@lib/models/course";
import { useCourseContext } from "@app/context/CourseContext";
import { useMutationState } from "./useQueryState";

export const useCoursesQuery = () => {
    const { courses } = useCourseContext();
    return { data: courses };
};

export const useCourseByIdQuery = (id: number | null) => {
    const { courses } = useCourseContext();
    const course = courses.find((c) => c.id === id);
    return { data: course ?? null };
};

export const useCreateCourseMutation = () => {
    const { addCourse } = useCourseContext();

    const mutation = async (newCourse: CourseCreateInput) => {
        const result = await createCourseAction(newCourse);
        if (result.data) {
            addCourse(result.data);
        }
        return result;
    };

    const result = useMutationState<Course>({ mutation });
    return result;
};

export const useUpdateCourseMutation = () => {
    const { updateCourse } = useCourseContext();

    const mutation = async (id: number, course: CourseUpdateInput) => {
        const result = await updateCourseAction(id, course);
        if (result.data) {
            updateCourse(result.data);
        }
        return result;
    };

    const result = useMutationState<Course>({ mutation });
    return result;
};
