import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { RequireAuth } from "./routes/RequireAuth";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";

import { QueryProvider } from "./providers/QueryProvider";
import { SocketProvider } from "./providers/SocketProvider";

// Lazy Load Pages
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then((module) => ({ default: module.LoginPage }))
);
const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  }))
);
const AnalyticsPage = lazy(() =>
  import("./pages/AnalyticsPage").then((module) => ({
    default: module.AnalyticsPage,
  }))
);
const UsersPage = lazy(() =>
  import("./pages/UsersPage").then((module) => ({ default: module.UsersPage }))
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <SocketProvider>
          <AuthProvider>
            <Router>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<LoginPage />} />

                  {/* Protected Routes */}
                  <Route
                    element={
                      <RequireAuth>
                        <MainLayout />
                      </RequireAuth>
                    }
                  >
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />

                    {/* Admin and Manager only */}
                    <Route
                      path="/users"
                      element={
                        <RequireAuth allowedRoles={["Admin", "Manager"]}>
                          <UsersPage />
                        </RequireAuth>
                      }
                    />
                  </Route>

                  {/* Default redirect */}
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </Suspense>
            </Router>
          </AuthProvider>
        </SocketProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
