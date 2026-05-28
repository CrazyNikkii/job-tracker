import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { hasAuthToken } from "./api/jobsApi";
import DemoDashboard from "./components/DemoDashboard";
import LandingPage from "./components/LandingPage";
import PrivateDashboard from "./components/PrivateDashboard";

function ProtectedPrivateRoute() {
  if (!hasAuthToken()) {
    return <Navigate to="/" replace />;
  }

  return <PrivateDashboard />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoDashboard />} />
        <Route path="/app" element={<ProtectedPrivateRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
