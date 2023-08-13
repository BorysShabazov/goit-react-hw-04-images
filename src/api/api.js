import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '37785786-64a8ca81d7f9f5d8dae241bba';

const api = async (query, page) => {
  return await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=3`
  );
};

export default api;
