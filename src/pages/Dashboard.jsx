import { useAuth } from "../auth/useAuth";
import { PageHeader } from "../Components/Layout/PageHeader";
import { getModuleConfig } from "../config/modules";

// Displays the modules available to the authenticated user.
export function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        description="These are the modules your account can access right now."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {user.modules.map((module) => {
          const config = getModuleConfig(module.name);
          const Icon = config?.icon;
          return (
            <li key={module.name} className="card-padded border  border-l
        [border-image:linear-gradient(180deg,transparent,#2a2a2a_20%,#2a2a2a_80%,transparent)_1] card-padded  card-shadow">
              <div className="flex items-center gap-2.5">
                {Icon && <Icon className="size-4 text-subtext shrink-0" aria-hidden="true" />}
                <h2 className="card-title">{module.name}</h2>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {module.permissions.map((permission) => (
                  <li
                    key={permission}
                    className="rounded-md border border-line bg-raised px-2.5 py-0.5 caption"
                  >
                    {permission}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}
