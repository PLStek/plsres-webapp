"use client";

import { Course } from "@lib/models/course";
import { createContext, ReactNode, useContext, useState } from "react";

type CourseContextType = {
    courses: Course[];
    addCourse: (newCourse: Course) => void;
    removeCourse: (id: number) => void;
};

export const CourseContext = createContext<CourseContextType | undefined>(
    undefined
);

const CourseProvider = ({
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
        <CourseContext.Provider value={{ courses, addCourse, removeCourse }}>
            {children}
        </CourseContext.Provider>
    );
};

export default CourseProvider;

export const useCourseContext = () => {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error("useCourses must be used within a CourseProvider");
    }
    return context;
};
