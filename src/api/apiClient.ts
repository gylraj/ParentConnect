import axios from 'axios';

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Set your base URL
  timeout: 5000, // Set a timeout (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (e.g., for adding authorization headers)
apiClient.interceptors.request.use(
  config => {
    // You can add authentication headers here if needed
    // Example: config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('API error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made, but no response received
      console.error('No response received from API:', error.request);
    } else {
      // Something else happened
      console.error('API error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
