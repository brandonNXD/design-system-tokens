"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmployeeAvatar, EmployeeName } from "@/components/employee-avatar";

const teamMembers = [
  { name: "Theo Nakamura",   role: "Product Designer",   capacity: 100, status: "overloaded" as const },
  { name: "Anna Lindqvist",  role: "Senior Engineer",    capacity: 78,  status: "watch" as const },
  { name: "Marcus Lee",      role: "Data Engineer",      capacity: 62,  status: "healthy" as const },
  { name: "Priya Sharma",    role: "Frontend Engineer",  capacity: 75,  status: "healthy" as const },
  { name: "Jonas Eriksson",  role: "Backend Engineer",   capacity: 95,  status: "overloaded" as const },
  { name: "Camille Dupont",  role: "ML Engineer",        capacity: 60,  status: "healthy" as const },
  { name: "Liam Brennan",    role: "DevOps",             capacity: 71,  status: "healthy" as const },
  { name: "Sofia Andersen",  role: "QA Engineer",        capacity: 48,  status: "healthy" as const },
];

const statusConfig = {
  overloaded: { label: "Overloaded", dot: "#DA0000", text: "#991b1b", bg: "#FEF2F2", border: "#FECACA", bar: "#da0000" },
  watch:      { label: "Watch",      dot: "#c97f00", text: "#a16600", bg: "#fff8eb", border: "#fdd38a", bar: "#c97f00" },
  healthy:    { label: "Healthy",    dot: "#00A275", text: "#065f46", bg: "#F0FDF4", border: "#A7F3D0", bar: "#00a275" },
};

const wellbeingFlags = [
  {
    id: "wb1",
    name: "Theo Nakamura",
    signals: ["Late-night commits 4 nights this week", "No vacation in 90+ days"],
    severity: "High" as const,
  },
  {
    id: "wb2",
    name: "Jonas Eriksson",
    signals: ["Utilization >90% for 3 consecutive weeks"],
    severity: "Medium" as const,
  },
];

const checkinNeeded = [
  { id: "ci1", name: "Theo Nakamura",  lastCheckin: "23 days ago" },
  { id: "ci2", name: "Priya Sharma",   lastCheckin: "18 days ago" },
];

const severityConfig = {
  High:   { bg: "#FEF2F2", text: "#991b1b", border: "#FECACA", dot: "#DA0000" },
  Medium: { bg: "#fff8eb", text: "#a16600", border: "#fdd38a", dot: "#c97f00" },
};

export function MyTeamHealth() {
  return (
    <div className="flex flex-col gap-5 max-w-[720px] mx-auto px-6 py-8">

      {/* Assistant bar */}
      <div
        className="flex items-start gap-3 px-4 py-3.5 rounded-[14px] border"
        style={{ background: "#f6fbfd", borderColor: "#b3daea" }}
      >
        <span
          className="mt-[3px] w-2 h-2 rounded-full shrink-0 animate-pulse"
          style={{ background: "#247BA0" }}
        />
        <div className="flex flex-col gap-1">
          <span className="text-[12.5px] font-semibold text-[#247BA0]">
            Assistant · Team Health
          </span>
          <span className="text-[12.5px] text-[#4a6b7a] leading-snug">
            <strong>2 risk signals</strong> this week. Theo is at 100% capacity and hasn&apos;t had a 1:1 in 23 days.
          </span>
        </div>
      </div>

      {/* Section: Capacity Heatmap */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Capacity Heatmap
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span
          className="text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px]"
          style={{ background: "#FEF2F2", color: "#991b1b", borderColor: "#FECACA" }}
        >
          2 overloaded
        </span>
      </div>

      <div
        className="rounded-[16px] border overflow-hidden"
        style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
      >
        {/* Table header */}
        <div
          className="grid gap-3 px-4 py-2.5 border-b"
          style={{
            gridTemplateColumns: "1fr 140px 142px 140px",
            background: "#fafafa",
            borderColor: "#f0f0f0",
          }}
        >
          <span className="text-[9.5px] font-bold text-[#6b7280] tracking-[0.1em] uppercase">Name</span>
          <span className="text-[9.5px] font-bold text-[#6b7280] tracking-[0.1em] uppercase">Role</span>
          <span className="text-[9.5px] font-bold text-[#6b7280] tracking-[0.1em] uppercase">Capacity</span>
          <span className="text-[9.5px] font-bold text-[#6b7280] tracking-[0.1em] uppercase">Status</span>
        </div>

        {teamMembers.map(({ name, role, capacity, status }, idx) => {
          const cfg = statusConfig[status];
          const isLast = idx === teamMembers.length - 1;
          return (
            <div
              key={name}
              className="grid gap-3 px-4 py-3 items-center"
              style={{
                gridTemplateColumns: "1fr 140px 142px 140px",
                borderBottom: isLast ? "none" : "1px solid #f5f5f5",
                background: status === "overloaded" ? "#fffcfc" : "#ffffff",
              }}
            >
              {/* Name column — avatar + name both trigger drawer; group ties hover together */}
              <div className="flex items-center gap-2 min-w-0 group">
                <EmployeeAvatar name={name} size="sm" />
                <EmployeeName name={name} className="text-[12px] font-medium text-[#171717] truncate" />
              </div>

              <span className="text-[11.5px] text-[#555] truncate">{role}</span>

              {/* Capacity bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-[6px] rounded-full bg-[#f0f0f0] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${capacity}%`, background: cfg.bar }}
                  />
                </div>
                <span className="text-[10.5px] font-semibold tabular-nums shrink-0" style={{ color: cfg.text }}>
                  {capacity}%
                </span>
              </div>

              {/* Status badge + Act button */}
              <div className="flex items-center gap-1.5">
                <div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-[6px] border"
                  style={{ background: cfg.bg, borderColor: cfg.border }}
                >
                  <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: cfg.dot }} />
                  <span className="text-[9px] font-semibold" style={{ color: cfg.text }}>
                    {cfg.label}
                  </span>
                </div>
                {status === "overloaded" && (
                  <button
                    className="text-[9px] font-semibold px-1.5 py-0.5 rounded-[5px] border transition-colors hover:bg-[#eaf5f9] cursor-pointer"
                    style={{ color: "#247BA0", borderColor: "#b3daea" }}
                  >
                    Act
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Section: Wellbeing Signals */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Wellbeing Signals
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span
          className="text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px]"
          style={{ background: "#FEF2F2", color: "#991b1b", borderColor: "#FECACA" }}
        >
          2 flagged
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {wellbeingFlags.map(({ id, name, signals, severity }) => {
          const cfg = severityConfig[severity];
          return (
            <div
              key={id}
              className="rounded-[16px] border px-4 py-3.5"
              style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2 group">
                    <EmployeeAvatar name={name} size="sm" />
                    <EmployeeName name={name} className="text-[12.5px] font-semibold text-[#171717]" />
                  </div>
                  <div className="flex flex-col gap-0.5 pl-8">
                    {signals.map((s, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: cfg.dot }} />
                        <span className="text-[11.5px] text-[#555]">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-[6px] border shrink-0"
                  style={{ background: cfg.bg, borderColor: cfg.border }}
                >
                  <span className="w-[5px] h-[5px] rounded-full" style={{ background: cfg.dot }} />
                  <span className="text-[9px] font-semibold" style={{ color: cfg.text }}>
                    {severity}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section: Check-in Cadence */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Check-in Cadence
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span className="text-[10px] text-[#6b7280]">1:1 overdue</span>
      </div>

      <div className="flex flex-col gap-2">
        {checkinNeeded.map(({ id, name, lastCheckin }) => (
          <div
            key={id}
            className="rounded-[16px] border px-4 py-3 flex items-center justify-between gap-3"
            style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
          >
            <div className="flex items-center gap-2.5 min-w-0 group">
              <EmployeeAvatar name={name} size="md" />
              <div className="flex flex-col gap-0.5 min-w-0">
                <EmployeeName name={name} className="text-[12.5px] font-semibold text-[#171717]" />
                <span className="text-[11px] text-[#6b7280]">Last 1:1: {lastCheckin}</span>
              </div>
            </div>
            <Button
              size="sm"
              className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border shrink-0 transition-opacity hover:opacity-85"
              style={{ background: "#247BA0", color: "#fff", borderColor: "#247BA0" }}
            >
              Schedule
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
