import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "../Components/Layout/PageHeader";
import { PermissionGate } from "../Components/PermissionGate";

const ORDERS = [
  { id: "ORD-1042", customer: "Northwind Traders", total: "$4,280", status: "Shipped" },
  { id: "ORD-1041", customer: "Globex Logistics",  total: "$1,150", status: "Processing" },
  { id: "ORD-1039", customer: "Initech Supply",    total: "$980",   status: "Pending" },
];

const STATUS = {
  Shipped:    { badge: "badge-paid",    dot: "dot-paid"    },
  Processing: { badge: "badge-pending", dot: "dot-pending" },
  Pending:    { badge: "badge-overdue", dot: "dot-overdue" },
};

// Displays orders and conditionally enables create and delete actions.
export function Orders() {
  return (
    <>
      <PageHeader
        eyebrow="Module"
        title="Orders"
        description="Every account can read orders. Creating and deleting depend on your role."
        actions={
          <>
            <PermissionGate
              moduleName="Orders"
              action="CREATE"
              fallback={
                <button
                  type="button"
                  disabled
                  title="You need CREATE access"
                  className="flex items-center gap-2 rounded-buttons border border-line px-3 py-2 text-body-sm text-subtext opacity-40 cursor-not-allowed"
                >
                  <Plus className="size-4" aria-hidden="true" />
                  Create order
                </button>
              }
            >
              <button
                type="button"
                className="btn-primary"
                onClick={() => toast.success("Order draft created")}
              >
                <Plus className="size-4" aria-hidden="true" />
                Create order
              </button>
            </PermissionGate>

            <PermissionGate moduleName="Orders" action="DELETE">
              <button
                type="button"
                className="flex items-center gap-2 rounded-buttons border border-overdue/30 px-3 py-2 text-body-sm text-overdue transition-colors hover:border-overdue/60"
                onClick={() => toast("Order deleted")}
              >
                <Trash2 className="size-4" aria-hidden="true" />
                Delete
              </button>
            </PermissionGate>
          </>
        }
      />

      <div className="table-wrap">
        <table className="w-full min-w-[520px] text-left">
          <thead className="table-head">
            <tr>
              <th className="table-cell">Order</th>
              <th className="table-cell">Customer</th>
              <th className="table-cell">Total</th>
              <th className="table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((order) => {
              const s = STATUS[order.status] ?? STATUS.Pending;
              return (
                <tr key={order.id} className="table-row">
                  <td className="table-cell-mono text-dim">{order.id}</td>
                  <td className="table-cell data-value">{order.customer}</td>
                  <td className="table-cell-mono text-subtext">{order.total}</td>
                  <td className="table-cell">
                    <span className={`badge gap-1.5 ${s.badge}`}>
                      <span className={s.dot} />
                      {order.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
