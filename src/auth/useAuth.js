import { useContext } from 'react';
import { AuthContext } from './context';

// Reads the authentication context and enforces provider usage.
export function useAuth() {

    const context = useContext(AuthContext);
      if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
}
