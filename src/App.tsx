// // src/App.tsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AuthForm from "./components/AuthForm";
// import NavbarLayout from "./components/NavbarLayout";
// import Dashboard from "./components/Dashboard";
// import Profile from "./components/Profile";
// import Score from "./components/Score ";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<AuthForm />} />

//         {/* Protected layout with navbar */}
//         <Route path="/dashboard" element={<NavbarLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="score" element={<Score />} />
//         </Route>

//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import NavbarLayout from "./components/NavbarLayout";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Score from "./components/Score ";
import ProtectedRoute from "./components/ProtectedRoute"; // <- import

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
