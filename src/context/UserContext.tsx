import React, { createContext, useState, useEffect } from 'react';

type UserRole = 'candidato' | 'recrutador' | null;

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  clearRole: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('userRole');
    return (saved as UserRole) || null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem('userRole', role);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [role]);

  const clearRole = () => setRole(null);

  return (
    <UserContext.Provider value={{ role, setRole, clearRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserRole() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUserRole deve ser usado dentro de UserProvider');
  }
  return context;
}