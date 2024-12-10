"use client";

import React from "react";
import Filters from "./CharbonFiltersSection";

const Sidebar = () => {
    return (
        <div className="rounded-2xl shadow-sm p-8 overflow-hidden bg-[#f9f9f9] max-w-sm ">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Filtres
            </h3>
            <Filters />
        </div>
    );
};

export default Sidebar;
