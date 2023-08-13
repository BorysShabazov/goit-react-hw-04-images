import styles from './Modal.module.css';
import { Context } from '../context/stateContext';
import { useContext } from 'react';

const Modal = () => {
  const { modalImg, closeModal } = useContext(Context);

  return (
    <div className={styles.backdrop} onClick={closeModal}>
      <img className={styles.img} src={modalImg} alt="bigImg" />
    </div>
  );
};

export default Modal;
