import Icon from "@app/home/components/Icon";
import { useCharbonFilters } from "@app/hooks/useCharbons";
import {
    ArrowPathIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@heroui/react";
import { useEffect, useState } from "react";

export const SearchFiltersSection = () => {
    const { setFilters } = useCharbonFilters();

    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        //TODO: Attendre 1 seconde sans saisie pour mettre à jour les filtres
        setFilters((prev) => ({
            ...prev,
            search,
        }));
    }, [search, setFilters]);

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center gap-4">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher un charbon"
                    startContent={
                        <MagnifyingGlassIcon className=" text-gray-400 h-5 w-5" />
                    }
                />
                <div className="flex items-center">
                    <Icon onClick={() => setSearch("")}>
                        <ArrowPathIcon />
                    </Icon>
                </div>
            </div>
        </div>
    );
};
