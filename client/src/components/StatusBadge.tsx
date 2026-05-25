import { statusColors } from "../constants/jobStatuses";
import type { JobStatus } from "../types";

interface StatusBadgeProps {
  status: JobStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`px-3 py-1 text-xs rounded-full ${statusColors[status]}`}>
      {status}
    </span>
  );
}
