import React, { useState } from 'react';

function Progress() {
  // eslint-disable-next-line no-unused-vars
  const [progressData, setProgressData] = useState({
    overallProgress: 65,
    weeklyActivity: [3, 5, 2, 4, 7, 1, 3], // Days of the week
    skillLevels: {
      grammar: 70,
      vocabulary: 60,
      pronunciation: 50,
      reading: 75,
      writing: 55,
      listening: 65
    },
    completedLessons: [
      { id: 1, title: 'Basic Greetings', date: '2025-03-15', score: 90 },
      { id: 2, title: 'Present Tense', date: '2025-03-16', score: 85 },
      { id: 3, title: 'Common Phrases', date: '2025-03-18', score: 95 },
      { id: 4, title: 'Question Formation', date: '2025-03-20', score: 80 }
    ]
  });

  return (
    <div className="progress-page">
      <h2>Progress Tracking</h2>
      
      <div className="overall-progress">
        <h3>Overall Progress</h3>
        <div className="progress-circle">
          <div className="progress-value">{progressData.overallProgress}%</div>
        </div>
      </div>
      
      <div className="weekly-activity">
        <h3>Weekly Activity</h3>
        <div className="activity-chart">
          {progressData.weeklyActivity.map((value, index) => (
            <div key={index} className="activity-bar">
              <div 
                className="activity-fill" 
                style={{height: `${value * 10}px`}}
              ></div>
              <div className="day-label">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="skill-levels">
        <h3>Skill Levels</h3>
        <div className="skills-container">
          {Object.entries(progressData.skillLevels).map(([skill, level]) => (
            <div key={skill} className="skill-item">
              <div className="skill-name">{skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
              <div className="skill-bar">
                <div 
                  className="skill-fill" 
                  style={{width: `${level}%`}}
                ></div>
              </div>
              <div className="skill-percentage">{level}%</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="completed-lessons">
        <h3>Completed Lessons</h3>
        <table className="lessons-table">
          <thead>
            <tr>
              <th>Lesson</th>
              <th>Date</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {progressData.completedLessons.map(lesson => (
              <tr key={lesson.id}>
                <td>{lesson.title}</td>
                <td>{lesson.date}</td>
                <td>{lesson.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Progress;
