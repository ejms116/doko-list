import axios from 'axios';

// TODO DELETE
// refreshAuthToken wird wohl noch benutzt

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/authenticate`, { email, password });
  return response; // Contains auth_token and refresh_token
};

export const refreshAuthToken = async (refreshToken: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, { refreshToken });
  return response.data.access_token;
};

// const api = axios.create({
//   baseURL: 'https://your-api-url.com',
//   withCredentials: true, // Include cookies with requests
// });

// // Interceptor to attach auth_token
// api.interceptors.request.use((config) => {
//   const authToken = getAuthToken(); // Retrieve from memory
//   if (authToken) {
//     config.headers['Authorization'] = `Bearer ${authToken}`;
//   }
//   return config;
// });

// // Interceptor to refresh token
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         // Attempt to refresh token
//         const { data } = await api.post('/refresh-token');
//         setAuthToken(data.auth_token); // Store new auth_token in memory
//         error.config.headers['Authorization'] = `Bearer ${data.auth_token}`;
//         return api.request(error.config); // Retry original request
//       } catch (refreshError) {
//         clearAuthData(); // Handle logout
//         throw refreshError;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Utility to login
// export const login = async (email, password) => {
//   const { data } = await api.post('/login', { email, password });
//   setAuthToken(data.auth_token); // Store in memory
// };

// // Utility to logout
// export const logout = () => {
//   clearAuthData(); // Clear in-memory token and remove cookies
// };

