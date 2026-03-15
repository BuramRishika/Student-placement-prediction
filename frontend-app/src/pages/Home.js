import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '🤖', title: 'ML-Powered', desc: 'Random Forest model trained on real student placement data for accurate predictions.' },
  { icon: '⚡', title: 'Instant Results', desc: 'Submit the form and get a placement prediction in under a second.' },
  { icon: '📊', title: 'Track History', desc: 'Every prediction is saved. View stats and trends on the Dashboard.' },
  { icon: '🎯', title: '5 Key Factors', desc: 'CGPA, internships, projects, communication, and coding skills.' },
];


export default function Home() {
  return (
    <div className="page">
      <div className="hero fade-up">
        <div className="hero-badge">🎓 AI-Powered Placement Prediction</div>
        <h1>Campus Placement Prediction Using Machine Learning</h1>
        <p>Enter a student's academic profile and skill ratings to instantly predict their placement chances using a trained ML model.</p>
        <div className="hero-actions">
          <Link to="/"          className="btn-secondary">🏠 Home</Link>
          <Link to="/predict"   className="btn-primary">🔍 Predict</Link>
          <Link to="/dashboard" className="btn-secondary">📊 Dashboard</Link>
        </div>

        <div className="features">
          {features.map((f, i) => (
            <div className="feature-card" key={f.title} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
