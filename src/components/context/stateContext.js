import { createContext } from 'react';
import { useState, useEffect, useContext, useReducer } from 'react';

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
      }}
    >
      {children}
    </Context.Provider>
  );
}
