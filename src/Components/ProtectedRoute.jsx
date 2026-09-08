
import { Navigate } from 'react-router-dom';
import { useAuth } from "../auth/useAuth";
import { usePermissions } from "../hooks/usePermissions";
import AppShell from './Layout/AppShell';
import { Spinner } from "./Spinner";

/**
 * No session  →  redirect to /login
 * Has session but no module access  →  redirect to /unauthorized
 * All good  →  render children inside AppShell
 */
// Protects a route by restoring the session, checking access, and rendering the shell.
const ProtectedRoute = ({ moduleName, children }) => {
    const { user, restoring } = useAuth();
  const { canAccessModule } = usePermissions();

  // Wait for localStorage session restore before making any redirect decision
  if(restoring) {
    return (
       <div className="grid min-h-screen place-items-center bg-obsidian">
        <Spinner label="Checking your access" />
      </div>
    )
  }
    if (!user) {
    return <Navigate to="/login" replace />;
  }

    if (moduleName && !canAccessModule(moduleName)) {
    return <Navigate to="/unauthorized" replace />;
  }

   return <AppShell>{children}</AppShell>;
}

export default ProtectedRoute
