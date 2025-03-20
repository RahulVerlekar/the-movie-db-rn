// Base URL for API requests
const BASE_URL = 'https://api.example.com';

// Default request headers
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Handle error responses
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  
  return data;
};

// API request functions
export const api = {
  get: async (endpoint, headers = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    });
    return handleResponse(response);
  },
  
  post: async (endpoint, body, headers = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },
  
  put: async (endpoint, body, headers = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },
  
  delete: async (endpoint, headers = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    });
    return handleResponse(response);
  },
};
