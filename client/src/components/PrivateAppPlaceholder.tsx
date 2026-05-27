import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export default function PrivateAppPlaceholder() {
  const [apiStatus, setApiStatus] = useState("Checking API...");

  useEffect(() => {
    async function checkApi() {
      try {
        const response = await fetch(`${API_URL}/health`);

        if (!response.ok) {
          setApiStatus("API responded with an error.");
          return;
        }

        const data = await response.json();
        setApiStatus(`API status: ${data.status}`);
      } catch {
        setApiStatus("API is not reachable.");
      }
    }

    checkApi();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#03fcf0]/25 bg-[#3a3f42] p-8 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#03fcf0]">
          Private
        </p>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Private tracker placeholder
        </h1>

        <p className="mt-4 text-gray-300">{apiStatus}</p>
      </div>
    </div>
  );
}
