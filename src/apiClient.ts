import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
const storeKey = import.meta.env.VITE_APP_STORE_KEY || '';

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: storeKey ? { 'X-Store-Key': storeKey } : undefined,
});

export default apiClient;
