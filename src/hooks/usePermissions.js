
import { useAuth } from "../auth/useAuth";

// Exposes permission checks derived from the authenticated user's modules.
export function usePermissions() {
  const { user } = useAuth();

  /**
   * Finds a module that belongs to the current user.
   *
   * {string} moduleName - The name of the module to search for.
   * returns {object|null} The matching module, or null if the module is not found.
   */
  // Finds a module that belongs to the current user.
  const findModule = (moduleName) => {
    return (
      user?.modules?.find(
        (module) =>
          module.name.toLowerCase() ===
          String(moduleName).toLowerCase()
      ) ?? null
    );
  };

  /**
   * Checks whether the current user has access to a specific module.
   *
   * {string} moduleName - The name of the module to check.
   *  {boolean} True if the user has the module, otherwise false.
   */
  // Checks whether the current user can open a module.
  const canAccessModule = (moduleName) => {
    return Boolean(findModule(moduleName));
  };


  //  * Checks whether the current user has a specific permission
  //  * for a specific module.
  //  *
  //  * param {string} moduleName - The name of the module to check.
  //  * param {string} action - The action/permission to check, such as "VIEW", "CREATE", or "DELETE".
  //  * returns {boolean} True if the user has the permission, otherwise false.

  // Checks whether the current user can perform an action in a module.
  const hasPermission = (moduleName, action) => {
    const found = findModule(moduleName);

    return Boolean(found?.permissions?.includes(action));
  };

  return {
    canAccessModule,
    hasPermission,
  };
}
