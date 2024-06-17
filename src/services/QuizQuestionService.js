import axios from 'axios';

const API_URL = 'https://ecotsbe-production.up.railway.app/api/quiz-questions';

export const getAllQuizQuestions = async (topicId) => {
    try {
        const response = await axios.get(`${API_URL}/get-all-question-by-topic`, {
            params: { id: topicId },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        return [];
    }
};

export const addNewQuizQuestion = async (topicId, questionText, correctAnswer, incorrectAnswer1, incorrectAnswer2) => {
    try {
        const response = await axios.post(`${API_URL}/add-new-question-to-topic`, {
            questionText,
            correctAnswer,
            incorrectAnswer1,
            incorrectAnswer2,
        }, {
            params: { topicId }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding new quiz question:', error);
        return false;
    }
};

export const updateQuizQuestion = async (id, questionText, correctAnswer, incorrectAnswer1, incorrectAnswer2) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, {
            questionText,
            correctAnswer,
            incorrectAnswer1,
            incorrectAnswer2,
        }, {
            headers: {
                'Content-Type': 'application/json',
                // Add authorization header if needed
                // 'Authorization': 'Bearer your_api_key_or_token'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating quiz question:', error);
        return false;
    }
};

export const deleteQuizQuestion = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting quiz question:', error);
        return false;
    }
};
