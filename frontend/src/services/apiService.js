import axios from 'axios';

const API_URL = 'http://localhost:5000';

const apiService = {
  // Generate sentence using GPT-4
  generateSentence: async (prompt, level) => {
    try {
      const response = await axios.post(`${API_URL}/generate-sentence`, { prompt, level });
      return response.data;
    } catch (error) {
      console.error('Error generating sentence:', error);
      throw error;
    }
  },

  // Convert text to speech using Google TTS API
  textToSpeech: async (text, voice) => {
    try {
      const response = await axios.post(`${API_URL}/text-to-speech`, { text, voice });
      return response.data;
    } catch (error) {
      console.error('Error converting text to speech:', error);
      throw error;
    }
  },

  // Generate image using DALL-E
  generateImage: async (prompt) => {
    try {
      const response = await axios.post(`${API_URL}/generate-image`, { prompt });
      return response.data;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  },

  // Generate animation (placeholder implementation)
  generateAnimation: async (prompt, duration) => {
    try {
      const response = await axios.post(`${API_URL}/generate-animation`, { prompt, duration });
      return response.data;
    } catch (error) {
      console.error('Error generating animation:', error);
      throw error;
    }
  }
};

export default apiService;
