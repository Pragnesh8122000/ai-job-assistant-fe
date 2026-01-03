# Authentication & Routing Implementation

This document provides an overview of the authentication and routing implementation for the Jobs Finder frontend.

## Overview

The application implements a complete authentication flow with:

- **Access Token** stored in `localStorage`
- **Refresh Token** in httpOnly cookie (backend assumed)
- Automatic token refresh on 401 responses
- Role-based route protection
- Role-aware UI rendering

## Key Components

### 1. API Layer (`src/api/`)

#### `axios.js`

- Configured Axios instance with base URL from environment variables
- Request interceptor attaches access token to all requests
- Response interceptor handles automatic token refresh:
  - Queues failed requests during refresh
  - Prevents infinite refresh loops
  - Automatically logs out user if refresh fails

#### `authApi.js`

- Authentication API service wrapper
- Methods: `login()`, `logout()`, `refreshToken()`, `getCurrentUser()`

### 2. Authentication (`src/auth/`)

#### `AuthProvider.jsx`

- React Context provider for auth state
- Manages: `user`, `isAuthenticated`, `loading`
- Methods:
  - `login(credentials)` - Authenticates user and stores token
  - `logout()` - Clears tokens and user data
  - `hasRole(role)` - Check if user has specific role
  - `hasAnyRole(roles)` - Check if user has any of the specified roles

### 3. Hooks (`src/hooks/`)

#### `useAuth.js`

- Custom hook to access auth context
- Must be used within `AuthProvider`
- Provides: `user`, `isAuthenticated`, `loading`, `login`, `logout`, `hasRole`, `hasAnyRole`

### 4. Routes (`src/routes/`)

#### `RequireAuth.jsx`

- Higher-order component for protected routes
- Shows loading state while checking authentication
- Redirects to `/login` if not authenticated
- Supports `allowedRoles` prop for role-based access
- Redirects to `/dashboard` if user lacks required role

### 5. Layouts (`src/layouts/`)

#### `MainLayout.jsx`

- Main application layout with navigation
- Shows navigation links based on user role
- Users page only visible to Admin and Manager roles
- Displays user email and role
- Logout button in header

### 6. Pages (`src/pages/`)

All pages created:

- **LoginPage.jsx** - Login form with error handling
- **DashboardPage.jsx** - Main dashboard with role-based stats
- **TasksPage.jsx** - Tasks view (placeholder)
- **AnalyticsPage.jsx** - Analytics view (placeholder)
- **UsersPage.jsx** - User management (Admin/Manager only, placeholder)

## Route Structure

```
/login                  → Public (redirects to /dashboard if authenticated)
/dashboard              → Protected (all authenticated users)
/tasks                  → Protected (all authenticated users)
/analytics              → Protected (all authenticated users)
/users                  → Protected (Admin & Manager only)
/                       → Redirects to /dashboard
```

## Role-Based Access Control

### Route Protection

```jsx
<RequireAuth allowedRoles={["Admin", "Manager"]}>
  <UsersPage />
</RequireAuth>
```

### UI Rendering

```jsx
{
  user?.role === "Admin" && <div>Admin-only content</div>;
}

{
  (user?.role === "Admin" || user?.role === "Manager") && (
    <Link to="/users">Users</Link>
  );
}
```

### Using Hooks

```js
const { user, hasRole, hasAnyRole } = useAuth();

if (hasRole("Admin")) {
  // Admin-specific logic
}

if (hasAnyRole(["Admin", "Manager"])) {
  // Admin or Manager logic
}
```

## Token Flow

### Initial Load

1. Check `localStorage` for `accessToken`
2. If found, call `/api/auth/me` to get current user
3. If successful, set user and `isAuthenticated = true`
4. If fail, clear token and redirect to login

### Login

1. User submits credentials
2. Call `/api/auth/login`
3. Backend returns `{ user, accessToken }`
4. Store `accessToken` in `localStorage`
5. Set user state
6. Navigate to intended page or `/dashboard`

### Token Refresh

1. API request receives 401 response
2. Axios interceptor catches 401
3. If not already refreshing:
   - Call `/api/auth/refresh-token` (refresh token in cookie)
   - Backend returns new `accessToken`
   - Update `localStorage` and retry original request
4. If already refreshing, queue request
5. If refresh fails, logout and redirect to `/login`

### Logout

1. Call `/api/auth/logout` (clears httpOnly cookie on backend)
2. Clear `localStorage.accessToken`
3. Clear user state
4. Navigate to `/login`

## Environment Variables

Create a `.env` file (use `.env.example` as template):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Usage Example

```jsx
import { useAuth } from "./hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Security Considerations

1. **Access Token** - Short-lived, stored in `localStorage`
2. **Refresh Token** - Long-lived, httpOnly cookie (safer than localStorage, prevents XSS)
3. **HTTPS** - Always use HTTPS in production
4. **CORS** - Configure backend to only accept requests from your frontend domain
5. **withCredentials** - Set to `true` to send cookies with cross-origin requests

## Next Steps

1. Connect to actual backend API
2. Implement proper error handling UI
3. Add loading skeletons for better UX
4. Implement feature components (tasks, analytics, users)
5. Add form validation
6. Add tests for auth flows
