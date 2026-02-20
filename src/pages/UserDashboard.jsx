import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null; // or a loading spinner, but user should exist here
  }

  return (
    <div style={styles.container}>
      {/* Background decorative circles */}
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>

      <div style={styles.card}>
        <div style={styles.icon}>👤</div>
        <h2 style={styles.title}>Welcome, {user.first_name || user.username}!</h2>
        <p style={styles.subtitle}>Your account is approved. You have access to the user area.</p>

        <div style={styles.profileCard}>
          <h3 style={styles.profileTitle}>Your Profile Information</h3>
          <div style={styles.profileGrid}>
            <div style={styles.profileItem}>
              <span style={styles.profileLabel}>Username</span>
              <span style={styles.profileValue}>{user.username}</span>
            </div>
            <div style={styles.profileItem}>
              <span style={styles.profileLabel}>Email</span>
              <span style={styles.profileValue}>{user.email}</span>
            </div>
            <div style={styles.profileItem}>
              <span style={styles.profileLabel}>First Name</span>
              <span style={styles.profileValue}>{user.first_name || '—'}</span>
            </div>
            <div style={styles.profileItem}>
              <span style={styles.profileLabel}>Last Name</span>
              <span style={styles.profileValue}>{user.last_name || '—'}</span>
            </div>
          </div>
        </div>

        <button onClick={handleLogout} style={styles.logoutButton}>
          <span style={styles.logoutIcon}>🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: '1rem',
  },
  bgCircle1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    top: '-100px',
    right: '-100px',
  },
  bgCircle2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    bottom: '-150px',
    left: '-150px',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    position: 'relative',
    zIndex: 1,
    animation: 'fadeIn 0.5s ease-out',
  },
  icon: {
    fontSize: '3.5rem',
    textAlign: 'center',
    marginBottom: '0.5rem',
    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1rem',
    textAlign: 'center',
    color: '#666',
    marginBottom: '2rem',
  },
  profileCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '2rem',
    border: '1px solid #e9ecef',
  },
  profileTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #dee2e6',
    paddingBottom: '0.5rem',
  },
  profileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  profileItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  profileLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  profileValue: {
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#212529',
    wordBreak: 'break-word',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.9rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    letterSpacing: '0.3px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: '#c82333',
      transform: 'scale(1.02)',
      boxShadow: '0 7px 14px rgba(0,0,0,0.15)',
    },
  },
  logoutIcon: {
    fontSize: '1.2rem',
  },
};

// Add this to your global CSS for the fade-in animation
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// }

export default UserDashboard;