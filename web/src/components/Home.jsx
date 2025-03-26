// Home.jsx
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Bienvenida a tu panel principal ✨</h2>

      <p><strong>Usuario:</strong> {user?.email}</p>

      <button
        onClick={logout}
        style={{
          marginTop: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#ff4d4f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;
