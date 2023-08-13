import styles from './LoadMore.module.css';

const LoadMore = ({ loadMore }) => (
  <button className={styles.button} onClick={loadMore}>
    Load more
  </button>
);

export default LoadMore;
