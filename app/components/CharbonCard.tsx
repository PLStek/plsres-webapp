import type { Charbon } from "@/lib/models/charbon";
import { useCourses } from "../context/CoursesContext";

const CharbonCard = ({ charbon }: { charbon: Charbon }) => {
    /* const { getCourseById } = useCourses();
    const course = getCourseById(charbon.courseId); */

    return (
        <div>
            {charbon.name}
            <br />
            {charbon.description}
            <br />
            {/* {course?.category} */}
        </div>
    );
};

export default CharbonCard;
