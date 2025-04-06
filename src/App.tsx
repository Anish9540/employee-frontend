import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Layout from "./components/common/Layout";
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";
import ScorecardPage from "./components/pages/ScorecardPage";
import ManagerDashboard from "./components/pages/ManagerDashboard";
import EmployeeDetailsPage from "./components/pages/ErrorPage";
import ErrorPage from "./components/pages/ErrorPage";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Navigate to="/login" replace /> },
        { path: "login", element: <LoginPage /> },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "scorecard",
          element: (
            <ProtectedRoute>
              <ScorecardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "manager",
          element: (
            <ProtectedRoute requireManager={true}>
              <ManagerDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "employee/:id",
          element: (
            <ProtectedRoute requireManager={true}>
              <EmployeeDetailsPage />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

const App: React.FC = () => {
  const router = createAppRouter();

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
