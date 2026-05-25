import { useEffect, useState } from "react";
import DashboardStats from "./components/DashboardStats";
import JobCard from "./components/JobCard";
import JobForm from "./components/JobForm";
import { demoJobs } from "./data/demoJobs";
import type { JobApplication } from "./types";

const LOCAL_STORAGE_KEY = "job-tracker-demo-jobs";

export default function App() {
  const [jobs, setJobs] = useState<JobApplication[]>(() => {
    const savedJobs = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedJobs) {
      return demoJobs;
    }

    try {
      return JSON.parse(savedJobs) as JobApplication[];
    } catch {
      return demoJobs;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentJob, setCurrentJob] = useState<
    Omit<JobApplication, "id"> & { id?: string }
  >({
    company: "",
    position: "",
    status: "Interested",
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

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

  const deleteJob = () => {
    if (!editingId) return;

    setJobs(jobs.filter((job) => job.id !== editingId));
    resetForm();
  };

  const resetDemo = () => {
    setJobs(demoJobs);
    resetForm();
  };

  const resetForm = () => {
    setCurrentJob({ company: "", position: "", status: "Interested" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#03fcf0]/25 bg-[#3a3f42] p-6 shadow-2xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#03fcf0]">
              Demo Mode
            </p>
            <h1 className="text-3xl font-bold text-white">Job Applications</h1>
            <p className="mt-2 text-sm text-slate-300">
              Track applications, interviews and outcomes in one place.
            </p>
          </div>

          <button
            onClick={resetDemo}
            className="rounded-full border border-[#03fcf0]/40 px-4 py-2 text-sm font-semibold text-[#03fcf0] transition-colors hover:bg-[#03fcf0] hover:text-slate-950"
          >
            Reset Demo
          </button>
        </div>
        <DashboardStats jobs={jobs} />

        {jobs.length > 0 ? (
          <div className="mb-8 space-y-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={editJob} />
            ))}
          </div>
        ) : (
          <div className="mb-8 rounded-2xl border border-dashed border-slate-600 bg-slate-950/60 p-6 text-center">
            <p className="font-medium text-white">No job applications yet.</p>
            <p className="mt-1 text-sm text-slate-400">
              Add your first demo job to start tracking.
            </p>
          </div>
        )}

        {showForm ? (
          <JobForm
            currentJob={currentJob}
            editingId={editingId}
            onChange={setCurrentJob}
            onSave={saveJob}
            onCancel={resetForm}
            onDelete={deleteJob}
          />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="rounded-full bg-[#03fcf0] px-5 py-2 font-semibold text-slate-950 transition-colors hover:bg-cyan-200"
          >
            Add New Job
          </button>
        )}
      </div>
    </div>
  );
}
