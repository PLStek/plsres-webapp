"use client";

import React, { useEffect, useState } from "react";
import {
    ArrowPathIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useCharbonFilters } from "@app/hooks/useCharbons";

const Filters = () => {
    // États locaux pour les filtres
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("Elec");
    const [uv, setUv] = useState<string>("PM1");
    const [level, setLevel] = useState<string>("TC02");
    const [semester, setSemester] = useState<string>("P2024");
    const [month, setMonth] = useState<string>("Mai");
    const [replayAvailable, setReplayAvailable] = useState<boolean>(false);
    const [documentsAvailable, setDocumentsAvailable] =
        useState<boolean>(false);
    const [charcoalType, setCharcoalType] = useState<string>("Final");
    const [actor, setActor] = useState<string>("William");

    const [filters, setFilters] = useCharbonFilters();

    useEffect(() => {
        //Attendre 1 seconde sans saisie pour mettre à jour les filtres
        setFilters({
            ...filters,
            search,
        });
    }, [search, setFilters]);

    return (
        <div className=" w-full max-w-sm ">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Filtres
            </h3>

            {/* Recherche */}
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

            {/* Filtres d'UV */}
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                        Filtres d'UV
                    </label>
                    <button
                        type="button"
                        onClick={() => {
                            setCategory("Elec");
                            setUv("PM1");
                            setLevel("TC02");
                        }}
                    >
                        <ArrowPathIcon className="text-gray-700 h-4 w-4" />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border-gray-300 rounded-md"
                    >
                        <option value="Elec">Elec</option>
                        <option value="Info">Info</option>
                        <option value="Meca">Meca</option>
                        <option value="Math">Math</option>
                    </select>
                    <select
                        value={uv}
                        onChange={(e) => setUv(e.target.value)}
                        className="border-gray-300 rounded-md"
                    >
                        <option value="PM1">PM1</option>
                        <option value="PM2">PM2</option>
                        <option value="PM3">PM3</option>
                    </select>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="col-span-2 border-gray-300 rounded-md"
                    >
                        <option value="TC01">TC01</option>
                        <option value="TC02">TC02</option>
                        <option value="BR01">BR01</option>
                    </select>
                </div>
            </div>

            {/* Période */}
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                        Période
                    </label>
                    <button
                        type="button"
                        onClick={() => {
                            setSemester("P2024");
                            setMonth("Mai");
                        }}
                    >
                        <ArrowPathIcon className="text-gray-700 h-4 w-4" />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <select
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="border-gray-300 rounded-md"
                    >
                        <option value="P2024">P2024</option>
                        <option value="A2024">A2024</option>
                    </select>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border-gray-300 rounded-md"
                    >
                        <option value="Mai">Mai</option>
                        <option value="Juin">Juin</option>
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Ressources
                </label>
                <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={replayAvailable}
                            onChange={(e) =>
                                setReplayAvailable(e.target.checked)
                            }
                            className="mr-2"
                        />
                        Rediffusion disponible
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={documentsAvailable}
                            onChange={(e) =>
                                setDocumentsAvailable(e.target.checked)
                            }
                            className="mr-2"
                        />
                        Documents disponibles
                    </label>
                </div>
            </div>

            {/* Charbon */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                    Charbon
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <select
                        value={charcoalType}
                        onChange={(e) => setCharcoalType(e.target.value)}
                        className="border-gray-300 rounded-md"
                    >
                        <option value="Final">Final</option>
                        <option value="Median">Median</option>
                    </select>
                    <select
                        value={actor}
                        onChange={(e) => setActor(e.target.value)}
                        className="border-gray-300 rounded-md"
                    >
                        <option value="William">William</option>
                        <option value="Alex">Alex</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filters;
