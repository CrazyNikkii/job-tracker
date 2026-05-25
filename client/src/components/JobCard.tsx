import StatusBadge from "./StatusBadge";
import type { JobApplication } from "../types";

interface JobCardProps {
  job: JobApplication;
  onClick: (job: JobApplication) => void;
}

export default function JobCard({ job, onClick }: JobCardProps) {
  return (
    <div
      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(job)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{job.company}</h3>
          <p className="text-gray-600 text-sm">{job.position}</p>
        </div>

        <StatusBadge status={job.status} />
      </div>
    </div>
  );
}
