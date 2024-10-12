import { useGetCourses } from "../hooks/useCourses";

const CourseSelect = () => {
    const getCourses = useGetCourses();

    const courses = getCourses();

    return (
        <select name="courseId">
            {courses.map((course) => (
                <option key={course.id} value={course.id}>
                    {course.code}
                </option>
            ))}
        </select>
    );
};

export default CourseSelect;
