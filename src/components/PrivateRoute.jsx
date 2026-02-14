import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  // If admin is required but user is not staff, redirect to user dashboard
  if (requiredRole === 'admin' && !user.is_staff) {
    return <Navigate to="/dashboard" />;
  }

  // If user is required but user is staff, redirect to admin dashboard
  if (requiredRole === 'user' && user.is_staff) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default PrivateRoute;