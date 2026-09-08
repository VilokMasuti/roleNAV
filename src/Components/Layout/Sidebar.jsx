
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { DASHBOARD_LINK, getModuleConfig } from "../../config/modules";
import NavItem from "../NavItem";

// Renders navigation links for the current user's permitted modules.
const Sidebar = ({ onNavigate }) => {
   const { user, logout } = useAuth();
  const navigate = useNavigate();
    if (!user) return null;

      // Logs out the current user and returns to the login page.
      const handleLogout = () => {
    logout();
    navigate("/login");
  };
  // Navigates to a sidebar destination and closes mobile navigation when needed.
  const handleNavigate = (path) => {
    navigate(path);
    onNavigate?.(path);
  };
  return (
   <nav
      aria-label="Main navigation"
      className="flex h-full w-64 flex-col gap-6 border-r border-line bg-obsidian p-5"
    >
      {/* User identity */}
      <div className="nav-brand">
        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-raised border border-line text-body-sm font-medium text-ink">
          {user.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-body-sm font-medium text-ink">{user.name}</p>
          <p className="truncate caption">{user.role}</p>
        </div>
      </div>

      {/* Navigation links */}
      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        <p className="nav-section-label">Workspace</p>

        <NavItem
          to={DASHBOARD_LINK.path}
          icon={DASHBOARD_LINK.icon}
          label={DASHBOARD_LINK.label}
          onNavigate={() => handleNavigate(DASHBOARD_LINK.path)}
        />

        {user.modules.map((module) => {
          const config = getModuleConfig(module.name);
          if (!config) return null;
          return (
            <NavItem
              key={module.name}
              to={config.path}
              icon={config.icon}
              label={module.name}
              onNavigate={() => handleNavigate(config.path)}
            />
          );
        })}
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="nav-link w-full"
      >
        <LogOut className="size-4 shrink-0" aria-hidden="true" />
        <span>Log out</span>
      </button>
    </nav>
  )
}

export default Sidebar
