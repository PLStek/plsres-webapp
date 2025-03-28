import { Select, SelectItem } from "@heroui/react";
import { useCharbonFilters } from "@app/hooks/useCharbons";
import { useCoursesQuery } from "@app/hooks/useCourses";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { CourseCategory } from "@lib/models/course";
import Icon from "@app/home/components/Icon";

export const CourseFiltersSection = () => {
    const { filters, setFilters } = useCharbonFilters();
    const { data: courses } = useCoursesQuery();

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                    Filtres de cours
                </label>
                <Icon
                    onClick={() => {
                        setFilters({
                            ...filters,
                            category: null,
                            courseId: null,
                            /* level: "TC01", */
                        });
                    }}
                >
                    <ArrowPathIcon />
                </Icon>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <Select
                    selectedKeys={filters.category ? [filters.category] : []}
                    onSelectionChange={(value) =>
                        setFilters({
                            ...filters,
                            category: [...value][0] as CourseCategory | null,
                        })
                    } //TODO: make multiple
                    placeholder="Catégorie"
                    size="sm"
                >
                    <SelectItem key="ELEC">Elec</SelectItem>
                    <SelectItem key="INFO">Info</SelectItem>
                    <SelectItem key="MECA">Meca</SelectItem>
                    <SelectItem key="MATH">Math</SelectItem>
                </Select>
                <Select
                    selectedKeys={
                        filters.courseId ? [filters.courseId.toString()] : []
                    }
                    onSelectionChange={(value) => {
                        const courseId = parseInt([...value][0] as string);
                        setFilters({
                            ...filters,
                            courseId: isNaN(courseId) ? null : courseId,
                        });
                    }} //TODO: make multiple
                    placeholder="Cours"
                    size="sm"
                >
                    {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                            {course.code}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
};
