import { Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";

export const getCourses = async () => {
    return prisma.course.findMany();
};

export const getCourseById = async (id: number) => {
    return prisma.course.findUniqueOrThrow({ where: { id } });
};

export const getCourseByDiscordVoiceChannelId = async (
    discordVoiceChannelId: string
) => {
    return prisma.course.findUniqueOrThrow({
        where: { discordVoiceChannelId },
    });
};

export const postCourse = async (data: Prisma.CourseCreateInput) => {
    return prisma.course.create({
        data,
    });
};

export const putCourse = async (id: number, data: Prisma.CourseUpdateInput) => {
    return prisma.course.update({
        where: { id },
        data,
    });
};

export const deleteCourse = async (id: number) => {
    return prisma.course.delete({
        where: { id },
    });
};
