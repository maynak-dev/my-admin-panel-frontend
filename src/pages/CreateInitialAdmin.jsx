import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateInitialAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if an admin already exists
    api.get('/admin/exists/')
      .then(res => {
        if (res.data.admin_exists) {
          navigate('/login'); // admin already exists, go to login
        }
      })
      .catch(() => {});
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/create-initial-admin/', formData);
      // Redirect to login after successful creation
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Creation failed');
    }
  };

  return (
    <div style={styles.container}>
      {/* Background decorative circles */}
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>

      <div style={styles.card}>
        <div style={styles.icon}>👑</div>
        <h2 style={styles.title}>Create Initial Admin</h2>
        <p style={styles.subtitle}>Set up the first administrator account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username *</label>
            <input
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email *</label>
            <input
              name="email"
              type="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password *</label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.rowGroup}>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>First Name</label>
              <input
                name="first_name"
                type="text"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Last Name</label>
              <input
                name="last_name"
                type="text"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          {error && (
            <div style={styles.error}>
              <span style={styles.errorIcon}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button type="submit" style={styles.button}>
            Create Admin
          </button>
        </form>
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
    maxWidth: '480px',
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
    gap: '1.25rem',
  },
  rowGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
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
    width: '100%',
    boxSizing: 'border-box',
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
  },
  errorIcon: {
    fontSize: '1.2rem',
  },
};

// Add this to your global CSS for the fade-in animation
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// }

export default CreateInitialAdmin;