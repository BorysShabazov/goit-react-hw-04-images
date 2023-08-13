import styles from './LoadMore.module.css';
import { Context } from '../context/stateContext';
import { useContext } from 'react';

const LoadMore = () => {
  const { loadMore } = useContext(Context);

  return (
    <button className={styles.button} onClick={loadMore}>
      Load more
    </button>
  );
};

export default LoadMore;
