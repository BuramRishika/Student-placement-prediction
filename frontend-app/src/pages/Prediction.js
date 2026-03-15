import React, { useState } from 'react';
import StudentForm from '../components/StudentForm';
import ResultCard from '../components/ResultCard';

export default function Prediction() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResult = (data) => {
    setResult(data);
    if (!data.error) {
      const history = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
      history.unshift({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem('predictionHistory', JSON.stringify(history.slice(0, 50)));
    }
  };

  return (
    <div className="page">
      <p className="page-title">🔍 Placement Prediction</p>
      <p className="page-subtitle">Enter the student's details below. The ML model will predict placement likelihood instantly.</p>
      <div className="prediction-wrapper">
        <StudentForm onResult={handleResult} onLoading={setLoading} />
        <ResultCard result={loading ? null : result} />
      </div>
    </div>
  );
}
