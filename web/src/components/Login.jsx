// Login.jsx
import { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, saveUserToFirestore } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/panel');
    }
  }, [user, loading, navigate]);

  const loginWithEmail = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToFirestore(result.user);
      navigate('/panel');
    } catch (error) {
      console.error(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(result.user);
      navigate('/panel');
    } catch (error) {
      console.error(error.message);
    }
  };

  const registerWithEmail = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserToFirestore(result.user);
      navigate('/panel');
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={loginWithEmail}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login con Email</button>
      </form>

      <button onClick={loginWithGoogle}>Login con Google</button>

      <h3>Registro</h3>
      <form onSubmit={registerWithEmail}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Login;
