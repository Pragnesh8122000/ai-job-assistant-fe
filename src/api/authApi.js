import apiClient from './axios';

/**
 * Authentication API Service
 */
export const authApi = {
    /**
     * Login user
     * @param {Object} credentials - { email, password }
     * @returns {Promise} - { user, accessToken }
     */
    login: async (credentials) => {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    },

    /**
     * Logout user
     * @returns {Promise}
     */
    logout: async () => {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    },

    /**
     * Refresh access token
     * @returns {Promise} - { accessToken }
     */
    refreshToken: async () => {
        const response = await apiClient.post('/auth/refresh-token');
        return response.data;
    },

    /**
     * Get current user profile
     * @returns {Promise} - { user }
     */
    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
};
