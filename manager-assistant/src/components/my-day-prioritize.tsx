"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { categoryColor } from "@/lib/category-colors";
import { EmployeeAvatar, EmployeeName } from "@/components/employee-avatar";

interface MyDayPrioritizeProps {
  onAction?: (intent: string) => void;
}

const mustDos = [
  {
    id: "dl02",
    priority: "action" as const,
    text: "Dorthe Hansen's start date change needs your approval",
    badge: "Workflow",
    buttonLabel: "Review Changes",
    intent: "DL-02",
  },
  {
    id: "re03",
    priority: "pending" as const,
    text: "Compliance training overdue: 2 team members haven't completed Security Awareness",
    badge: "Team Health",
    buttonLabel: "Send Reminder",
    intent: null,
  },
  {
    id: "mo03",
    priority: "pending" as const,
    text: "Sprint planning conflict: Theo and Marcus both at 100% next week",
    badge: "Team Health",
    buttonLabel: "Review Capacity",
    intent: null,
  },
];

const approvals = [
  {
    id: "ap1",
    name: "Theo Nakamura",
    type: "Vacation Request",
    detail: "April 14–18",
  },
  {
    id: "ap2",
    name: "Anna Lindqvist",
    type: "Equipment Request",
    detail: "MacBook Pro M4",
  },
];

const carriedOver = [
  {
    id: "co1",
    text: "Draft Q2 performance review framework",
    buttonLabel: "Start Now",
  },
  {
    id: "co2",
    text: "Follow up with HR on Dorthe's contract",
    buttonLabel: "Mark Done",
  },
];

const priorityConfig = {
  action: { dot: "#DA0000", bg: "#FEF2F2", text: "#991b1b", border: "#FECACA", label: "Action" },
  pending: { dot: "#c97f00", bg: "#fff8eb", text: "#a16600", border: "#fdd38a", label: "Pending" },
};

export function MyDayPrioritize({ onAction }: MyDayPrioritizeProps) {
  return (
    <div className="flex flex-col gap-5 max-w-[720px] mx-auto px-6 py-8">

      {/* Assistant greeting bar */}
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
            Assistant · Good morning, Sarah
          </span>
          <span className="text-[12.5px] text-[#4a6b7a] leading-snug">
            You have <strong>3 must-dos</strong> today and <strong>2 pending approvals</strong>.
            I&apos;ve checked your systems and flagged what needs your attention.
          </span>
        </div>
      </div>

      {/* Section: Must-Dos Today */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Must-Dos Today
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span
          className="text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px]"
          style={{ background: "#f0f9ff", color: "#247BA0", borderColor: "#b3daea" }}
        >
          3 items
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {mustDos.map(({ id, priority, text, badge, buttonLabel, intent }) => {
          const cfg = priorityConfig[priority];
          const cat = categoryColor(badge);
          return (
            <div
              key={id}
              className="rounded-[16px] border transition-shadow hover:shadow-sm"
              style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
            >
              <div className="flex items-start justify-between px-4 pt-4 pb-3 gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  {/* Priority dot indicator */}
                  <div className="mt-[3px] flex items-center gap-1.5 shrink-0">
                    <span
                      className="w-[7px] h-[7px] rounded-full shrink-0"
                      style={{ background: cfg.dot }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <span className="text-[13px] font-medium text-[#171717] leading-snug">{text}</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[9px] font-bold tracking-[0.08em] uppercase px-1.5 py-0.5 rounded-[4px] border"
                        style={{ background: cat.bg, color: cat.text, borderColor: cat.border }}
                      >
                        {badge}
                      </span>
                      <span
                        className="text-[9.5px] font-semibold px-2 py-0.5 rounded-[6px] border"
                        style={{ background: cfg.bg, color: cfg.text, borderColor: cfg.border }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => intent && onAction?.(intent)}
                  className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border shrink-0 transition-opacity hover:opacity-85"
                  style={
                    priority === "action"
                      ? { background: "#247BA0", color: "#fff", borderColor: "#247BA0" }
                      : { background: "#fff", color: "#555", borderColor: "#e5e5e5" }
                  }
                >
                  {buttonLabel}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section: Approvals */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Approvals
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span
          className="text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px]"
          style={{ background: "#fff8eb", color: "#a16600", borderColor: "#fdd38a" }}
        >
          2 pending
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {approvals.map(({ id, name, type, detail }) => (
          <div
            key={id}
            className="rounded-[16px] border px-4 py-3 flex items-center justify-between gap-3"
            style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
          >
            <div className="flex items-center gap-3 min-w-0 group">
              <EmployeeAvatar name={name} size="md" />
              <div className="flex flex-col gap-0.5 min-w-0">
                <EmployeeName name={name} className="text-[12.5px] font-semibold text-[#171717] leading-tight" />
                <span className="text-[11px] text-[#6b7280] leading-tight">
                  {type} · {detail}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border transition-opacity hover:opacity-85"
                style={{ background: "#247BA0", color: "#fff", borderColor: "#247BA0" }}
              >
                Approve
              </Button>
              <Button
                size="sm"
                className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border transition-opacity hover:opacity-85"
                style={{ background: "#fff", color: "#555", borderColor: "#e5e5e5" }}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Section: Carried Over */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Carried Over
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span className="text-[10px] text-[#6b7280]">from yesterday</span>
      </div>

      <div className="flex flex-col gap-2">
        {carriedOver.map(({ id, text, buttonLabel }) => (
          <div
            key={id}
            className="rounded-[16px] border px-4 py-3 flex items-center justify-between gap-3"
            style={{ background: "#fafafa", borderColor: "#e5e5e5" }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#6b7280" }}
              />
              <span className="text-[12.5px] text-[#555] leading-snug truncate">{text}</span>
            </div>
            <Button
              size="sm"
              className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border shrink-0 transition-opacity hover:opacity-85"
              style={{ background: "#fff", color: "#247BA0", borderColor: "#b3daea" }}
            >
              {buttonLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
