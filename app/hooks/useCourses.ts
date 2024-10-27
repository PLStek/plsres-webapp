import { createCourseService, deleteCourseService } from "@lib/services/course";
import { CoursesContext } from "../context/CoursesContext";
import { useContext, useState } from "react";
import { CourseCreateInput } from "@lib/models/course";

export const useCourses = () => {
    const context = useContext(CoursesContext);

    if (!context) {
        throw new Error("useCourses must be used within a CoursesProvider");
    }

    const { courses, addCourse, removeCourse } = context;

    const [loading, setLoading] = useState({
        create: false,
        delete: false,
    });

    const fetchCourseById = (id: number) => courses.find((c) => c.id === id);

    const createCourse = async (newCourse: CourseCreateInput) => {
        setLoading((prev) => ({ ...prev, create: true }));
        const course = await createCourseService(newCourse);
        addCourse(course);
        setLoading((prev) => ({ ...prev, create: false }));
    };

    const deleteCourse = async (id: number) => {
        setLoading((prev) => ({ ...prev, delete: true }));
        await deleteCourseService(id);
        removeCourse(id);
        setLoading((prev) => ({ ...prev, delete: false }));
    };

    return {
        courses,
        fetchCourseById,
        createCourse,
        deleteCourse,
        loading,
    };
};
