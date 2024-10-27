"use client";

import { Course } from "@lib/models/course";
import { createContext, ReactNode, useState } from "react";

type CoursesContextType = {
    courses: Course[];
    addCourse: (newCourse: Course) => void;
    removeCourse: (id: number) => void;
};

export const CoursesContext = createContext<CoursesContextType | undefined>(
    undefined
);

const CoursesProvider = ({
    initialCourses,
    children,
}: {
    initialCourses?: Course[];
    children: ReactNode;
}) => {
    const [courses, setCourses] = useState(initialCourses ?? []);

    const addCourse = (newCourse: Course) =>
        setCourses([...courses, newCourse]);
    const removeCourse = (id: number) =>
        setCourses(courses.filter((c) => c.id !== id));

    return (
        <CoursesContext.Provider value={{ courses, addCourse, removeCourse }}>
            {children}
        </CoursesContext.Provider>
    );
};

export default CoursesProvider;
