import { useState } from "react";
import JobCard from "./components/JobCard";
import JobForm from "./components/JobForm";
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

  const deleteJob = () => {
    if (!editingId) return;

    setJobs(jobs.filter((job) => job.id !== editingId));
    resetForm();
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
          <JobCard key={job.id} job={job} onClick={editJob} />
        ))}
      </div>

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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add New Job
        </button>
      )}
    </div>
  );
}
