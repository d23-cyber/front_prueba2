import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { useUiStore } from './store/uiStore';
import './i18n';
import './index.css';

// Initialize theme before rendering to prevent flash
const initTheme = () => {
  const stored = localStorage.getItem('ethoshub_ui');
  let theme: 'light' | 'dark' | 'system' = 'dark';
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      theme = parsed.state?.theme || 'dark';
    } catch {
      // Use default
    }
  }
  
  const resolvedTheme = theme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  
  if (resolvedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

initTheme();

// Initialize the store's theme on first load
useUiStore.getState().initializeTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
