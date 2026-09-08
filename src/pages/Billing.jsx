import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "../Components/Layout/PageHeader";
import { PermissionGate } from "../Components/PermissionGate";

const INVOICES = [
  { id: "INV-2201", period: "August 2026",  amount: "$12,400", status: "Paid" },
  { id: "INV-2190", period: "July 2026",    amount: "$11,850", status: "Paid" },
  { id: "INV-2178", period: "June 2026",    amount: "$10,120", status: "Paid" },
];

// Displays invoices and gates invoice creation by permission.
export function Billing() {
  return (
    <>
      <PageHeader
        eyebrow="Module"
        title="Billing"
        description="Invoices for the current workspace."
        actions={
          <PermissionGate moduleName="Billing" action="CREATE">
            <button
              type="button"
              className="btn-primary"
              onClick={() => toast.success("Invoice drafted")}
            >
              <Plus className="size-4" aria-hidden="true" />
              New invoice
            </button>
          </PermissionGate>
        }
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INVOICES.map((invoice) => (
          <li key={invoice.id} className="card-padded  flex flex-col border-l
        [border-image:linear-gradient(180deg,transparent,#2a2a2a_20%,#2a2a2a_80%,transparent)_1] card-padded  card-shadow">
            <p className="caption">{invoice.id}</p>
            <p className="stat-value mt-2">{invoice.amount}</p>
            <p className="body-muted mt-1">{invoice.period}</p>
            <span className="badge badge-paid mt-4 gap-1.5">
              <span className="dot-paid" />
              {invoice.status}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
