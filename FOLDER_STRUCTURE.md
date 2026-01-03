# Frontend Folder Structure

## Overview

This document explains the purpose of each folder in the `src/` directory.

## Directory Structure

```
src/
├── api/                # Axios instances & API wrappers
├── auth/               # Auth logic (tokens, refresh)
├── components/         # Reusable UI components
├── features/
│   ├── auth/
│   ├── tasks/
│   ├── analytics/
│   └── users/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── store/              # Zustand stores
├── sockets/
├── utils/
├── validations/
├── tests/
├── App.jsx
└── main.jsx
```

## Folder Descriptions

### `/api`

**Purpose**: Contains Axios instance configuration and API service wrappers.

- Centralized HTTP client setup
- Request/response interceptors for auth tokens
- API endpoint definitions

### `/auth`

**Purpose**: Authentication logic and providers.

- Token management (access & refresh tokens)
- Auth context provider
- Login/logout logic
- Token refresh mechanisms

### `/components`

**Purpose**: Reusable UI components shared across the application.

- Buttons, inputs, modals, cards, etc.
- Presentational components without business logic
- Promotes DRY (Don't Repeat Yourself) principles

### `/features`

**Purpose**: Feature-based module organization following domain-driven design.

#### `/features/auth`

- Login/Register components
- Password reset flows
- Auth-specific UI elements

#### `/features/tasks`

- Task list, detail, create/edit components
- Task-specific business logic

#### `/features/analytics`

- Dashboard components
- Charts and statistics
- Analytics-specific utilities

#### `/features/users`

- User management (Admin/Manager only)
- User list, profile components

### `/hooks`

**Purpose**: Custom React hooks for shared logic.

- `useAuth` - Access authentication state
- `usePermissions` - Role-based permission checks
- `useApi` - API calling utilities
- Other reusable hooks

### `/layouts`

**Purpose**: Layout components that wrap pages.

- Main app layout with sidebar/navbar
- Auth layout (for login/register pages)
- Dashboard layout
- Responsive layout handlers

### `/pages`

**Purpose**: Page-level components mapped to routes.

- Each file represents a distinct route/page
- Composes features and components
- Examples: `LoginPage.jsx`, `DashboardPage.jsx`, `TasksPage.jsx`

### `/routes`

**Purpose**: Routing configuration and route guards.

- Route definitions
- `RequireAuth` component for protected routes
- Role-based route guards
- Navigation structure

### `/store`

**Purpose**: Zustand state management stores.

- Global application state
- User state, UI state, etc.
- Alternative to Redux with simpler API

### `/sockets`

**Purpose**: WebSocket/Socket.io configuration and handlers.

- Real-time communication setup
- Socket event listeners
- Connection management

### `/utils`

**Purpose**: Utility functions and helpers.

- Date formatting
- String manipulation
- Constants
- Helper functions

### `/validations`

**Purpose**: Form validation schemas and rules.

- Input validation logic
- Form schema definitions (e.g., Yup, Zod)
- Validation error messages

### `/tests`

**Purpose**: Unit and integration tests.

- Component tests
- Hook tests
- Integration tests
- Test utilities and mocks

## Benefits of This Structure

1. **Scalability**: Easy to add new features without cluttering existing code
2. **Maintainability**: Clear separation of concerns
3. **Discoverability**: Intuitive naming makes it easy to find code
4. **Reusability**: Components and hooks can be shared across features
5. **Team Collaboration**: Multiple developers can work on different features without conflicts
