"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmployeeAvatar, EmployeeName } from "@/components/employee-avatar";

const skillGaps = [
  { id: "sg1", skill: "React / TypeScript",       count: 3, label: "engineers need training" },
  { id: "sg2", skill: "Cloud Architecture (AWS)", count: 2, label: "engineers need training" },
  { id: "sg3", skill: "AI/ML Fundamentals",       count: 5, label: "engineers need training" },
];

const learningProgress = [
  {
    id: "lp1",
    course: "Security Awareness Certification",
    completed: 8,
    total: 12,
    overdueCount: 2,
    overdue: true,
  },
  {
    id: "lp2",
    course: "React Advanced Patterns",
    completed: 4,
    total: 12,
    overdueCount: 0,
    overdue: false,
  },
  {
    id: "lp3",
    course: "Team Lead Foundations",
    completed: 2,
    total: 12,
    overdueCount: 0,
    overdue: false,
  },
];

const promotionCases = [
  {
    id: "pc1",
    name: "Priya Sharma",
    transition: "Senior → Staff Engineer",
    trackStatus: "On track" as const,
    milestone: "Next milestone: Q2 review",
    casePercent: null,
    missing: null,
    actionLabel: null,
  },
  {
    id: "pc2",
    name: "Marcus Lee",
    transition: "Engineer → Senior Engineer",
    trackStatus: "Ahead" as const,
    milestone: "Promo case 80% ready",
    casePercent: 80,
    missing: null,
    actionLabel: "Finish Case",
  },
  {
    id: "pc3",
    name: "Liam Brennan",
    transition: "Junior → Engineer",
    trackStatus: "At risk" as const,
    milestone: "Missing: 2 certifications",
    casePercent: null,
    missing: "2 certifications",
    actionLabel: null,
  },
];

const trackConfig = {
  "On track": { dot: "#00A275", text: "#065f46", bg: "#F0FDF4", border: "#A7F3D0" },
  "Ahead":    { dot: "#247BA0", text: "#247BA0", bg: "#eaf5f9", border: "#b3daea" },
  "At risk":  { dot: "#DA0000", text: "#991b1b", bg: "#FEF2F2", border: "#FECACA" },
};

export function MyTeamGrowth() {
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
            Assistant · Team Growth
          </span>
          <span className="text-[12.5px] text-[#4a6b7a] leading-snug">
            <strong>3 engineers</strong> are on track for promotion. Q2 certification deadline is in <strong>18 days</strong>.
          </span>
        </div>
      </div>

      {/* Section: Skill Gaps */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Skill Gaps
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span
          className="text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px]"
          style={{ background: "#fff8eb", color: "#a16600", borderColor: "#fdd38a" }}
        >
          3 areas
        </span>
      </div>

      <div
        className="rounded-[16px] border overflow-hidden"
        style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
      >
        {skillGaps.map(({ id, skill, count, label }, idx) => {
          const isLast = idx === skillGaps.length - 1;
          return (
            <div
              key={id}
              className="flex items-center justify-between gap-3 px-4 py-3"
              style={{ borderBottom: isLast ? "none" : "1px solid #f5f5f5" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "#c97f00" }}
                />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[12.5px] font-semibold text-[#171717] truncate">{skill}</span>
                  <span className="text-[11px] text-[#6b7280]">
                    <strong>{count}</strong> {label}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border shrink-0 transition-opacity hover:opacity-85"
                style={{ background: "#247BA0", color: "#fff", borderColor: "#247BA0" }}
              >
                Assign Course
              </Button>
            </div>
          );
        })}
      </div>

      {/* Section: Learning Progress */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Learning Progress
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
      </div>

      <div className="flex flex-col gap-2">
        {learningProgress.map(({ id, course, completed, total, overdueCount, overdue }) => {
          const pct = Math.round((completed / total) * 100);
          return (
            <div
              key={id}
              className="rounded-[16px] border px-4 py-3.5"
              style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[12.5px] font-semibold text-[#171717] leading-tight">{course}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {overdue && overdueCount > 0 && (
                    <span
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-[6px] border"
                      style={{ background: "#FEF2F2", color: "#991b1b", borderColor: "#FECACA" }}
                    >
                      {overdueCount} overdue
                    </span>
                  )}
                  <span className="text-[11px] text-[#6b7280] tabular-nums">
                    {completed}/{total}
                  </span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-[6px] rounded-full bg-[#f0f0f0] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: overdue && overdueCount > 0 ? "#c97f00" : "#247BA0",
                    }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-[#6b7280] tabular-nums shrink-0 w-[32px] text-right">
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section: Promotion Tracker */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Promotion Tracker
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span
          className="text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px]"
          style={{ background: "#eaf5f9", color: "#247BA0", borderColor: "#b3daea" }}
        >
          3 active cases
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {promotionCases.map(({ id, name, transition, trackStatus, milestone, actionLabel }) => {
          const cfg = trackConfig[trackStatus];
          return (
            <div
              key={id}
              className="rounded-[16px] border px-4 py-3.5 flex items-start justify-between gap-3"
              style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
            >
              <div className="flex items-start gap-3 min-w-0 group">
                <EmployeeAvatar name={name} size="md" />
                <div className="flex flex-col gap-1 min-w-0">
                  <EmployeeName name={name} className="text-[12.5px] font-semibold text-[#171717]" />
                  <span className="text-[11px] text-[#6b7280]">{transition}</span>
                  <span className="text-[11.5px] text-[#555] mt-0.5">{milestone}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-[6px] border"
                  style={{ background: cfg.bg, borderColor: cfg.border }}
                >
                  <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: cfg.dot }} />
                  <span className="text-[9px] font-semibold" style={{ color: cfg.text }}>
                    {trackStatus}
                  </span>
                </div>
                {actionLabel && (
                  <Button
                    size="sm"
                    className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border transition-opacity hover:opacity-85"
                    style={{ background: "#247BA0", color: "#fff", borderColor: "#247BA0" }}
                  >
                    {actionLabel}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
