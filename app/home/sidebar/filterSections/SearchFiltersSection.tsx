import { useCharbonFilters } from "@app/hooks/useCharbons";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export const SearchFiltersSection = () => {
    const [filters, setFilters] = useCharbonFilters();

    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        //TODO: Attendre 1 seconde sans saisie pour mettre à jour les filtres
        setFilters({
            ...filters,
            search,
        });
    }, [search, setFilters]);

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-full pl-4 py-2 mr-4 border border-gray-300 rounded-full bg-[#FAFAFA] shadow-sm text-sm"
                    placeholder="Rechercher un charbon"
                />
                <MagnifyingGlassIcon className="-translate-x-12 text-gray-400 h-4 w-4" />
                <button type="button" onClick={() => setSearch("")}>
                    <ArrowPathIcon className="text-gray-700 h-4 w-4" />
                </button>
            </div>
        </div>
    );
};
