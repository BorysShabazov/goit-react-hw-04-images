import { createContext } from 'react';
import { useState } from 'react';

export const Context = createContext();

export const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function GlobalContext({ children }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [modal, setModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [total, setTotal] = useState(0);

  function closeModal(e) {
    if (e.currentTarget === e.target) {
      setModal(false);
    }
  }

  async function onSubmit(evt) {
    evt.preventDefault();

    setImages([]);
    setPage(1);
    setStatus(STATUS.PENDING);

    if (!evt.target.elements.search.value) {
      setStatus(STATUS.REJECTED);
    }

    await setQuery(evt.target.elements.search.value);

    evt.target.elements.search.value = '';
  }

  function loadMore() {
    setStatus(STATUS.PENDING);

    setPage(prevState => {
      return prevState + 1;
    });
  }

  function closeModalEsc(e) {
    if (e.code === 'Escape') {
      return setModal(false);
    }
  }

  return (
    <Context.Provider
      value={{
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
        closeModal,
        onSubmit,
        loadMore,
        closeModalEsc,
      }}
    >
      {children}
    </Context.Provider>
  );
}
