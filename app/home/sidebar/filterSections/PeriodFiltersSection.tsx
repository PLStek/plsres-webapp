import {
    useCharbonFilters,
    useCharbonMonthKeysQuery,
} from "@app/hooks/useCharbons";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export const PeriodFiltersSection = () => {
    const [monthKeys] = useCharbonMonthKeysQuery();
    const [filters, setFilters] = useCharbonFilters();

    const years = Array.from(
        new Set(monthKeys.map((key) => key.substring(0, 4)))
    );

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                    Période
                </label>
                <button
                    type="button"
                    onClick={() => {
                        setFilters({
                            ...filters,
                            year: "",
                            month: "",
                        });
                    }}
                >
                    <ArrowPathIcon className="text-gray-700 h-4 w-4" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <select
                    value={filters.year}
                    onChange={(e) =>
                        setFilters({ ...filters, year: e.target.value })
                    }
                    className="border-gray-300 rounded-md"
                >
                    <option value="">Tous</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <select
                    value={filters.month}
                    onChange={(e) =>
                        setFilters({ ...filters, month: e.target.value })
                    }
                    className="border-gray-300 rounded-md"
                >
                    <option value="01">Janvier</option>
                    <option value="02">Février</option>
                    <option value="03">Mars</option>
                    <option value="04">Avril</option>
                    <option value="05">Mai</option>
                    <option value="06">Juin</option>
                    <option value="07">Juillet</option>
                    <option value="08">Août</option>
                    <option value="09">Septembre</option>
                    <option value="10">Octobre</option>
                    <option value="11">Novembre</option>
                    <option value="12">Décembre</option>
                </select>
            </div>
        </div>
    );
};
