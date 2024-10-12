import {
    createCourseService,
    deleteCourseService,
} from "@/lib/services/courseService";
import { useCoursesContext } from "../context/CoursesContext";
import { useState } from "react";
import { CourseCreateInput } from "@/lib/models/course";

export const useGetCourses = () => {
    const { getCourses } = useCoursesContext();
    return getCourses;
};

export const useGetCourseById = () => {
    const { getCourses } = useCoursesContext();
    const getCourseById = (id: number) => getCourses().find((c) => c.id === id);
    return getCourseById;
};

export const useCreateCourse = () => {
    const { addCourse } = useCoursesContext();

    const [loading, setLoading] = useState(false);
    const createCourse = async (newCourse: CourseCreateInput) => {
        setLoading(true);
        const course = await createCourseService(newCourse);
        addCourse(course);
        setLoading(false);
    };

    return { createCourse, loading };
};

export const useDeleteCourse = () => {
    const { removeCourse: removeCourseFromContext } = useCoursesContext();

    const [loading, setLoading] = useState(false);
    const deleteCourse = async (id: number) => {
        setLoading(true);
        await deleteCourseService(id);
        removeCourseFromContext(id);
        setLoading(false);
    };

    return { deleteCourse, loading };
};
