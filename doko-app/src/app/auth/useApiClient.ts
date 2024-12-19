import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const useApiClient = () => {
  const { authToken } = useContext(AuthContext);

  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  // Add interceptors to attach headers
  apiClient.interceptors.request.use((config) => {
    // Add Authorization header
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    
    // Disable caching by adding 'no-store' to the headers
    //config.headers['Cache-Control'] = 'no-store';

    return config;
  });

  return apiClient;
};

export default useApiClient;
