import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Role = 'officer' | 'msme' | 'admin';
interface User { username: string; role: Role; name: string; }
interface AuthCtx { user: User | null; login: (u: string, p: string, r: Role) => boolean; logout: () => void; isAuth: boolean; }

const AuthContext = createContext<AuthCtx>({ user: null, login: () => false, logout: () => {}, isAuth: false });

const mockUsers: Record<string, { password: string; role: Role; name: string }> = {
  'officer': { password: 'officer123', role: 'officer', name: 'Rajesh Kapoor' },
  'msme': { password: 'msme123', role: 'msme', name: 'Priya Sharma' },
  'admin': { password: 'admin123', role: 'admin', name: 'System Admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const s = localStorage.getItem('idbi_user');
    return s ? JSON.parse(s) : null;
  });
  const login = useCallback((u: string, _p: string, r: Role) => {
    const mu = mockUsers[r] || mockUsers['msme'];
    const newUser = { username: u || r, role: r, name: mu.name };
    setUser(newUser);
    localStorage.setItem('idbi_user', JSON.stringify(newUser));
    return true;
  }, []);
  const logout = useCallback(() => { setUser(null); localStorage.removeItem('idbi_user'); }, []);
  return <AuthContext.Provider value={{ user, login, logout, isAuth: !!user }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
