// src/components/Home.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (!user) return <p className="text-center">Cargando...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white px-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Bienvenido, {user.firstName || 'Usuario'}</h2>
        <p className="text-center">{user.email}</p>
        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
