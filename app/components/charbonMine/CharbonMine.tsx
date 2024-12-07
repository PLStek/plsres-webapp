"use client";

import { useCharbonMonthKeysQuery } from "@app/hooks/useCharbons";
import CharbonList from "./CharbonList";

const CharbonMine = () => {
    const [charbonMonthKeys] = useCharbonMonthKeysQuery();

    const getMonthFromKey = (key: string) => {
        const [year, month] = key.split("-");
        const formattedDate = new Date(
            Number(year),
            Number(month) - 1
        ).toLocaleString("fr-FR", {
            month: "long",
            year: "numeric",
        });
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    return (
        <div className="relative rounded-2xl shadow-sm p-8 overflow-hidden bg-[#f9f9f9] w-full lg:flex-grow">
            <h2 className="text-4xl flex justify-center font-bold text-gray-800 mt-4 mb-24">
                La mine de charbon
            </h2>
            <div className="flex justify-center">
                <div className="relative md:border-l-4 md:border-gray-200 md:ms-16 w-full md:w-[80%] lg:w-[75%] xl:w-[80%] 3xl:w-[75%]">
                    {charbonMonthKeys.map((key) => (
                        <div key={key}>
                            <div className="absolute w-4 h-4 bg-gray-200 rounded-full md:-left-2.5 hidden md:block" />
                            <div className="mx-4 md:mx-16">
                                <div className="ms-8 mb-2 text-3xl font-semibold text-gray-800 -translate-y-3">
                                    {getMonthFromKey(key)}
                                </div>
                                <div className="mb-12">
                                    <CharbonList monthKey={key} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CharbonMine;
