// Renders the shared page heading, supporting copy, and optional actions.
export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="page-header">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="page-title">{title}</h1>
        {description && <p className="body-muted mt-2 max-w-xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}
