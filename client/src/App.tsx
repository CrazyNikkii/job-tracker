export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Job Application Tracker</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to your dashboard
          </h2>
          <p className="text-gray-600">
            Start tracking your job applications with this simple tool.
          </p>
        </div>
      </main>
    </div>
  );
}
