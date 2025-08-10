import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make React available globally for components that might use it without importing
window.React = React;

createRoot(document.getElementById('root')!).render(<App />);
