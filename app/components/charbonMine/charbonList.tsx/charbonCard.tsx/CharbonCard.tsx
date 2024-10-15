import type { Charbon } from "@lib/models/charbon";
import { useGetCourseById } from "@app/hooks/useCourses";
import styles from "./CharbonCard.module.css";

const CharbonCard = ({ charbon }: { charbon: Charbon }) => {
    const getCourseById = useGetCourseById();
    const course = getCourseById(charbon.courseId);

    return (
        <div className={styles.wrapper}>
            {charbon.name}
            <br />
            {charbon.description}
            <br />
            {course?.category}
        </div>
    );
};

export default CharbonCard;
