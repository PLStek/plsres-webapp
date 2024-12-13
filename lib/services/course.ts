import { Prisma } from "@prisma/client";
import {
    deleteCourse,
    getCourseByDiscordVoiceChannelId,
    getCourseById,
    getCourses,
    postCourse,
    putCourse,
} from "../data/course";
import {
    Course,
    CourseCategory,
    CourseCreateInput,
    CourseUpdateInput,
} from "../models/course";

const buildCourse = (
    course: Prisma.PromiseReturnType<typeof getCourseById>
) => ({
    ...course,
    category: course.category as CourseCategory,
});

export const getCoursesService = async (): Promise<Course[]> => {
    const courses = await getCourses();
    return courses.map(buildCourse);
};

export const getCourseByIdService = async (
    id: number
): Promise<Course | null> => {
    //TODO: handle error
    const course = await getCourseById(id);
    return buildCourse(course);
};

export const getCourseByDiscordVoiceChannelIdService = async (
    discordVoiceChannelId: string
): Promise<Course | null> => {
    const course = await getCourseByDiscordVoiceChannelId(
        discordVoiceChannelId
    );
    return buildCourse(course);
};

export const createCourseService = async (data: CourseCreateInput) => {
    const course = await postCourse(data);
    return buildCourse(course);
};

export const updateCourseService = async (
    id: number,
    data: CourseUpdateInput
) => {
    return putCourse(id, data);
};

export const deleteCourseService = async (id: number) => {
    return deleteCourse(id);
};
