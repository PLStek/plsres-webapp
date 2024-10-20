"use client";

import CharbonCard from "./charbonCard/CharbonCard";
import { useGetCharbons } from "@app/hooks/useCharbons";

const CharbonList = () => {
    const getCharbons = useGetCharbons();
    const charbons = getCharbons();

    const lastIndex = charbons.length - 1;

    return (
        <div className="flex flex-col w-[80%]">
            {charbons.map((charbon, index) => (
                <div key={index} >
                    <CharbonCard charbon={charbon} isFirst={index === 0} isLast={index === lastIndex} />
                </div>
            ))}
        </div>
    );
};

export default CharbonList;
