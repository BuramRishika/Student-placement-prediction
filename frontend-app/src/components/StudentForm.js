import React, { useState } from 'react';

const defaultForm = { cgpa: '', internships: '', projects: '', communication: '', coding: '' };

const fields = [
  { name: 'cgpa',          label: '📘 CGPA',                  min: 0,  max: 10,  step: '0.01', placeholder: 'e.g. 8.5', hint: 'Scale: 0 – 10' },
  { name: 'internships',   label: '💼 Internships',            min: 0,  max: 10,  step: '1',    placeholder: 'e.g. 2',   hint: 'Number of internships completed' },
  { name: 'projects',      label: '🛠️ Projects',               min: 0,  max: 20,  step: '1',    placeholder: 'e.g. 3',   hint: 'Number of projects completed' },
  { name: 'communication', label: '🗣️ Communication Skills',   min: 1,  max: 10,  step: '1',    placeholder: 'e.g. 7',   hint: 'Self-rating: 1 (poor) – 10 (excellent)' },
  { name: 'coding',        label: '💻 Coding Skills',          min: 1,  max: 10,  step: '1',    placeholder: 'e.g. 8',   hint: 'Self-rating: 1 (poor) – 10 (excellent)' },
];

export default function StudentForm({ onResult, onLoading }) {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    onLoading(true);
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cgpa: parseFloat(form.cgpa),
          internships: parseInt(form.internships),
          projects: parseInt(form.projects),
          communication: parseInt(form.communication),
          coding: parseInt(form.coding),
        }),
      });
      const data = await res.json();
      onResult({ ...data, inputs: form });
    } catch {
      onResult({ error: true, inputs: form });
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  const isValid = Object.values(form).every((v) => v !== '');

  return (
    <div className="card">
      <h2>Student Profile</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((f) => (
          <div className="form-group" key={f.name}>
            <label>{f.label}</label>
            <input
              type="number"
              name={f.name}
              min={f.min}
              max={f.max}
              step={f.step}
              placeholder={f.placeholder}
              value={form[f.name]}
              onChange={handleChange}
              required
            />
            <span className="hint">{f.hint}</span>
          </div>
        ))}
        <button type="submit" className="btn-submit" disabled={!isValid || loading}>
          {loading ? <><span className="loading-spinner" /> Predicting...</> : '🔍 Predict Placement'}
        </button>
      </form>
    </div>
  );
}
