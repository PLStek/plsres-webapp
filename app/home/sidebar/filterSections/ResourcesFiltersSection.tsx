import { useCharbonFilters } from "@app/hooks/useCharbons";
import { Checkbox } from "@nextui-org/react";

export const ResourcesFiltersSection = () => {
    const [filters, setFilters] = useCharbonFilters();

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Ressources
            </label>
            <div className="mt-2 space-y-2">
                <Checkbox
                    isSelected={filters.hasReplay}
                    onValueChange={(value) =>
                        setFilters({ ...filters, hasReplay: value })
                    }
                >
                    Rediffusion disponible
                </Checkbox>
                <Checkbox
                    isSelected={filters.hasResources}
                    onValueChange={(value) =>
                        setFilters({ ...filters, hasResources: value })
                    }
                >
                    Ressources disponibles
                </Checkbox>
            </div>
        </div>
    );
};
