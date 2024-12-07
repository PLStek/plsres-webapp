"use client";

import React, { useState, useEffect } from "react";
import Filters from "./CharbonFilters";

const Sidebar = () => {
    return (
        <div className="rounded-2xl shadow-sm p-8 overflow-hidden bg-[#f9f9f9] ">
            <Filters />
        </div>
    );
};

export default Sidebar;
