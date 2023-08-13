import styles from './Searchbar.module.css';
import { Context } from '../context/stateContext';
import { useContext } from 'react';

const Searchbar = () => {
  const { onSubmit } = useContext(Context);

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={onSubmit}>
        <button type="submit" className={styles.button}>
          <span className="button-label">Search</span>
        </button>

        <input
          name="search"
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
