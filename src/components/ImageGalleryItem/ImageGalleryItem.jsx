import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, openModal, largeImageURL, tag }) => {
  return (
    <li className={styles.galleryItem}>
      <img
        onClick={openModal}
        className={styles.img}
        src={webformatURL}
        alt={tag}
        title={largeImageURL}
      />
    </li>
  );
};

export default ImageGalleryItem;
