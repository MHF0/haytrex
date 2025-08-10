/// <reference types="vite/client" />

// Global declaration for React
declare global {
  interface Window {
    React: typeof import('react');
  }
}