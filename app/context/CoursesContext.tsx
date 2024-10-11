"use client";

import { Course } from "@/lib/models/course";
import { createContext, ReactNode, useContext, useState } from "react";

type CoursesContextType = {
    getCourses: () => Course[];
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
    const addCourse = (newCourse: Course) =>
        setCourses([...courses, newCourse]);
    const removeCourse = (id: number) =>
        setCourses(courses.filter((c) => c.id !== id));

    return (
        <CoursesContext.Provider
            value={{ getCourses, addCourse, removeCourse }}
        >
            {children}
        </CoursesContext.Provider>
    );
}

export function useCoursesContext() {
    const context = useContext(CoursesContext);
    if (context === undefined) {
        throw new Error("useCourses must be used within a CoursesProvider");
    }
    return context;
}
