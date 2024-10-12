"use client";

import CharbonCard from "./CharbonCard";
import { useGetCharbons } from "../hooks/useCharbons";

const CharbonList = () => {
    const getCharbons = useGetCharbons();
    const charbons = getCharbons();

    return (
        <div>
            {charbons.map((charbon) => (
                <CharbonCard key={charbon.id} charbon={charbon}></CharbonCard>
            ))}
        </div>
    );
};

export default CharbonList;