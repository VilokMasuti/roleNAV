import { useEffect, useState } from 'react';
import { fetchUser } from '../api/mockApi';
import { AuthContext } from './context';

const SESSION_KEY = "VILOK";

// Provides session state and authentication actions to the application.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(true); // true until localStorage is read



  // Restores a previously saved user session from local storage.
  useEffect(() => {
    const getUser = () => {
      try {
        const saved = localStorage.getItem(SESSION_KEY)
        if (saved) setUser(JSON.parse(saved))

      } catch (error) {
        console.error(error);

      } finally {
        setRestoring(false)
      }
    }
    getUser()
  }, [])


  // Fetches and stores a user session for the selected demo account.
  const login = async (username) => {
    setLoading(true)
    try {
      const userData = await fetchUser(username);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      setUser(userData);

    } catch (error) {
      console.error(error);
      throw error;

    } finally {
      setLoading(false);

    }
  // Clears the active user session from state and local storage.
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, loading, restoring }}>
      {children}
    </AuthContext.Provider>
  );
}
