# RoleNav / FreightFox

RoleNav is a React dashboard for demonstrating role-based access.

The dashboard is branded **FreightFox** and contains three areas:

- Orders
- Billing
- Reports

Different demo users can see different areas and actions. For example, one user can create orders, while another user can only view them.

This project uses mock data. It does not connect to a real backend or database.

## How it works

1. The user selects a demo account on the login page.
2. The selected user is loaded from `src/api/mockApi.js`.
3. The user is saved in the browser's `localStorage`.
4. The dashboard shows the modules allowed for that user.
5. Routes and buttons are shown or blocked according to the user's permissions.
6. Logging out removes the saved session and returns to the login page.

## Demo users

| User | Role | Access |
| --- | --- | --- |
| Vilok Masuti. | Operations | View and create Orders; view Billing |
| Pooja Koli | Support | View Orders |
| Vish Raj | Administrator | Orders, Billing, and Reports; full available actions |

## Pages

- `/login` - Select a demo account.
- `/dashboard` - View the modules available to the current user.
- `/orders` - View sample orders. Creating and deleting depend on permissions.
- `/billing` - View sample invoices. Creating invoices requires permission.
- `/reports` - View sample business metrics. This is available to the administrator.
- `/unauthorized` - Shown when a signed-in user tries to open a module they cannot access.

Unknown URLs redirect to `/login`.

## Folder structure

```text
rolenav/
├── public/fonts/              Local font files
├── src/
│   ├── api/mockApi.js         Demo users and fake API request
│   ├── auth/                  Login session and auth context
│   ├── Components/
│   │   ├── Layout/             App shell, sidebar, and page header
│   │   ├── NavItem.jsx         Navigation link
│   │   ├── PermissionGate.jsx  Shows content only with permission
│   │   ├── ProtectedRoute.jsx  Protects pages and modules
│   │   └── Spinner.jsx          Loading indicator
│   ├── config/modules.js      Module routes and icons
│   ├── hooks/usePermissions.js Permission checks
│   ├── pages/                  Login and dashboard pages
│   ├── App.jsx                 Routes and providers
│   ├── index.css               Shared application styles
│   └── main.jsx                Application entry point
├── index.html                  HTML entry file
├── package.json                Scripts and dependencies
└── vite.config.js              Vite configuration
```

## Main components

### `App.jsx`

Connects the application together. It provides authentication, routing, and toast notifications. It also defines every URL in the application.

### `AuthProvider`

Stores the current user, handles login and logout, and restores a saved session from `localStorage`.

### `ProtectedRoute`

Checks whether the user is logged in and whether the user can access a requested module. It redirects users to the correct page when access is missing.

### `usePermissions`

Checks whether the current user has a module or a specific action such as `VIEW`, `CREATE`, or `DELETE`.

### `PermissionGate`

Controls individual actions inside a page. For example, it controls the Create order, Delete, and New invoice buttons.

### `AppShell`

Creates the common page layout. It includes the responsive sidebar and the main page area.

### `Sidebar`

Shows the current user's name and role, creates navigation links for permitted modules, and provides the logout button.

### `PageHeader`

Provides the common title, description, and action area used by the dashboard pages.

### `NavItem`

Creates a navigation link and highlights the page that is currently open.

### `Spinner`

Shows a loading state while the application restores a session or signs in a demo user.

## How permissions work

Permissions are stored on each user's module:

```js
{
  name: "Orders",
  permissions: ["VIEW", "CREATE"]
}
```

There are two checks:

- `ProtectedRoute` checks whether the user can open a page.
- `PermissionGate` checks whether the user can use an action on that page.

This means a user may be allowed to open Orders but still be unable to create or delete an order.

## Where the text and data come from

- User names, roles, and permissions are in `src/api/mockApi.js`.
- Orders are defined in `src/pages/Orders.jsx`.
- Invoices are defined in `src/pages/Billing.jsx`.
- Report numbers are defined in `src/pages/Reports.jsx`.
- Page titles and descriptions are written in each page component.
- Navigation labels and module names come from `src/config/modules.js` and the user data.

The displayed text includes the FreightFox brand, account names, page titles, descriptions, button labels, statuses, and toast messages. It is sample product text for the demo.

## Running the project

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the linter:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Adding a new module

1. Add the module route and icon in `src/config/modules.js`.
2. Create the page in `src/pages`.
3. Add the protected route in `src/App.jsx`.
4. Add the module to the required demo users in `src/api/mockApi.js`.
5. Use `PermissionGate` for actions that need permissions.

