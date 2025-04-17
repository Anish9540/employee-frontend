import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm/AuthForm";
import NavbarLayout from "./components/Navbar/NavbarLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Score from "./components/Score/Score ";
import ProtectedRoute from "./components/Routes/ProtectedRoute"; // <- import

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />

        {/* Protected Routes with Navbar */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<NavbarLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="score" element={<Score />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
