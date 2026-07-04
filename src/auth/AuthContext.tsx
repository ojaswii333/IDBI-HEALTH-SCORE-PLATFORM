import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UserRole } from '../shared/types';

interface User { id: string; name: string; email: string; role: UserRole; }
interface AuthCtx {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuth: boolean;
}

const AuthContext = createContext<AuthCtx>({ user: null, login: () => {}, logout: () => {}, isAuth: false });

const mockUsers: Record<UserRole, User> = {
  customer: { id: 'u-1', name: 'Ananya Upadhyay', email: 'ananya@ojasananya.com', role: 'customer' },
  officer: { id: 'u-2', name: 'Anita Desai', email: 'anita.desai@idbi.co.in', role: 'officer' },
  admin: { id: 'u-3', name: 'System Admin', email: 'admin@idbi.co.in', role: 'admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const s = localStorage.getItem('idbi_v3_user');
    return s ? JSON.parse(s) : null;
  });

  const login = useCallback((role: UserRole) => {
    const u = mockUsers[role];
    setUser(u);
    localStorage.setItem('idbi_v3_user', JSON.stringify(u));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('idbi_v3_user');
  }, []);

  return <AuthContext.Provider value={{ user, login, logout, isAuth: !!user }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
