"use server";

import { getCourses, postCourse, putCourse } from "../data/courseData";
import { CourseCreateInput, CourseUpdateInput } from "../models/course";

export const getCoursesService = async () => {
    return getCourses();
};

export const getCourseByIdService = async (id: number) => {
    const courses = await getCourses();
    return courses.find((course) => course.id === id);
};

export const createCourseService = async (data: CourseCreateInput) => {
    return postCourse(data);
};

export const updateCourseService = async (
    id: number,
    data: CourseUpdateInput
) => {
    return putCourse(id, data);
};
