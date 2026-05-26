import { useState } from "react";
import DemoDashboard from "./components/DemoDashboard";
import LandingPage from "./components/LandingPage";

type AppView = "landing" | "demo";

export default function App() {
  const [view, setView] = useState<AppView>("landing");

  if (view === "demo") {
    return <DemoDashboard onBackToLanding={() => setView("landing")} />;
  }

  return <LandingPage onViewDemo={() => setView("demo")} />;
}
