import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DemoDashboard from "./components/DemoDashboard";
import LandingPage from "./components/LandingPage";
import PrivateDashboard from "./components/PrivateDashboard";
import { hasAuthToken } from "./api/jobsApi";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
          path="/app"
          element={
            hasAuthToken() ? <PrivateDashboard /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
