import styles from './Modal.module.css';

const Modal = ({ url, closeModal }) => {
  return (
    <div className={styles.backdrop} onClick={closeModal}>
      <img className={styles.img} src={url} alt="bigImg" />
    </div>
  );
};

export default Modal;
