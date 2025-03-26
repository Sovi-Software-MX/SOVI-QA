import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAuth = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
