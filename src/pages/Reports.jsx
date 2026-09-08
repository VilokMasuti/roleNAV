import { PageHeader } from "../Components/Layout/PageHeader";

const METRICS = [
  { label: "Orders this month",   value: "1,284", delta: "+8.2%" },
  { label: "Average order value", value: "$318",  delta: "+2.4%" },
  { label: "Open disputes",       value: "6",     delta: "-1"    },
];

// Displays workspace analytics for users with report access.
export function Reports() {
  return (
    <>
      <PageHeader
        eyebrow="Module"
        title="Reports"
        description="Admin-only workspace analytics."
      />

      <ul className="grid gap-4 sm:grid-cols-3">
        {METRICS.map((metric) => (
          <li key={metric.label} className="stat-card card-padded rounded-cards">
            <p className="stat-label">{metric.label}</p>
            <p className="stat-value mt-3">{metric.value}</p>
            <p className="caption mt-2 text-paid">{metric.delta}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
