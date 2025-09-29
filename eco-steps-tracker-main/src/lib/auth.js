// Mock authentication utilities

export const getCurrentUser = () => {
  const user = localStorage.getItem('ecosteps_user');
  return user ? JSON.parse(user) : null;
};

export const login = (email, password) => {
  // Mock login - in real app, this would call an API
  if (password.length >= 6) {
    const user = {
      id: Date.now(),
      email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      ecoPoints: 1250,
      carbonReduced: 85.4,
      joinDate: new Date().toISOString()
    };
    localStorage.setItem('ecosteps_user', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: 'Password must be at least 6 characters' };
};

export const register = (name, email, password) => {
  // Mock registration
  if (password.length >= 6 && name.length >= 2) {
    const user = {
      id: Date.now(),
      email,
      name,
      ecoPoints: 0,
      carbonReduced: 0,
      joinDate: new Date().toISOString()
    };
    localStorage.setItem('ecosteps_user', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: 'Please provide valid credentials' };
};

export const logout = () => {
  localStorage.removeItem('ecosteps_user');
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};