import React, { useState } from 'react';
import apiService from '../services/apiService';

function Quizzes() {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: 'Basic Grammar Quiz',
      level: 'Beginner',
      questions: 10,
      timeEstimate: '15 minutes',
      category: 'Grammar'
    },
    {
      id: 2,
      title: 'Intermediate Vocabulary',
      level: 'Intermediate',
      questions: 15,
      timeEstimate: '20 minutes',
      category: 'Vocabulary'
    },
    {
      id: 3,
      title: 'Advanced Conversation',
      level: 'Advanced',
      questions: 12,
      timeEstimate: '25 minutes',
      category: 'Conversation'
    }
  ]);
  
  const [generatedImage, setGeneratedImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState('');

  const startQuiz = (quizId) => {
    const selectedQuiz = quizzes.find(quiz => quiz.id === quizId);
    setCurrentQuiz(selectedQuiz);
  };

  const closeQuiz = () => {
    setCurrentQuiz(null);
  };
  
  const generateQuizImage = async (topic) => {
    setImageLoading(true);
    setImageError('');
    try {
      const result = await apiService.generateImage(`A simple illustration about ${topic} for English language learning`);
      setGeneratedImage(result.imageUrl);
    } catch (err) {
      setImageError('Failed to generate image. Please try again later.');
      console.error(err);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="quizzes-page">
      <h2>Quizzes</h2>
      
      {currentQuiz ? (
        <div className="quiz-container">
          <div className="quiz-header">
            <h3>{currentQuiz.title}</h3>
            <p>Level: {currentQuiz.level}</p>
            <p>Questions: {currentQuiz.questions}</p>
          </div>
          
          <div className="quiz-content">
            <p>This is a placeholder for the actual quiz content.</p>
            <p>In a real implementation, this would contain the quiz questions and answer options.</p>
            
            <div className="quiz-image-section">
              <h4>Visual Aid</h4>
              <button 
                onClick={() => generateQuizImage(currentQuiz.title)} 
                disabled={imageLoading}
              >
                {imageLoading ? 'Generating Image...' : 'Generate Visual Aid'}
              </button>
              
              {generatedImage && (
                <div className="generated-image">
                  <img src={generatedImage} alt={`Visual aid for ${currentQuiz.title}`} />
                </div>
              )}
              
              {imageError && <p className="error-message">{imageError}</p>}
            </div>
          </div>
          
          <button onClick={closeQuiz} className="close-quiz-btn">Exit Quiz</button>
        </div>
      ) : (
        <div className="quiz-list">
          <div className="filters">
            <h4>Filter Quizzes</h4>
            <div className="filter-options">
              <select defaultValue="">
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              
              <select defaultValue="">
                <option value="">All Categories</option>
                <option value="grammar">Grammar</option>
                <option value="vocabulary">Vocabulary</option>
                <option value="conversation">Conversation</option>
                <option value="reading">Reading</option>
                <option value="listening">Listening</option>
              </select>
            </div>
          </div>
          
          <div className="quiz-cards">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="quiz-card">
                <h4>{quiz.title}</h4>
                <p>Level: {quiz.level}</p>
                <p>Questions: {quiz.questions}</p>
                <p>Time: {quiz.timeEstimate}</p>
                <p>Category: {quiz.category}</p>
                <button onClick={() => startQuiz(quiz.id)}>Start Quiz</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quizzes;
