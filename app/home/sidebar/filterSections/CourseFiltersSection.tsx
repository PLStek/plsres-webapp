import { Select } from "@app/components/Select";
import { useCharbonFilters } from "@app/hooks/useCharbons";
import { useCoursesQuery } from "@app/hooks/useCourses";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { CourseCategory } from "@lib/models/course";

export const CourseFiltersSection = () => {
    const [filters, setFilters] = useCharbonFilters();
    const [courses] = useCoursesQuery();

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                    Filtres d'UV
                </label>
                <button
                    type="button"
                    onClick={() => {
                        setFilters({
                            ...filters,
                            category: null,
                            courseId: null,
                            /* level: "TC01", */
                        });
                    }}
                >
                    <ArrowPathIcon className="text-gray-700 h-4 w-4" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <Select
                    value={filters.category || ""}
                    onChange={(category) =>
                        setFilters({
                            ...filters,
                            category: category as CourseCategory | null,
                        })
                    }
                    options={[
                        { name: "Elec", value: "ELEC" },
                        { name: "Info", value: "INFO" },
                        { name: "Meca", value: "MECA" },
                        { name: "Math", value: "MATH" },
                    ]}
                    placeholder="Catégorie"
                />
                <Select
                    value={filters.courseId || ""}
                    onChange={(courseId) =>
                        setFilters({
                            ...filters,
                            courseId: courseId ? courseId : null,
                        })
                    }
                    options={courses.map((course) => ({
                        name: course.code,
                        value: course.id,
                    }))}
                    placeholder="UV"
                />
            </div>
        </div>
    );
};
