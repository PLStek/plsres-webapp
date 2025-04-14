import { createCourseAction, updateCourseAction } from "@lib/actions";
import { CourseCreateInput, CourseUpdateInput } from "@lib/models/course";
import { useMutationState } from "./useQueryState";
import { useAtom, useAtomValue } from "jotai";
import {
    addCourseAtom,
    coursesAtom,
    updateCourseAtom,
} from "@app/atoms/courseAtoms";

export const useCoursesQuery = () => {
    const courses = useAtomValue(coursesAtom);
    return { data: courses };
};

export const useCourseByIdQuery = (id: number | null) => {
    const courses = useAtomValue(coursesAtom);
    const course = courses.find((c) => c.id === id);
    return { data: course ?? null };
};

export const useCreateCourseMutation = () => {
    const [, addCourse] = useAtom(addCourseAtom);

    const mutation = async (newCourse: CourseCreateInput) => {
        const result = await createCourseAction(newCourse);
        if (result.data) {
            addCourse(result.data);
        }
        return result;
    };

    const result = useMutationState({ mutation });
    return result;
};

export const useUpdateCourseMutation = () => {
    const [, updateCourse] = useAtom(updateCourseAtom);

    const mutation = async (id: number, course: CourseUpdateInput) => {
        const result = await updateCourseAction(id, course);
        if (result.data) {
            updateCourse(result.data);
        }
        return result;
    };

    const result = useMutationState({ mutation });
    return result;
};
