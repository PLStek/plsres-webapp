"use client";

import CharbonCard from "./CharbonCard";
import { useCharbons } from "../context/CharbonsContext";

export default function CharbonList() {
    const {getCharbons} = useCharbons();
    const charbons = getCharbons();

    if (charbons.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {charbons.map((charbon) => (
                <CharbonCard key={charbon.id} charbon={charbon}></CharbonCard>
            ))}
        </div>
    );
}
