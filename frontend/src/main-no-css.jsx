// Main.jsx without CSS import to test if CSS is blocking React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple App component with inline styles only
function App() {
  return (
    <div style={{
      padding: '50px',
      backgroundColor: '#f0f0f0',
      color: '#333',
      fontSize: '24px',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        color: 'red',
        fontSize: '48px',
        marginBottom: '20px'
      }}>
        REACT IS WORKING WITHOUT CSS!
      </h1>
      <p style={{
        color: 'blue',
        fontSize: '18px',
        marginBottom: '20px'
      }}>
        If you can see this, React is mounting successfully without CSS imports.
      </p>
      <button
        onClick={() => alert('Button click works!')}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '15px 30px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Test Button Click
      </button>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px',
        border: '2px solid #ccc'
      }}>
        <h3 style={{ color: 'green' }}>✅ What's Working:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '5px' }}>✅ React is rendering</li>
          <li style={{ marginBottom: '5px' }}>✅ ReactDOM.createRoot is working</li>
          <li style={{ marginBottom: '5px' }}>✅ JavaScript is executing</li>
          <li style={{ marginBottom: '5px' }}>✅ Event handlers work</li>
          <li style={{ marginBottom: '5px' }}>✅ Inline styles are applied</li>
        </ul>
      </div>
    </div>
  );
}

// Mount React without any CSS imports
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
