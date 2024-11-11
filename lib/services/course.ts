"use server";

import {
    deleteCourse,
    getCourses,
    postCourse,
    putCourse,
} from "../data/course";
import { CourseCreateInput, CourseUpdateInput } from "../models/course";
import { withAuth } from "./auth";

export const getCoursesService = async () => {
    return getCourses();
};

export const getCourseByIdService = async (id: number) => {
    const courses = await getCourses();
    return courses.find((course) => course.id === id);
};

export const createCourseService = withAuth("admin")(
    async (data: CourseCreateInput) => {
        return postCourse(data);
    }
);

export const updateCourseService = withAuth("admin")(
    async (id: number, data: CourseUpdateInput) => {
        return putCourse(id, data);
    }
);

export const deleteCourseService = withAuth("admin")(async (id: number) => {
    return deleteCourse(id);
});
