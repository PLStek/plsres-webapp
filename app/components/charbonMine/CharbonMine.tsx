import CharbonList from "./charbonList.tsx/CharbonList";
import styles from "./CharbonMine.module.css";

const CharbonMine = () => {
    return (
        <div className={styles.wrapper}>
            <CharbonList />
        </div>
    );
};

export default CharbonMine;
