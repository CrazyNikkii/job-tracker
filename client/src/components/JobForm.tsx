import { statusOptions } from "../constants/jobStatuses";
import type { JobApplication, JobStatus } from "../types";

type EditableJob = Omit<JobApplication, "id"> & { id?: string };

interface JobFormProps {
  currentJob: EditableJob;
  editingId: string | null;
  onChange: (job: EditableJob) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export default function JobForm({
  currentJob,
  editingId,
  onChange,
  onSave,
  onCancel,
  onDelete,
}: JobFormProps) {
  const inputClassName =
    "w-full rounded-xl border border-white/15 bg-[#2f3336] p-3 text-white placeholder:text-gray-400 outline-none transition-colors focus:border-[#03fcf0] focus:ring-2 focus:ring-[#03fcf0]/20";

  return (
    <div className="rounded-2xl border border-white/15 bg-[#34393c] p-5 shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-white">
        {editingId ? "Edit Application" : "Add New Application"}
      </h2>

      <div className="space-y-3">
        <input
          value={currentJob.company}
          onChange={(e) => onChange({ ...currentJob, company: e.target.value })}
          placeholder="Company name"
          className={inputClassName}
          required
        />

        <input
          value={currentJob.position}
          onChange={(e) =>
            onChange({ ...currentJob, position: e.target.value })
          }
          placeholder="Position"
          className={inputClassName}
        />

        <select
          value={currentJob.status}
          onChange={(e) =>
            onChange({
              ...currentJob,
              status: e.target.value as JobStatus,
            })
          }
          className={inputClassName}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option} className="bg-[#2f3336]">
              {option}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={onSave}
            disabled={!currentJob.company.trim()}
            className="rounded-full bg-[#03fcf0] px-5 py-2 font-semibold text-slate-950 transition-colors hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {editingId ? "Update" : "Save"}
          </button>

          <button
            onClick={onCancel}
            className="rounded-full bg-slate-700 px-5 py-2 font-semibold text-white transition-colors hover:bg-slate-600"
          >
            Cancel
          </button>

          {editingId && (
            <button
              onClick={onDelete}
              className="rounded-full bg-red-500 px-5 py-2 font-semibold text-white transition-colors hover:bg-red-400"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
