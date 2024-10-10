"use client";

import { Course } from "@/lib/models/course";
import { createContext, ReactNode, useContext, useState } from "react";

type CoursesContextType = {
    getCourses: () => Course[];
    getCourseById: (id: number) => Course | undefined;
    addCourse: (newCourse: Course) => void;
    removeCourse: (id: number) => void;
};

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export function CoursesProvider({
    initialCourses,
    children,
}: {
    initialCourses: Course[];
    children: ReactNode;
}) {
    const [courses, setCourses] = useState(initialCourses || []);

    const getCourses = () => courses;
    const getCourseById = (id: number) => courses.find((c) => c.id === id);
    const addCourse = (newCourse: Course) =>
        setCourses([...courses, newCourse]);
    const removeCourse = (id: number) =>
        setCourses(courses.filter((c) => c.id !== id));

    return (
        <CoursesContext.Provider
            value={{ getCourses, getCourseById, addCourse, removeCourse }}
        >
            {children}
        </CoursesContext.Provider>
    );
}

export function useCourses() {
    const context = useContext(CoursesContext);
    if (!context) {
        throw new Error("useCourses must be used within a CoursesProvider");
    }
    return context;
}
