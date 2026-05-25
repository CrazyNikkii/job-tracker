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
  return (
    <div className="p-4 border rounded-lg space-y-3 bg-white shadow-md">
      <h2 className="font-medium mb-2">
        {editingId ? "Edit Application" : "Add New Application"}
      </h2>

      <input
        value={currentJob.company}
        onChange={(e) => onChange({ ...currentJob, company: e.target.value })}
        placeholder="Company name"
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />

      <input
        value={currentJob.position}
        onChange={(e) => onChange({ ...currentJob, position: e.target.value })}
        placeholder="Position"
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <select
        value={currentJob.status}
        onChange={(e) =>
          onChange({
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
          onClick={onSave}
          disabled={!currentJob.company.trim()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
        >
          {editingId ? "Update" : "Save"}
        </button>

        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>

        {editingId && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
