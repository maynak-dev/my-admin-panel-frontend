import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Admin Panel</h1>
      <div style={styles.cardContainer}>
        {/* User Portal Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>User Portal</h2>
          <p style={styles.cardText}>For regular users (requires admin approval)</p>
          <div style={styles.buttonGroup}>
            <Link to="/signup">
              <button style={styles.button}>Sign Up</button>
            </Link>
            <Link to="/login">
              <button style={styles.button}>Sign In</button>
            </Link>
          </div>
        </div>

        {/* Admin Portal Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Admin Portal</h2>
          <p style={styles.cardText}>For administrators (first admin only)</p>
          <div style={styles.buttonGroup}>
            <Link to="/admin/signup">
              <button style={styles.button}>Admin Sign Up</button>
            </Link>
            <Link to="/login">
              <button style={styles.button}>Admin Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple inline styles – you can move these to a CSS file if you prefer
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    color: '#333',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    padding: '2rem',
    width: '300px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  cardTitle: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#1976d2',
  },
  cardText: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '2rem',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  button: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    width: '100%',
  },
};

export default Home;