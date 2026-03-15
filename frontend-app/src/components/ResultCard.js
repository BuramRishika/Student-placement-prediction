import React, { useState, useEffect } from 'react';
import Confetti from './Confetti';

const isPlaced = (p) => p === 'Placed' || p === 1 || p === '1';

export default function ResultCard({ result }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (result && !result.error && isPlaced(result.prediction)) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4500);
      return () => clearTimeout(t);
    }
  }, [result]);

  if (!result) {
    return (
      <div className="result-card empty fade-up">
        <div className="result-icon">📋</div>
        <h3>Awaiting Prediction</h3>
        <p>Fill in the student profile on the left and click "Predict Placement" to see the result here.</p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="result-card not-placed pop-in">
        <div className="result-icon">⚠️</div>
        <h3>Backend Unreachable</h3>
        <p>Make sure the Flask server is running on port 5000 and try again.</p>
      </div>
    );
  }

  const placed = isPlaced(result.prediction);

  return (
    <>
      {showConfetti && <Confetti />}
      <div className={`result-card ${placed ? 'placed' : 'not-placed'} pop-in`}>
        <div className="result-icon">{placed ? '🎉' : '📚'}</div>
        <h3>{placed ? '🎊 Congratulations! Placed!' : 'Needs More Work'}</h3>
        <p>
          {placed
            ? 'Outstanding profile! This student has a strong chance of getting placed. Best of luck!'
            : 'Not quite there yet — focus on improving CGPA, skills, and gaining more experience.'}
        </p>
        {result.confidence && (
          <div className="confidence">Model Confidence: {(result.confidence * 100).toFixed(1)}%</div>
        )}
        {result.inputs && (
          <div className="input-summary">
            <h4>Submitted Profile</h4>
            <div className="tags">
              <span className="tag">📘 CGPA: {result.inputs.cgpa}</span>
              <span className="tag">💼 Internships: {result.inputs.internships}</span>
              <span className="tag">🛠️ Projects: {result.inputs.projects}</span>
              <span className="tag">🗣️ Comm: {result.inputs.communication}/10</span>
              <span className="tag">💻 Coding: {result.inputs.coding}/10</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
