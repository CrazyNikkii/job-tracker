import { useState } from "react";
import StatusBadge from "./components/StatusBadge";
import { statusOptions } from "./constants/jobStatuses";
import { demoJobs } from "./data/demoJobs";
import type { JobApplication, JobStatus } from "./types";

export default function App() {
  const [jobs, setJobs] = useState<JobApplication[]>(demoJobs);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentJob, setCurrentJob] = useState<
    Omit<JobApplication, "id"> & { id?: string }
  >({
    company: "",
    position: "",
    status: "Interested",
  });

  const saveJob = () => {
    if (!currentJob.company.trim()) return;

    if (editingId) {
      setJobs(
        jobs.map((job) =>
          job.id === editingId ? { ...currentJob, id: editingId } : job,
        ),
      );
    } else {
      setJobs([...jobs, { ...currentJob, id: Date.now().toString() }]);
    }

    resetForm();
  };

  const editJob = (job: JobApplication) => {
    setCurrentJob(job);
    setEditingId(job.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setCurrentJob({ company: "", position: "", status: "Interested" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Job Applications</h1>

      <div className="space-y-3 mb-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => editJob(job)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{job.company}</h3>
                <p className="text-gray-600 text-sm">{job.position}</p>
              </div>
              <StatusBadge status={job.status} />
            </div>
          </div>
        ))}
      </div>

      {showForm ? (
        <div className="p-4 border rounded-lg space-y-3 bg-white shadow-md">
          <h2 className="font-medium mb-2">
            {editingId ? "Edit Application" : "Add New Application"}
          </h2>

          <input
            value={currentJob.company}
            onChange={(e) =>
              setCurrentJob({ ...currentJob, company: e.target.value })
            }
            placeholder="Company name"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <input
            value={currentJob.position}
            onChange={(e) =>
              setCurrentJob({ ...currentJob, position: e.target.value })
            }
            placeholder="Position"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <select
            value={currentJob.status}
            onChange={(e) =>
              setCurrentJob({
                ...currentJob,
                status: e.target.value as JobStatus,
              })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="flex space-x-2 pt-2">
            <button
              onClick={saveJob}
              disabled={!currentJob.company.trim()}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
            >
              {editingId ? "Update" : "Save"}
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setJobs(jobs.filter((job) => job.id !== editingId));
                  resetForm();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add New Job
        </button>
      )}
    </div>
  );
}
