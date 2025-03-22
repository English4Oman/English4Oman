const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend to access the API
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Initialize OpenAI client with a conditional check
const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key' 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Routes
app.get('/', (req, res) => {
  res.send('English4Oman API is running');
});

// Generate sentence using GPT-4
app.post('/generate-sentence', async (req, res) => {
  try {
    const { prompt, level } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Check if OpenAI API key is configured
    if (!openai) {
      // Return mock data for demonstration purposes
      return res.json({ 
        sentence: `This is a simulated response for "${prompt}" at ${level || 'any'} level. In production, this would use the actual OpenAI API.`,
        usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 }
      });
    }
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an English language tutor. Generate an English sentence ${level ? `at ${level} level` : ''} based on the following prompt.`
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });
    
    res.json({ 
      sentence: completion.choices[0].message.content,
      usage: completion.usage
    });
  } catch (error) {
    console.error('Error generating sentence:', error);
    res.status(500).json({ error: 'Failed to generate sentence', details: error.message });
  }
});

// Text-to-Speech using Google TTS API
app.post('/text-to-speech', async (req, res) => {
  try {
    const { text, voice } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    // This is a placeholder for actual Google TTS API implementation
    // In a real implementation, you would use the Google Cloud Text-to-Speech client library
    const response = {
      audioContent: "Base64 encoded audio would be here in a real implementation"
    };
    
    res.json({ 
      audioContent: response.audioContent,
      message: "Text-to-speech conversion successful (simulated)"
    });
  } catch (error) {
    console.error('Error converting text to speech:', error);
    res.status(500).json({ error: 'Failed to convert text to speech', details: error.message });
  }
});

// Generate image using DALL-E
app.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Check if OpenAI API key is configured
    if (!openai) {
      // Return mock data for demonstration purposes
      return res.json({ 
        imageUrl: "https://placehold.co/1024x1024/EEE/31343C?text=AI+Generated+Image",
        message: "Image generation successful (simulated)"
      });
    }
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    
    res.json({ 
      imageUrl: response.data[0].url,
      message: "Image generation successful"
    });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image', details: error.message });
  }
});

// Generate animation (placeholder implementation)
app.post('/generate-animation', async (req, res) => {
  try {
    const { prompt, duration } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // This is a placeholder for actual animation API implementation
    // In a real implementation, you would integrate with Animaker or similar service
    const response = {
      animationUrl: "https://example.com/animation.mp4",
      duration: duration || 5
    };
    
    res.json({ 
      animationUrl: response.animationUrl,
      duration: response.duration,
      message: "Animation generation successful (simulated)"
    });
  } catch (error) {
    console.error('Error generating animation:', error);
    res.status(500).json({ error: 'Failed to generate animation', details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
