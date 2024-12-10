"use client";

import React from "react";
import { CourseFiltersSection } from "./filterSections/CourseFiltersSection";
import { PeriodFiltersSection } from "./filterSections/PeriodFiltersSection";
import { SearchFiltersSection } from "./filterSections/SearchFiltersSection";
import { ResourcesFiltersSection } from "./filterSections/ResourcesFiltersSection";

const Filters = () => {
    return (
        <div>
            <SearchFiltersSection />
            <CourseFiltersSection />
            <PeriodFiltersSection />
            <ResourcesFiltersSection />

            {/* <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                    Charbon
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <select
                        value={charbon}
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
            </div> */}
        </div>
    );
};

export default Filters;
