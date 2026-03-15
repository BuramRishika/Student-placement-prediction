import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/',          label: 'Home',      icon: '🏠' },
  { path: '/predict',   label: 'Predict',   icon: '🔍' },
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🎓 PlacementAI</Link>
      <ul className="navbar-links"></ul>
      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-user">👋 {user.name}</span>
            <button className="nav-btn nav-logout" onClick={handleLogout}>🚪 Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    className={`nav-btn ${pathname === '/login'    ? 'active' : ''}`}>🔑 Login</Link>
            <Link to="/register" className={`nav-btn nav-register ${pathname === '/register' ? 'active' : ''}`}>✨ Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
