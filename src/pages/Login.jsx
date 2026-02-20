import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = await login(username, password);
      if (userData.is_staff) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      {/* Background decorative circles */}
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>

      <div style={styles.card}>
        <div style={styles.icon}>🔐</div>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to continue to your account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.error}>
              <span style={styles.errorIcon}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        <div style={styles.links}>
          <Link to="/signup" style={styles.link}>
            Don't have an account? Sign Up
          </Link>
          <Link to="/" style={styles.link}>
            ← Back to Home
          </Link>
        </div>
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
    maxWidth: '420px',
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
    fontSize: '0.95rem',
    textAlign: 'center',
    color: '#666',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#444',
    marginLeft: '0.25rem',
  },
  input: {
    padding: '0.9rem 1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    backgroundColor: 'white',
    ':focus': {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102,126,234,0.1)',
    },
  },
  button: {
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    letterSpacing: '0.3px',
    marginTop: '0.5rem',
    ':hover': {
      backgroundColor: '#5a67d8',
      transform: 'scale(1.02)',
      boxShadow: '0 7px 14px rgba(0,0,0,0.15)',
    },
  },
  error: {
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#c33',
    fontSize: '0.95rem',
    marginBottom: '0.5rem',
  },
  errorIcon: {
    fontSize: '1.2rem',
  },
  links: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    alignItems: 'center',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    ':hover': {
      color: '#5a67d8',
      textDecoration: 'underline',
    },
  },
};

// Add a global keyframe animation for fade-in (you can include this in your global CSS)
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// }

export default Login;