"use client";

import { useCharbonsQuery } from "@app/hooks/useCharbons";
import CharbonCard from "./charbonCard/CharbonCard";

const CharbonList = () => {
    const [charbons] = useCharbonsQuery();

    const lastIndex = charbons.length - 1;

    return (
        <div className="flex flex-col w-[80%]">
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
