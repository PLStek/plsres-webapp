import { useCoursesQuery } from "@app/hooks/useCourses";

const CourseSelect = () => {
    const [courses] = useCoursesQuery();

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
