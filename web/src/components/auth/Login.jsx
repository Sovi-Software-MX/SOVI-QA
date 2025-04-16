// src/components/auth/Login.jsx
import { useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  saveUserToFirestore,
} from '../../firebase/firebase-config';
import { sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'reset'
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/panel');
    }
    // Si en la URL viene mode=reset, muestra la vista de reset
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'reset') {
      setView('reset');
    }
  }, [user, authLoading, navigate, location]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, form.email, form.password);
      await saveUserToFirestore(result.user);
      navigate('/panel');
    } catch {
      setError('Correo o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setStatus('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const displayName = result.user.displayName || '';
      const [firstName = '', lastName = ''] = displayName.split(' ');
      await saveUserToFirestore(result.user, { firstName, lastName });
      window.location.href = '/panel';
    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión con Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await saveUserToFirestore(
        { uid: result.user.uid, email: form.email },
        { firstName: form.firstName, lastName: form.lastName }
      );
      await sendEmailVerification(result.user, { url: 'https://sovi-des-d0245.web.app/login' });
      setStatus('Cuenta creada. Revisa tu correo para verificar tu cuenta.');
    } catch {
      setError('Error al registrar. Intenta con otro correo.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, form.email, {
        url: 'https://sovi-des-d0245.web.app/login?mode=reset',
      });
      setStatus('Revisa tu correo para restablecer la contraseña.');
    } catch {
      setError('No se pudo enviar el correo. Verifica el email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        {view === 'login' && (
          <>
            <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>
            {status && <p className="text-green-600 text-center">{status}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" name="email" required placeholder="Correo" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
              <input type="password" name="password" required placeholder="Contraseña" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" />
              <button type="submit" className="w-full bg-brand-green text-black py-2 rounded disabled:opacity-50" disabled={loading}>
                {loading ? 'Entrando...' : 'Ingresar'}
              </button>
            </form>
            <button onClick={handleGoogleLogin} className="w-full bg-gray-200 py-2 rounded" disabled={loading}>
              Iniciar con Google
            </button>
            <div className="text-sm text-center mt-4 space-y-2">
              <p>¿No tienes cuenta? <button onClick={() => setView('register')} className="text-brand-green underline">Crear una</button></p>
              <p><button onClick={() => setView('reset')} className="text-brand-green underline">¿Olvidaste tu contraseña?</button></p>
            </div>
          </>
        )}

        {view === 'register' && (
          <>
            <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>
            {status && <p className="text-green-600 text-center">{status}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
              <input name="firstName" type="text" required placeholder="Nombre" value={form.firstName} onChange={handleChange} className="w-full p-2 border rounded" />
              <input name="lastName" type="text" required placeholder="Apellido" value={form.lastName} onChange={handleChange} className="w-full p-2 border rounded" />
              <input name="email" type="email" required placeholder="Correo" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
              <input name="password" type="password" required placeholder="Contraseña" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" />
              <input name="confirmPassword" type="password" required placeholder="Repetir contraseña" value={form.confirmPassword} onChange={handleChange} className="w-full p-2 border rounded" />
              <button type="submit" className="w-full bg-brand-green text-black py-2 rounded disabled:opacity-50" disabled={loading}>
                {loading ? 'Creando cuenta...' : 'Registrarme'}
              </button>
            </form>
            <div className="text-sm text-center mt-4">
              <p>¿Ya tienes cuenta? <button onClick={() => setView('login')} className="text-brand-green underline">Inicia sesión</button></p>
            </div>
          </>
        )}

        {view === 'reset' && (
          <>
            <h1 className="text-2xl font-bold text-center">Recuperar contraseña</h1>
            {status && <p className="text-green-600 text-center">{status}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleReset} className="space-y-4">
              <input name="email" type="email" required placeholder="Correo" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
              <button type="submit" className="w-full bg-brand-green text-black py-2 rounded disabled:opacity-50" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar correo de recuperación'}
              </button>
            </form>
            <div className="text-sm text-center mt-4">
              <button onClick={() => setView('login')} className="text-brand-green underline">Volver a iniciar sesión</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
