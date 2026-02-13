// Ultra-simple main.jsx to test React mounting
import React from 'react';
import ReactDOM from 'react-dom/client';

// Ultra simple App component
function App() {
  return (
    <div style={{
      padding: '50px',
      backgroundColor: 'red',
      color: 'white',
      fontSize: '24px',
      minHeight: '100vh'
    }}>
      <h1>REACT IS MOUNTING!</h1>
      <p>If you see this, React is working!</p>
      <button onClick={() => alert('Click works!')}>
        Test Button
      </button>
    </div>
  );
}

// Mount React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
