import { useEffect, useState } from "react";
import DashboardStats from "./DashboardStats";
import JobCard from "./JobCard";
import JobForm from "./JobForm";
import { demoJobs } from "../data/demoJobs";
import type { JobApplication, JobStatus } from "../types";

const LOCAL_STORAGE_KEY = "job-tracker-demo-jobs";

type StatusFilter = "All" | JobStatus;

interface DemoDashboardProps {
  onBackToLanding: () => void;
}

export default function DemoDashboard({ onBackToLanding }: DemoDashboardProps) {
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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [currentJob, setCurrentJob] = useState<
    Omit<JobApplication, "id"> & { id?: string }
  >({
    company: "",
    position: "",
    status: "Interested",
    jobUrl: "",
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
    setCurrentJob({
      company: "",
      position: "",
      status: "Interested",
      jobUrl: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const visibleJobs =
    statusFilter === "All"
      ? jobs
      : jobs.filter((job) => job.status === statusFilter);

  return (
    <div className="min-h-screen px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#03fcf0]/25 bg-[#3a3f42] p-6 shadow-2xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#03fcf0]">
              Demo Mode
            </p>
            <h1 className="text-3xl font-bold text-white">Job Applications</h1>
            <p className="mt-2 text-sm text-gray-300">
              Track applications, interviews and outcomes in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onBackToLanding}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:border-[#03fcf0] hover:text-[#03fcf0]"
            >
              Back
            </button>

            <button
              onClick={resetDemo}
              className="rounded-full border border-[#03fcf0]/40 px-4 py-2 text-sm font-semibold text-[#03fcf0] transition-colors hover:bg-[#03fcf0] hover:text-[#2f3336]"
            >
              Reset Demo
            </button>
          </div>
        </div>

        <DashboardStats jobs={jobs} />

        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              "All",
              "Interested",
              "Applied",
              "Interview Scheduled",
              "Rejected",
              "Accepted",
            ] as StatusFilter[]
          ).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                statusFilter === status
                  ? "border-[#03fcf0] bg-[#03fcf0] text-[#2f3336]"
                  : "border-white/15 text-gray-300 hover:border-[#03fcf0] hover:text-[#03fcf0]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {visibleJobs.length > 0 ? (
          <div className="mb-8 space-y-3">
            {visibleJobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={editJob} />
            ))}
          </div>
        ) : (
          <div className="mb-8 rounded-2xl border border-dashed border-[#03fcf0]/35 bg-[#34393c] p-6 text-center">
            <p className="font-medium text-white">
              {jobs.length === 0
                ? "No job applications yet."
                : `No ${statusFilter.toLowerCase()} jobs found.`}
            </p>
            <p className="mt-1 text-sm text-gray-300">
              {jobs.length === 0
                ? "Add your first demo job to start tracking."
                : "Try another status filter or reset the demo."}
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
            className="rounded-full bg-[#03fcf0] px-5 py-2 font-semibold text-[#2f3336] transition-colors hover:bg-cyan-200"
          >
            Add New Job
          </button>
        )}
      </div>
    </div>
  );
}
