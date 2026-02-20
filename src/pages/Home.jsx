import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Background decorative elements */}
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>
      
      <div style={styles.content}>
        <h1 style={styles.title}>
          Welcome to <span style={styles.highlight}>Admin Panel</span>
        </h1>
        <p style={styles.subtitle}>
          Manage your application with ease. Choose your portal below.
        </p>

        <div style={styles.cardContainer}>
          {/* User Portal Card */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>👥</div>
            <h2 style={styles.cardTitle}>User Portal</h2>
            <p style={styles.cardText}>
              For regular users. Create an account and wait for admin approval.
            </p>
            <div style={styles.buttonGroup}>
              <Link to="/signup" style={styles.link}>
                <button style={{...styles.button, ...styles.buttonPrimary}}>
                  Sign Up
                </button>
              </Link>
              <Link to="/login" style={styles.link}>
                <button style={{...styles.button, ...styles.buttonSecondary}}>
                  Sign In
                </button>
              </Link>
            </div>
          </div>

          {/* Admin Portal Card */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>🛡️</div>
            <h2 style={styles.cardTitle}>Admin Portal</h2>
            <p style={styles.cardText}>
              For administrators. The first admin account can be created here.
            </p>
            <div style={styles.buttonGroup}>
              <Link to="/admin/signup" style={styles.link}>
                <button style={{...styles.button, ...styles.buttonPrimary}}>
                  Admin Sign Up
                </button>
              </Link>
              <Link to="/login" style={styles.link}>
                <button style={{...styles.button, ...styles.buttonSecondary}}>
                  Admin Sign In
                </button>
              </Link>
            </div>
          </div>
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
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    color: 'white',
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
    letterSpacing: '-0.02em',
  },
  highlight: {
    background: 'linear-gradient(45deg, #ffd700, #ffaa00)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '4rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: '1.6',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2.5rem',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2.5rem 2rem',
    width: '320px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ':hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
    },
  },
  cardIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
  },
  cardTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#333',
    letterSpacing: '-0.01em',
  },
  cardText: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '2rem',
    lineHeight: '1.6',
    textAlign: 'center',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    width: '100%',
  },
  button: {
    border: 'none',
    padding: '0.9rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    letterSpacing: '0.3px',
  },
  buttonPrimary: {
    backgroundColor: '#667eea',
    color: 'white',
    ':hover': {
      backgroundColor: '#5a67d8',
      transform: 'scale(1.02)',
      boxShadow: '0 7px 14px rgba(0,0,0,0.15)',
    },
  },
  buttonSecondary: {
    backgroundColor: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    ':hover': {
      backgroundColor: '#f0f0ff',
      transform: 'scale(1.02)',
      boxShadow: '0 7px 14px rgba(0,0,0,0.1)',
    },
  },
};

export default Home;