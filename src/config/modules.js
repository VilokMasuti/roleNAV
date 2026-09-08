import { BarChart3, ClipboardList, CreditCard, LayoutDashboard } from "lucide-react";



/** Single source of truth: module name → route path + icon */
export const MODULE_CONFIG = {
  Orders: {path:"/orders",icon:ClipboardList },
   Billing: { path: "/billing", icon: CreditCard },
  Reports: { path: "/reports", icon: BarChart3 },
}
export const DASHBOARD_LINK = {
  label: "Dashboard",
  path: "/dashboard",
  icon: LayoutDashboard,
};


// Returns route and icon metadata for a module name.
export function getModuleConfig(name) {
  return MODULE_CONFIG[name] ?? null;
}
