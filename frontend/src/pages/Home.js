import React, { useState } from 'react';
import apiService from '../services/apiService';

function Home() {
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const generateExampleSentence = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await apiService.generateSentence('Generate a simple greeting', 'beginner');
      setSentence(result.sentence);
    } catch (err) {
      setError('Failed to generate sentence. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <h2>Welcome to English4Oman</h2>
      <div className="hero-section">
        <p>Your interactive platform for learning English with AI-powered tools.</p>
        <button className="cta-button">Get Started</button>
      </div>
      
      <div className="features-section">
        <h3>Our Features</h3>
        <div className="feature-cards">
          <div className="feature-card">
            <h4>AI-Generated Content</h4>
            <p>Practice with sentences tailored to your learning level.</p>
            <div className="demo-section">
              <button onClick={generateExampleSentence} disabled={loading}>
                {loading ? 'Generating...' : 'Try an Example'}
              </button>
              {sentence && <div className="example-result">{sentence}</div>}
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
          <div className="feature-card">
            <h4>Text-to-Speech</h4>
            <p>Improve your pronunciation with audio guidance.</p>
          </div>
          <div className="feature-card">
            <h4>Visual Learning</h4>
            <p>Enhance understanding with AI-generated images.</p>
          </div>
          <div className="feature-card">
            <h4>Interactive Quizzes</h4>
            <p>Test your knowledge and track your progress.</p>
          </div>
        </div>
      </div>
      
      <div className="about-section">
        <h3>About English4Oman</h3>
        <p>English4Oman is designed to help Omani learners master English through interactive, AI-powered tools. Our platform combines cutting-edge technology with effective learning methodologies to create an engaging educational experience.</p>
      </div>
    </div>
  );
}

export default Home;
