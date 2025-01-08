import { useCharbonFilters } from "@app/hooks/useCharbons";
import {
    ArrowPathIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@nextui-org/react";
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
            <div className="flex justify-between items-center gap-4">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher un charbon"
                    startContent={
                        <MagnifyingGlassIcon className=" text-gray-400 h-4 w-4" />
                    }
                />
                <button type="button" onClick={() => setSearch("")}>
                    <ArrowPathIcon className="text-gray-700 h-4 w-4" />
                </button>
            </div>
        </div>
    );
};
