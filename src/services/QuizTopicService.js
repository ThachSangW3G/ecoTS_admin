import axios from 'axios';

const API_URL = 'https://ecotsbe-production.up.railway.app/api/quiz-topics';

export const getAllQuizTopics = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz topics:', error);
        return [];
    }
};

export const addNewQuizTopic = async (topicName, description, file) => {
    try {
        const formData = new FormData();
        formData.append('multipartFile', file.originFileObj);

        const response = await axios.post(`${API_URL}/add-new`, formData, {
            params: {
                topicName,
                description
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                // Add authorization header if needed
                // 'Authorization': 'Bearer your_api_key_or_token'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding new quiz topic:', error);
        return false;
    }
};

export const updateQuizTopic = async (id, topicName, description, file) => {
    try {
        const formData = new FormData();
        formData.append('multipartFile', file.originFileObj);
        formData.append('topicName', topicName);
        formData.append('description', description);

        const response = await axios.put(`${API_URL}/update`, formData, {
            params: { id },
            headers: {
                'Content-Type': 'multipart/form-data',
                // Add authorization header if needed
                // 'Authorization': 'Bearer your_api_key_or_token'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating quiz topic:', error);
        return false;
    }
};

export const deleteQuizTopic = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete`, {
            params: { id },
            headers: {
                // Add authorization header if needed
                // 'Authorization': 'Bearer your_api_key_or_token'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting quiz topic:', error);
        return false;
    }
};
