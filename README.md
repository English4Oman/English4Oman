# English4Oman

English4Oman is a full-stack application designed to help Omani learners master English through interactive, AI-powered tools.

## Features

- **AI-Generated Content**: Practice with sentences tailored to your learning level using OpenAI's GPT-4
- **Text-to-Speech**: Improve pronunciation with audio guidance via Google Text-to-Speech API
- **Visual Learning**: Enhance understanding with AI-generated images using DALL-E
- **Interactive Quizzes**: Test knowledge and track progress
- **Community Forum**: Connect with other learners and share experiences

## Project Structure

```
English4Oman/
├── backend/
│   ├── .env                 # Environment variables and API keys
│   ├── server.js            # Express server with API endpoints
│   ├── package.json         # Backend dependencies
│   └── node_modules/        # Installed packages
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── pages/           # React page components
│   │   │   ├── Home.js      # Landing page
│   │   │   ├── Dashboard.js # User dashboard
│   │   │   ├── Quizzes.js   # Quiz interface
│   │   │   ├── Progress.js  # Progress tracking
│   │   │   └── Forum.js     # Community forum
│   │   ├── services/        # API service integration
│   │   │   └── apiService.js # Backend API connection
│   │   ├── App.js           # Main app with routing
│   │   ├── index.js         # Entry point
│   │   └── ...
│   ├── package.json         # Frontend dependencies
│   └── node_modules/        # Installed packages
├── .gitignore               # Git ignore configuration
└── README.md                # This documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd English4Oman/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure API keys:
   - Rename `.env.example` to `.env` (if not already done)
   - Add your API keys to the `.env` file:
     ```
     OPENAI_API_KEY=your-openai-api-key
     GOOGLE_TTS_API_KEY=your-google-tts-api-key
     DALLE_API_KEY=your-dalle-api-key
     ANIMAKER_API_KEY=your-animaker-api-key
     ```

4. Start the backend server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd English4Oman/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## API Endpoints

The backend provides the following API endpoints:

### GET /
- **Description**: Check if the API is running
- **Response**: Text message "English4Oman API is running"

### POST /generate-sentence
- **Description**: Generate an English sentence using GPT-4
- **Request Body**:
  ```json
  {
    "prompt": "Generate a simple greeting",
    "level": "beginner" // optional
  }
  ```
- **Response**:
  ```json
  {
    "sentence": "Hello, how are you today?",
    "usage": {
      "prompt_tokens": 10,
      "completion_tokens": 20,
      "total_tokens": 30
    }
  }
  ```

### POST /text-to-speech
- **Description**: Convert text to speech using Google TTS API
- **Request Body**:
  ```json
  {
    "text": "Hello, how are you today?",
    "voice": "en-US" // optional
  }
  ```
- **Response**:
  ```json
  {
    "audioContent": "Base64 encoded audio content",
    "message": "Text-to-speech conversion successful"
  }
  ```

### POST /generate-image
- **Description**: Generate an image using DALL-E
- **Request Body**:
  ```json
  {
    "prompt": "A cartoon character learning English"
  }
  ```
- **Response**:
  ```json
  {
    "imageUrl": "https://example.com/generated-image.png",
    "message": "Image generation successful"
  }
  ```

### POST /generate-animation
- **Description**: Generate an animation (placeholder implementation)
- **Request Body**:
  ```json
  {
    "prompt": "A character waving hello",
    "duration": 5 // optional, in seconds
  }
  ```
- **Response**:
  ```json
  {
    "animationUrl": "https://example.com/animation.mp4",
    "duration": 5,
    "message": "Animation generation successful"
  }
  ```

## Obtaining API Keys

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to the API keys section
4. Create a new API key
5. Copy the key and add it to your `.env` file

### Google Text-to-Speech API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Text-to-Speech API
4. Create credentials (API key)
5. Copy the key and add it to your `.env` file

### DALL-E API Key
This uses the same OpenAI API key as GPT-4.

### Animaker API Key
For the demo version, this is a placeholder and not required for basic functionality.

## Development Notes

- The application includes fallback mechanisms when API keys are not available, providing simulated responses for demonstration purposes.
- All files are saved with UTF-8 encoding to avoid character encoding issues.
- The frontend is built with React and uses React Router for navigation.
- The backend is built with Express and provides RESTful API endpoints.

## License

This project is for educational purposes only.
