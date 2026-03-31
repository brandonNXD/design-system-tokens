"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, ArrowUp, Check } from "lucide-react";
import { categoryColor } from "@/lib/category-colors";
import { EmployeeAvatar, EmployeeName } from "@/components/employee-avatar";

const hires = [
  {
    name: "Dorthe Hansen",
    role: "Senior Engineer",
    status: "action" as const,
    statusLabel: "Action needed",
    detail: "Start date change requested · March 31 → April 7",
    systems: 5,
    intent: "DL-02",
    category: "Workflow",
    actions: ["Review Changes", "Quick Confirm"],
  },
  {
    name: "Theo Nakamura",
    role: "Product Designer",
    status: "pending" as const,
    statusLabel: "Pending",
    detail: "Buddy assignment not yet confirmed · Onboarding in 12 days",
    systems: 2,
    intent: "DL-04",
    category: "Workflow",
    actions: ["Assign Buddy"],
  },
  {
    name: "Marcus Lee",
    role: "Data Engineer",
    status: "done" as const,
    statusLabel: "Complete",
    detail: "Onboarded April 1 · All 5 systems confirmed",
    systems: 5,
    intent: null,
    category: null,
    actions: ["View Summary"],
  },
];

const statusConfig = {
  action: { dot: "#DA0000", bg: "#FEF2F2", text: "#991b1b", border: "#FECACA" },
  pending: { dot: "#c97f00", bg: "#fff8eb", text: "#a16600", border: "#fdd38a" },
  done:   { dot: "#00A275", bg: "#F0FDF4", text: "#065f46", border: "#A7F3D0" },
};

interface DeliverPrimedProps {
  onAction?: (intent: string) => void;
}

export function DeliverPrimed({ onAction }: DeliverPrimedProps) {
  return (
    <div className="flex flex-col gap-5 max-w-[680px] mx-auto px-6 py-8">

      {/* Assistant greeting bar */}
      <div
        className="flex items-start gap-3 px-4 py-3.5 rounded-[14px] border"
        style={{ background: "#f6fbfd", borderColor: "#b3daea" }}
      >
        {/* Pulse dot */}
        <span className="mt-[3px] w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ background: "#247BA0" }} />
        <div className="flex flex-col gap-1">
          <span className="text-[12.5px] font-semibold text-[#247BA0]">
            Assistant · Deliver is ready
          </span>
          <span className="text-[12.5px] text-[#4a6b7a] leading-snug">
            Hi Sarah — you have <strong>1 action needed</strong> and <strong>1 item pending</strong> across your new hires this week.
            I&apos;ve already checked Workday, Outlook, and ServiceNow for you.
          </span>
        </div>
      </div>

      {/* Section label */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          New Hire Pipeline
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <Badge
          className="text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px]"
          style={{ background: "#f0f9ff", color: "#247BA0", borderColor: "#b3daea" }}
        >
          3 hires
        </Badge>
      </div>

      {/* Action cards */}
      <div className="flex flex-col gap-3">
        {hires.map(({ name, role, status, statusLabel, detail, systems, intent, category, actions }) => {
          const cfg = statusConfig[status];
          return (
            <div
              key={name}
              className="rounded-[16px] border transition-shadow hover:shadow-sm"
              style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
            >
              {/* Card top */}
              <div className="flex items-start justify-between px-4 pt-4 pb-3 gap-3">
                <div className="flex items-start gap-3 min-w-0 group">
                  <EmployeeAvatar name={name} size="lg" />

                  <div className="flex flex-col gap-0.5 min-w-0">
                    <EmployeeName name={name} className="text-[13px] font-semibold text-[#171717] leading-tight" />
                    <span className="text-[11px] text-[#6b7280] leading-tight">{role}</span>
                  </div>
                </div>

                {/* Status badge */}
                <div
                  className="flex items-center gap-1.5 px-2 py-1 rounded-[6px] border shrink-0"
                  style={{ background: cfg.bg, borderColor: cfg.border }}
                >
                  <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ background: cfg.dot }} />
                  <span className="text-[9.5px] font-semibold tracking-[0.06em]" style={{ color: cfg.text }}>
                    {statusLabel}
                  </span>
                </div>
              </div>

              <Separator style={{ background: "#f5f5f5" }} />

              {/* Detail row — stacks vertically on mobile */}
              <div className="px-4 py-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[12px] text-[#555] leading-snug">{detail}</span>
                  {category && (() => {
                    const cat = categoryColor(category);
                    return (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="text-[9px] font-bold tracking-[0.08em] uppercase px-1.5 py-0.5 rounded-[4px] border"
                        style={{ background: cat.bg, color: cat.text, borderColor: cat.border }}
                      >
                        {category}
                      </span>
                      <span className="text-[10px] text-[#6b7280]">{systems} systems will update</span>
                    </div>
                    );
                  })()}
                  {!intent && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Check size={11} strokeWidth={2.5} style={{ color: "#00A275", flexShrink: 0 }} />
                      <span className="text-[10px] text-[#065f46] font-medium">
                        All {systems} systems confirmed
                      </span>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {actions.map((label, i) => {
                    const isPrimary = i === 0 && status === "action";
                    return (
                      <Button
                        key={label}
                        size="sm"
                        onClick={() => intent && onAction?.(intent)}
                        className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border transition-opacity hover:opacity-85"
                        style={
                          isPrimary
                            ? { background: "#247BA0", color: "#fff", borderColor: "#247BA0" }
                            : { background: "#fff", color: "#555", borderColor: "#e5e5e5" }
                        }
                      >
                        {label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assistant contextual input */}
      <div
        className="flex items-center gap-3 rounded-[14px] border h-[46px] px-4 mt-1"
        style={{ background: "#fafafa", borderColor: "#e5e5e5" }}
      >
        <Search size={13} strokeWidth={1.5} style={{ opacity: 0.35, flexShrink: 0, color: "#171717" }} />
        <span className="text-[13px] text-[#6b7280] flex-1" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
          Ask me anything about Deliver…
        </span>
        <div
          className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white text-[13px] shrink-0"
          style={{ background: "#247BA0" }}
        >
          <ArrowUp size={14} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
