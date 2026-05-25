import type { JobApplication } from "../types";

interface DashboardStatsProps {
  jobs: JobApplication[];
}

export default function DashboardStats({ jobs }: DashboardStatsProps) {
  const total = jobs.length;
  const applied = jobs.filter((job) => job.status === "Applied").length;
  const interviews = jobs.filter(
    (job) => job.status === "Interview Scheduled",
  ).length;
  const accepted = jobs.filter((job) => job.status === "Accepted").length;

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="rounded-2xl border border-white/15 bg-[#34393c] p-4">
        <p className="text-sm text-gray-300">Total</p>
        <p className="text-3xl font-bold text-white">{total}</p>
      </div>

      <div className="rounded-2xl border border-white/15 bg-[#34393c] p-4">
        <p className="text-sm text-gray-300">Applied</p>
        <p className="text-3xl font-bold text-white">{applied}</p>
      </div>

      <div className="rounded-2xl border border-white/15 bg-[#34393c] p-4">
        <p className="text-sm text-gray-300">Interviews</p>
        <p className="text-3xl font-bold text-white">{interviews}</p>
      </div>

      <div className="rounded-2xl border border-white/15 bg-[#34393c] p-4">
        <p className="text-sm text-gray-300">Accepted</p>
        <p className="text-3xl font-bold text-[#03fcf0]">{accepted}</p>
      </div>
    </div>
  );
}
