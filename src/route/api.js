import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:${import.meta.env.VITE_APP_BACKEND_PORT}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
