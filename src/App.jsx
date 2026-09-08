import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { Billing } from "./pages/Billing";
import { Dashboard } from './pages/Dashboard';
import Login from './pages/Login';
import { Orders } from "./pages/Orders";
import { Reports } from "./pages/Reports";
import { Unauthorized } from "./pages/Unauthorized";

// Defines the application's routes and provides authentication to every page.
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute moduleName="Orders">
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/billing"
            element={
              <ProtectedRoute moduleName="Billing">
                <Billing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute moduleName="Reports">
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/unauthorized"
            element={
              <ProtectedRoute>
                <Unauthorized />
              </ProtectedRoute>
            }
          />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>


      </BrowserRouter>
      <Toaster theme="dark" position="bottom-right" />


    </AuthProvider>
  )
}

export default App
