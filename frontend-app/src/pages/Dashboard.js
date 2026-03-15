import React, { useState, useEffect } from 'react';

const isPlaced = (p) => p === 'Placed' || p === 1 || p === '1';

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem('predictionHistory') || '[]'));
  }, []);

  const placedCount = history.filter((h) => isPlaced(h.prediction)).length;
  const notPlacedCount = history.length - placedCount;
  const rate = history.length ? Math.round((placedCount / history.length) * 100) : 0;

  const clearHistory = () => {
    localStorage.removeItem('predictionHistory');
    setHistory([]);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="page">
      <p className="page-title">📊 Dashboard</p>
      <p className="page-subtitle">Overview of all placement predictions made in this session.</p>

      <div className="stats-grid">
        {[
          { value: history.length, label: 'Total Predictions', delay: '0s' },
          { value: placedCount,    label: '✅ Likely Placed',   delay: '0.08s' },
          { value: notPlacedCount, label: '📚 Needs Work',      delay: '0.16s' },
          { value: history.length ? rate + '%' : '—', label: '🎯 Placement Rate', delay: '0.24s' },
        ].map((s) => (
          <div className="stat-card" key={s.label} style={{ animationDelay: s.delay }}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="chart-section">
            <h3>Placement Breakdown</h3>
            <div className="bar-row">
              <span className="bar-label">Placed</span>
              <div className="bar-track">
                <div className="bar-fill placed-bar" style={{ width: `${history.length ? (placedCount / history.length) * 100 : 0}%` }} />
              </div>
              <span className="bar-count">{placedCount}</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Not Placed</span>
              <div className="bar-track">
                <div className="bar-fill not-placed-bar" style={{ width: `${history.length ? (notPlacedCount / history.length) * 100 : 0}%` }} />
              </div>
              <span className="bar-count">{notPlacedCount}</span>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <h2 style={{ margin: 0 }}>Prediction History</h2>
          {history.length > 0 && (
            <button onClick={clearHistory} style={{ background: 'none', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '0.4rem 1rem', cursor: 'pointer', color: '#718096', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'inherit' }}>
              🗑️ Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📭</div>
            <p>No predictions yet. Head to the Predict page to get started.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="history-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>CGPA</th>
                  <th>Internships</th>
                  <th>Projects</th>
                  <th>Communication</th>
                  <th>Coding</th>
                  <th>Result</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i}>
                    <td style={{ color: '#a0aec0', fontWeight: 600 }}>{i + 1}</td>
                    <td>{h.inputs?.cgpa}</td>
                    <td>{h.inputs?.internships}</td>
                    <td>{h.inputs?.projects}</td>
                    <td>{h.inputs?.communication}/10</td>
                    <td>{h.inputs?.coding}/10</td>
                    <td>
                      <span className={`badge ${isPlaced(h.prediction) ? 'placed' : 'not-placed'}`}>
                        {isPlaced(h.prediction) ? '✅ Placed' : '❌ Not Placed'}
                      </span>
                    </td>
                    <td style={{ color: '#a0aec0', fontSize: '0.82rem' }}>{h.timestamp ? formatDate(h.timestamp) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
