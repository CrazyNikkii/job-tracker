import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createJob, deleteJob, getJobs, updateJob } from "../api/jobsApi";
import type { JobApplication, JobStatus } from "../types";
import DashboardStats from "./DashboardStats";
import JobCard from "./JobCard";
import JobForm from "./JobForm";

type StatusFilter = "All" | JobStatus;

export default function PrivateDashboard() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError("");

      const loadedJobs = await getJobs();
      setJobs(loadedJobs);
    } catch {
      setError("Could not load jobs from the backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveJob = async () => {
    if (!currentJob.company.trim()) return;

    try {
      setError("");

      if (editingId) {
        const updatedJob = await updateJob(editingId, {
          company: currentJob.company,
          position: currentJob.position,
          status: currentJob.status,
          jobUrl: currentJob.jobUrl,
        });

        setJobs(jobs.map((job) => (job.id === editingId ? updatedJob : job)));
      } else {
        const newJob = await createJob({
          company: currentJob.company,
          position: currentJob.position,
          status: currentJob.status,
          jobUrl: currentJob.jobUrl,
        });

        setJobs([...jobs, newJob]);
      }

      resetForm();
    } catch {
      setError("Could not save job.");
    }
  };

  const editJob = (job: JobApplication) => {
    setCurrentJob(job);
    setEditingId(job.id);
    setShowForm(true);
  };

  const deleteSelectedJob = async () => {
    if (!editingId) return;

    try {
      setError("");

      await deleteJob(editingId);
      setJobs(jobs.filter((job) => job.id !== editingId));
      resetForm();
    } catch {
      setError("Could not delete job.");
    }
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
              Private Mode
            </p>
            <h1 className="text-3xl font-bold text-white">Job Applications</h1>
            <p className="mt-2 text-sm text-gray-300">
              Track applications, interviews and outcomes in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:border-[#03fcf0] hover:text-[#03fcf0]"
            >
              Back
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/40 bg-red-950/30 p-4">
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

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

        {isLoading ? (
          <div className="mb-8 rounded-2xl border border-[#03fcf0]/25 bg-[#34393c] p-6 text-center">
            <p className="text-gray-300">Loading jobs...</p>
          </div>
        ) : visibleJobs.length > 0 ? (
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
                ? "Add your first job to start tracking."
                : "Try another status filter."}
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
            onDelete={deleteSelectedJob}
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
