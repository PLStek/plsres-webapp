import Icon from "@app/home/components/Icon";
import {
    useCharbonFilters,
    useCharbonMonthKeysQuery,
} from "@app/hooks/useCharbons";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Select, SelectItem } from "@heroui/react";

export const PeriodFiltersSection = () => {
    const { data: monthKeys } = useCharbonMonthKeysQuery();
    const { filters, setFilters } = useCharbonFilters();

    const years = Array.from(
        new Set(monthKeys.map((key) => key.substring(0, 4)))
    );

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                    Période
                </label>
                <Icon
                    onClick={() => {
                        setFilters({
                            ...filters,
                            year: "",
                            month: "",
                        });
                    }}
                >
                    <ArrowPathIcon />
                </Icon>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <Select
                    onChange={
                        (e) => setFilters({ ...filters, year: e.target.value }) //TODO: use number ?
                    }
                    placeholder="Année"
                    size="sm"
                    selectionMode="multiple"
                >
                    {years.map((year) => (
                        <SelectItem key={year}>{year}</SelectItem>
                    ))}
                </Select>
                {/* <select
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
                </select> */}
                <Select
                    onChange={(e) =>
                        setFilters({ ...filters, month: e.target.value })
                    }
                    placeholder="Mois"
                    size="sm"
                    selectionMode="multiple"
                >
                    <SelectItem key="01">Janvier</SelectItem>
                    <SelectItem key="02">Février</SelectItem>
                    <SelectItem key="03">Mars</SelectItem>
                    <SelectItem key="04">Avril</SelectItem>
                    <SelectItem key="05">Mai</SelectItem>
                    <SelectItem key="06">Juin</SelectItem>
                    <SelectItem key="07">Juillet</SelectItem>
                    <SelectItem key="08">Août</SelectItem>
                    <SelectItem key="09">Septembre</SelectItem>
                    <SelectItem key="10">Octobre</SelectItem>
                    <SelectItem key="11">Novembre</SelectItem>
                    <SelectItem key="12">Décembre</SelectItem>
                </Select>
            </div>
        </div>
    );
};
