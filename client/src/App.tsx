import { useState } from "react";
import DemoDashboard from "./components/DemoDashboard";

type AppView = "landing" | "demo";

export default function App() {
  const [view, setView] = useState<AppView>("landing");

  if (view === "demo") {
    return <DemoDashboard />;
  }

  return (
    <div className="min-h-screen px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center">
        <div className="w-full rounded-3xl border border-[#03fcf0]/25 bg-[#3a3f42] p-8 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#03fcf0]">
            Job Tracker
          </p>

          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Track your job applications.
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-300">
              A simple application tracker for saving job posts, following
              statuses, and keeping the job search organized.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setView("demo")}
              className="rounded-full bg-[#03fcf0] px-6 py-3 font-semibold text-[#2f3336] transition-colors hover:bg-cyan-200"
            >
              View Demo
            </button>

            <button
              disabled
              className="cursor-not-allowed rounded-full border border-white/15 px-6 py-3 font-semibold text-gray-400"
            >
              Sign In Coming Later
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-[#34393c] p-4">
              <h2 className="font-semibold text-white">Demo mode</h2>
              <p className="mt-2 text-sm text-gray-300">
                Recruiters can try the app instantly without creating an
                account.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-[#34393c] p-4">
              <h2 className="font-semibold text-white">Private mode</h2>
              <p className="mt-2 text-sm text-gray-300">
                Real job applications will later be protected behind a private
                sign-in.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-[#34393c] p-4">
              <h2 className="font-semibold text-white">Stay on track</h2>
              <p className="mt-2 text-sm text-gray-300">
                Track company, role, status and job posting links in one clean
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
