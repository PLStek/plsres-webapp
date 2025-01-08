"use client";

import React from "react";
import Filters from "./CharbonFiltersSection";
import { Card } from "@nextui-org/react";

const Sidebar = () => {
    return (
        <Card className="p-8 max-w-sm bg-[#fbfbfb]" shadow="sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Filtres
            </h3>
            <Filters />
        </Card>
    );
};

export default Sidebar;
