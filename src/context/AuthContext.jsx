import { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/users';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('polaraxis-user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('polaraxis-user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('polaraxis-user');
    }
  }, [currentUser]);

  const login = (email, password, tenantId) => {
    const user = users.find(u =>
      u.email === email &&
      u.password === password &&
      u.tenantId === tenantId
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAuthenticated = !!currentUser;

  const switchUser = (user) => {
    const { password, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      switchUser,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
