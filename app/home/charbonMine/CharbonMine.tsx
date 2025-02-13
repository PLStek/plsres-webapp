"use client";

import { useCharbonMonthKeysQuery } from "@app/hooks/useCharbons";
import Filters from "../sidebar/CharbonFiltersSection";
import { lazy, memo } from "react";
import { Card } from "@heroui/react";

const styles = {
    container:
        "relative rounded-t-2xl shadow-sm pt-8 overflow-hidden bg-[#FBFBFB] w-full lg:flex-grow pb-100",
    title: "text-4xl flex justify-center font-bold text-gray-800 mt-4",
    filterContainer: "xl:hidden flex justify-center mt-20 w-full px-12",
    filterWrapper: "w-full md:w-[80%]",
    timelineContainer: "flex justify-center mt-20",
    timelineWrapper:
        "relative space-y-12 md:border-l-4 md:border-gray-200 md:ms-16 w-full md:w-[80%] lg:w-[75%] xl:w-[80%] 3xl:w-[75%]",
    timelineDot:
        "absolute w-4 h-4 bg-gray-200 rounded-full md:-left-2.5 hidden md:block",
    monthWrapper: "mx-4 md:mx-16",
    monthTitle: "ms-8 mb-2 text-3xl font-semibold text-gray-800 -translate-y-3",
    dashedLine:
        "relative space-y-12 h-12 md:border-l-4 border-dashed md:border-gray-200 md:ms-16 w-full md:w-[80%] lg:w-[75%] xl:w-[80%] 3xl:w-[75%]",
};

const CharbonList = lazy(() => import("./CharbonList"));

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
        <Card className="pt-8 pb-100 bg-[#fbfbfb] w-full lg:flex-grow" shadow="sm">
            <h2 className={styles.title}>La mine de charbon</h2>
            <div className={styles.filterContainer}>
                <div className={styles.filterWrapper}>
                    <Filters />
                </div>
            </div>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineWrapper}>
                    {charbonMonthKeys.map((key) => (
                        <div key={key}>
                            <div className={styles.timelineDot} />
                            <div className={styles.monthWrapper}>
                                <div className={styles.monthTitle}>
                                    {getMonthFromKey(key)}
                                </div>
                                <div>
                                    <CharbonList monthKey={key} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mb-12 ">
                <div className={styles.dashedLine} />
            </div>
        </Card>
    );
};

export default memo(CharbonMine);
