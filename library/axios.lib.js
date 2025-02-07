const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY
const axios = require('axios');
const axiosInstance = axios.create({
    baseURL: process.env.UNSPLASH_BASE_URL,
    headers:{
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}}`
    }
});

module.exports = axiosInstance;