import type { Charbon } from "@lib/models/charbon";
import { useGetCourseById } from "../hooks/useCourses";

const CharbonCard = ({ charbon }: { charbon: Charbon }) => {
    const getCourseById = useGetCourseById();
    const course = getCourseById(charbon.courseId);

    return (
        <div>
            {charbon.name}
            <br />
            {charbon.description}
            <br />
            {course?.category}
        </div>
    );
};

export default CharbonCard;
