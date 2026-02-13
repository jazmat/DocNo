// Pure JavaScript test to check if JavaScript executes at all
console.log('🟢 JavaScript is executing!');

// Test DOM manipulation
document.addEventListener('DOMContentLoaded', function() {
    console.log('🟢 DOM is ready!');

    const rootElement = document.getElementById('root');
    console.log('🔍 Root element found:', rootElement);

    if (rootElement) {
        rootElement.innerHTML = `
            <div style="
                padding: 50px;
                background-color: #ff6b6b;
                color: white;
                font-size: 24px;
                min-height: 100vh;
                font-family: Arial, sans-serif;
                text-align: center;
            ">
                <h1 style="font-size: 48px; margin-bottom: 20px;">
                    🚀 PURE JAVASCRIPT IS WORKING!
                </h1>
                <p style="font-size: 18px; margin-bottom: 30px;">
                    This proves JavaScript can execute and manipulate the DOM.
                </p>
                <button
                    id="testButton"
                    style="
                        background-color: #4ecdc4;
                        color: white;
                        padding: 15px 30px;
                        font-size: 16px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        margin: 10px;
                    "
                >
                    Click Me Test
                </button>
                <div style="
                    background-color: white;
                    color: #333;
                    padding: 20px;
                    border-radius: 10px;
                    margin-top: 30px;
                    text-align: left;
                ">
                    <h3 style="color: #27ae60;">✅ What's Working:</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 5px;">✅ HTML is loading</li>
                        <li style="margin-bottom: 5px;">✅ JavaScript is executing</li>
                        <li style="margin-bottom: 5px;">✅ DOM manipulation works</li>
                        <li style="margin-bottom: 5px;">✅ CSS styles are applying</li>
                        <li style="margin-bottom: 5px;">✅ Event listeners work (test button)</li>
                    </ul>
                    <p style="margin-top: 15px; font-size: 14px; color: #7f8c8d;">
                        If you can see this, the problem is specifically with React, not with basic JavaScript execution.
                    </p>
                </div>
            </div>
        `;

        // Add click event listener
        const button = document.getElementById('testButton');
        if (button) {
            button.addEventListener('click', function() {
                alert('🎉 JavaScript event handling works!');
                console.log('🟢 Button click event fired!');
            });
        }

        console.log('🟢 DOM content injected successfully');
    } else {
        console.error('❌ Root element not found!');
        document.body.innerHTML = `
            <div style="padding: 50px; background: red; color: white; text-align: center;">
                <h1>❌ ROOT ELEMENT NOT FOUND</h1>
                <p>The div with id="root" is missing from the HTML</p>
            </div>
        `;
    }
});

// Test if this script loads
console.log('🟢 main-js-test.js loaded successfully');
