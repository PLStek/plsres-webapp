"use client";

import { useCharbonsByMonthQuery } from "@app/hooks/useCharbons";
import { lazy, memo } from "react";

const styles = {
    container: "flex flex-col",
};

const CharbonCard = lazy(() => import("./charbonCard/CharbonCard"));

const CharbonList = ({ monthKey }: { monthKey: string }) => {
    const [charbons] = useCharbonsByMonthQuery(monthKey);

    const lastIndex = charbons.length - 1;

    return (
        <div className={styles.container}>
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

export default memo(CharbonList);
