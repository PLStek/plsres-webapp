import { CourseCategory } from "@lib/models/course";

export const getCourseTypeColor = (category: CourseCategory | undefined) => {
    switch (category) {
        case "MATH":
            return "red";
        case "ELEC":
            return "green";
        case "INFO":
            return "yellow";
        case "MECA":
            return "blue";
        default:
            return "gray";
    }
};
