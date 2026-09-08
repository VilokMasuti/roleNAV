import { usePermissions } from "../hooks/usePermissions";

/**
 * Renders children only when the user holds `action` on `moduleName`.
 * Otherwise renders `fallback` (default: nothing).
 */
export function PermissionGate({ moduleName, action, fallback = null, children }) {
  const { hasPermission } = usePermissions();
  return hasPermission(moduleName, action) ? children : fallback;
}
