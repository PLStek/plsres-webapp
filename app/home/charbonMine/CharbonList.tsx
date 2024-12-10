"use client";

import { useCharbonsByMonthQuery } from "@app/hooks/useCharbons";
import CharbonCard from "./CharbonCard";

const CharbonList = ({ monthKey }: { monthKey: string }) => {
    const [charbons] = useCharbonsByMonthQuery(monthKey);

    const lastIndex = charbons.length - 1;

    return (
        <div className="flex flex-col">
            {charbons.map((charbon, index) => (
                <div key={index}>
                    <CharbonCard
                        charbon={charbon}
                        isFirst={index === 0}
                        isLast={index === lastIndex}
                    />
                </div>
            ))}
        </div>
    );
};

export default CharbonList;
