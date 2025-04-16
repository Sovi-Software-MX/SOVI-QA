// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componente principal de la landing page
import Landing from './components/Landing';

// Componente de autenticación (login, registro y reset integrados)
import Login from './components/auth/Login';

// Layout que engloba el panel; recuerda que debe incluir <Outlet /> para renderizar Home u otras subrutas.
import Layout from './components/Layout';

// Componente que muestra el contenido principal del panel (por ejemplo, dashboard o perfil)
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal: Landing */}
        <Route path="/" element={<Landing />} />

        {/* Ruta para iniciar sesión */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida para el panel. Aquí se podría aplicar protección más adelante. */}
        <Route path="/panel" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Para cualquier otra ruta, redirigimos a la Landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
