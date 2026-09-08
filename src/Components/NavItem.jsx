
import { NavLink } from "react-router-dom";

// Renders one navigation link with its configured icon and active state.
const NavItem = ( {to, icon: Icon, label, onNavigate }) => {
  return (
    <NavLink
 to={to}
      onClick={onNavigate}
      className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}
    >

      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </NavLink>
  )
}

export default NavItem
