// Layout.jsx
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav style={{
        background: '#222',
        color: '#fff',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>👤 {user?.email}</span>
        <button
          onClick={logout}
          style={{
            backgroundColor: '#ff4d4f',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cerrar sesión
        </button>
      </nav>

      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
