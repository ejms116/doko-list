import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const apiBaseUrl =
    typeof window === "undefined"  // Check if running on the server
        ? process.env.INTERNAL_API_BASE_URL  // Use Docker internal URL for server components
        : process.env.NEXT_PUBLIC_API_BASE_URL;

const useApiClient = () => {
  const { authToken } = useContext(AuthContext);

  const apiClient = axios.create({
    baseURL: apiBaseUrl,
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
