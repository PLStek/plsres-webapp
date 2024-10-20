import CharbonList from "./charbonList/CharbonList";
import styles from "./CharbonMine.module.css";

const CharbonMine = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className="text-3xl flex justify-center font-bold text-gray-800 mb-4">
                La mine de charbon
            </h2>
            <CharbonList />
        </div>
    );
};

export default CharbonMine;
