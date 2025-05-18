import axios from 'axios';

const $axios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

export default $axios;
