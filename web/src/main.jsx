import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // 👈 Importa el AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* 👈 Esto envuelve toda la app */}
      <App />
    </AuthProvider>
  </StrictMode>
);
