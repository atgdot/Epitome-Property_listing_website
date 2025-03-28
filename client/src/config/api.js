export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  TIMEOUT: 5000,
  HEADERS: {
    'Content-Type': 'application/json',
    // Add any other default headers
  }
}; 