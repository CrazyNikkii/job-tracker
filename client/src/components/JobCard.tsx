import StatusBadge from "./StatusBadge";
import type { JobApplication } from "../types";

interface JobCardProps {
  job: JobApplication;
  onClick: (job: JobApplication) => void;
}

export default function JobCard({ job, onClick }: JobCardProps) {
  return (
    <div
      className="cursor-pointer rounded-2xl border border-white/15 bg-[#34393c] p-4 shadow-sm transition-colors hover:border-[#03fcf0]/50"
      onClick={() => onClick(job)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium text-white">{job.company}</h3>
          <p className="mt-1 text-sm text-gray-300">{job.position}</p>

          {job.jobUrl && (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="mt-2 inline-block text-sm font-medium text-[#03fcf0] hover:underline"
            >
              View posting
            </a>
          )}
        </div>

        <StatusBadge status={job.status} />
      </div>
    </div>
  );
}
