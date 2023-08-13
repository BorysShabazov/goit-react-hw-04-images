import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import api from 'api/api';
import LoadMore from './LoadMore';
import Loader from './Loader';
import Modal from './Modal';
import { useEffect, useContext, useCallback } from 'react';
import { Context } from './context/stateContext';
import { STATUS } from './context/stateContext';

const App = () => {
  const {
    images,
    setImages,
    page,
    query,
    status,
    setStatus,
    modal,
    setModal,
    setModalImg,
    total,
    setTotal,
  } = useContext(Context);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function update() {
      try {
        const { data } = await api(query, page);

        setImages(prevState => {
          return [...prevState, ...data.hits];
        });
        setTotal(data.total);
        setStatus(STATUS.RESOLVED);
      } catch {
        setStatus(STATUS.REJECTED);
      }
    }

    update();
  }, [query, page]);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', closeModalEsc);
    };
  }, []);

  const openModal = e => {
    setModalImg(e.target.title);
    setModal(true);
    window.addEventListener('keydown', closeModalEsc);
  };

  const closeModalEsc = useCallback(e => {
    if (e.code === 'Escape') {
      setModal(false);
    }
  }, []);

  return (
    <>
      <Searchbar />
      {status === STATUS.REJECTED && <p>Fill in the search field...</p>}

      <ImageGallery>
        {images.map(({ id, webformatURL, largeImageURL, tag }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              openModal={openModal}
              tag={tag}
            />
          );
        })}
      </ImageGallery>

      {modal && <Modal />}
      {status === STATUS.PENDING && <Loader />}
      {images.length > 0 && images.length < total && <LoadMore />}
    </>
  );
};

export default App;
