// Ultra minimal React component to test basic rendering
import React from 'react';

function App() {
  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'red', fontSize: '48px' }}>HELLO REACT IS WORKING</h1>
      <p style={{ color: 'blue', fontSize: '24px' }}>If you can see this, React is rendering!</p>
      <button
        onClick={() => alert('Button works!')}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '20px',
          fontSize: '18px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Click Me Test
      </button>
    </div>
  );
}

export default App;
