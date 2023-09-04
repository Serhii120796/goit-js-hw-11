import axios from 'axios';

const API_KEY = '38986631-ae11b42db00bd05f0f2571500';
const BASE_URL = "https://pixabay.com/api/";

function fetchImages(searchData, page, per_page) {
 
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchData,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page,
    page,
  });

    return axios.get(`${BASE_URL}?${params}`);
  }

export {fetchImages};
