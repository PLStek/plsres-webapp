"use client";

import { atom } from "jotai";
import { Course } from "@lib/models/course";

export const coursesAtom = atom<Course[]>([]);

export const addCourseAtom = atom(null, (get, set, newCourse: Course) => {
    const courses = get(coursesAtom);
    set(coursesAtom, [...courses, newCourse]);
});

export const updateCourseAtom = atom(
    null,
    (get, set, updatedCourse: Course) => {
        const courses = get(coursesAtom);
        set(
            coursesAtom,
            courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
        );
    }
);

export const removeCourseAtom = atom(null, (get, set, id: number) => {
    const courses = get(coursesAtom);
    set(
        coursesAtom,
        courses.filter((c) => c.id !== id)
    );
});
