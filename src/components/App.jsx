import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import api from 'api/api';
import LoadMore from './LoadMore';
import Loader from './Loader';
import Modal from './Modal';
import { useEffect, useContext, useReducer } from 'react';
import { Context } from './/context/stateContext';
import { STATUS } from './/context/stateContext';

const App = () => {
  const {
    images,
    setImages,
    page,
    setPage,
    query,
    setQuery,
    status,
    setStatus,
    modal,
    setModal,
    modalImg,
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

  const onSubmit = async evt => {
    evt.preventDefault();

    setImages([]);
    setPage(1);
    setStatus(STATUS.PENDING);

    if (!evt.target.elements.search.value) {
      setStatus(STATUS.REJECTED);
    }

    await setQuery(evt.target.elements.search.value);

    evt.target.elements.search.value = '';
  };

  const loadMore = () => {
    setStatus(STATUS.PENDING);

    setPage(prevState => {
      return prevState + 1;
    });
  };

  const openModal = e => {
    setModalImg(e.target.title);
    setModal(true);
    window.addEventListener('keydown', closeModalEsc);
  };

  function closeModalEsc(e) {
    if (e.code === 'Escape') {
      setModal(false);
    }
  }

  const closeModal = e => {
    if (e.currentTarget === e.target) {
      setModal(false);
    }
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
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

      {modal && <Modal url={modalImg} closeModal={closeModal} />}
      {status === STATUS.PENDING && <Loader />}
      {images.length > 0 && images.length < total && (
        <LoadMore loadMore={loadMore} />
      )}
    </>
  );
};

export default App;
