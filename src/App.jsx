import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/Routes";
import Header from "./Layout/Header";
import Aside from "./Layout/Aside";
import ProtectedRoute from "./helper/ProtectedRoute"; // Import Protected Route

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Header />} {/* Hide Header on login page */}

      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* Private Routes (Wrapped in Protected Route) */}
        <Route element={<ProtectedRoute />}>
          {privateRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Catch-All Route for 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {!isLoginPage && <Aside />} {/* Hide Sidebar on login page */}
    </>
  );
}

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
