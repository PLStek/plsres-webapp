import {
    useCoursesQuery,
    useUpdateCourseMutation,
} from "@app/hooks/useCourses";
import {
    Switch,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import Icon from "../components/Icon";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEditCourseModal } from "../modals/editCourseModal/EditCourseModal";

const CoursesSection = () => {
    const [courses] = useCoursesQuery();
    const [updateCourse] = useUpdateCourseMutation();

    const { onOpen } = useEditCourseModal();

    /* const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(courses.length / rowsPerPage);

    const rows = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return courses.slice(start, end);
    }, [page, courses]); */

    return (
        <Table
            shadow="none"
            className="rounded-lg border border-b-gray-200"
            removeWrapper
            onRowAction={() => {}}
            /*  bottomContent={
                        <div className="flex w-full justify-center mb-2">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="default"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    } */
        >
            <TableHeader>
                <TableColumn>Code</TableColumn>
                <TableColumn>Titre</TableColumn>
                <TableColumn>Catégorie</TableColumn>
                <TableColumn>Active</TableColumn>
                <TableColumn>
                    <div className="flex gap-2">
                        <Icon onClick={() => {}}>
                            <PlusIcon />
                        </Icon>
                    </div>
                </TableColumn>
            </TableHeader>
            <TableBody>
                {courses.map((course) => (
                    <TableRow key={course.id}>
                        <TableCell>{course.code}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>
                            <Switch
                                size="sm"
                                isSelected={course.isActive}
                                onValueChange={(isActive) =>
                                    updateCourse(course.id, { isActive })
                                }
                            ></Switch>
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Icon
                                    onClick={() => {
                                        onOpen(course.id);
                                    }}
                                >
                                    <Cog6ToothIcon />
                                </Icon>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CoursesSection;
