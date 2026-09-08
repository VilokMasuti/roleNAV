import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

// Explains that the current user lacks access and links back to the dashboard.
export function Unauthorized() {
  return (
    <div className="state-wrapper min-h-[60vh]">
      <span className="grid size-12 place-items-center rounded-cards bg-raised border border-line">
        <Lock className="size-5 text-subtext" aria-hidden="true" />
      </span>
      <h1 className="state-title">You don't have access to this page</h1>
      <p className="state-message">Ask an administrator to add this module to your account.</p>
      <Link to="/dashboard" className="nav-link mt-2">
        Back to dashboard
      </Link>
    </div>
  );
}
