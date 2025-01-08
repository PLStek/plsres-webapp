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
        </div>
    );
};

export default Filters;
