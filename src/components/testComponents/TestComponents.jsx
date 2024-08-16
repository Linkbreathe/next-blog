// src/components/testComponents/TestComponents.jsx
// This should be a server component
import React from 'react';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const TestComponents = async () => {
    // Simulate delay for testing
    await new Promise(resolve => setTimeout(resolve, 2000));
    // await delay(4000);
    return (
        <div>TestComponents</div>
    );
};

export default TestComponents;
