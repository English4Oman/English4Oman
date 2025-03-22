import React, { useState } from 'react';

function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState({
    name: 'User',
    level: 'Intermediate',
    completedLessons: 12,
    totalLessons: 30,
    streak: 5
  });
  
  const [generatedSentence, setGeneratedSentence] = useState('');
  const [audioContent, setAudioContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePracticeContent = async () => {
    setLoading(true);
    setError('');
    try {
      // Generate a practice sentence based on user level
      const sentenceResult = await apiService.generateSentence(
        `Generate a practice sentence about daily activities`, 
        userData.level
      );
      setGeneratedSentence(sentenceResult.sentence);
      
      // Convert the generated sentence to speech
      const speechResult = await apiService.textToSpeech(
        sentenceResult.sentence, 
        'en-US'
      );
      setAudioContent(speechResult.audioContent);
    } catch (err) {
      setError('Failed to generate practice content. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      
      <div className="user-stats">
        <div className="welcome-message">
          <h3>Welcome back, {userData.name}!</h3>
          <p>Current level: {userData.level}</p>
        </div>
        
        <div className="progress-overview">
          <h4>Your Progress</h4>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${(userData.completedLessons / userData.totalLessons) * 100}%`}}
            ></div>
          </div>
          <p>{userData.completedLessons} of {userData.totalLessons} lessons completed</p>
          <p>Current streak: {userData.streak} days</p>
        </div>
      </div>
      
      <div className="practice-section">
        <h4>Daily Practice</h4>
        <button 
          onClick={generatePracticeContent} 
          disabled={loading}
          className="practice-button"
        >
          {loading ? 'Generating...' : 'Generate Practice Content'}
        </button>
        
        {generatedSentence && (
          <div className="practice-content">
            <h5>Practice Sentence:</h5>
            <p className="sentence">{generatedSentence}</p>
            
            {audioContent && (
              <div className="audio-player">
                <p>Audio playback would be available here in a real implementation.</p>
                <button className="play-button">Play Audio</button>
              </div>
            )}
          </div>
        )}
        
        {error && <p className="error-message">{error}</p>}
      </div>
      
      <div className="recent-activities">
        <h4>Recent Activities</h4>
        <ul>
          <li>Completed "Common Phrases" lesson</li>
          <li>Scored 85% on "Past Tense" quiz</li>
          <li>Practiced pronunciation for 15 minutes</li>
        </ul>
      </div>
      
      <div className="recommended-lessons">
        <h4>Recommended Next Steps</h4>
        <div className="lesson-cards">
          <div className="lesson-card">
            <h5>Future Tense</h5>
            <p>Learn how to talk about future events</p>
            <button>Start Lesson</button>
          </div>
          <div className="lesson-card">
            <h5>Common Idioms</h5>
            <p>Master everyday English expressions</p>
            <button>Start Lesson</button>
          </div>
          <div className="lesson-card">
            <h5>Business Vocabulary</h5>
            <p>Essential words for professional settings</p>
            <button>Start Lesson</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
