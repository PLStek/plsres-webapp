import Filters from './CharbonFilters';
import CharbonForm from './charbonForm/CharbonForm';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return <div className={styles.wrapper}>
        <Filters />
    </div>;
};

export default Sidebar;
    