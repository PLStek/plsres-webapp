import { useCharbonFilters } from "@app/hooks/useCharbons";

export const ResourcesFiltersSection = () => {
    const [filters, setFilters] = useCharbonFilters();

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Ressources
            </label>
            <div className="mt-2 space-y-2">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={filters.hasReplay}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                hasReplay: e.target.checked,
                            })
                        }
                        className="mr-2"
                    />
                    Rediffusion disponible
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={filters.hasResources}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                hasResources: e.target.checked,
                            })
                        }
                        className="mr-2"
                    />
                    Ressources disponibles
                </label>
            </div>
        </div>
    );
};
