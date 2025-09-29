import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/lib/auth';

const Index = () => {
  useEffect(() => {
    // Redirect to appropriate page based on auth status
    if (isAuthenticated()) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  }, []);

  // Fallback redirect
  return isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default Index;
