"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Check, CheckCircle2, Clock, Pencil, X,
  User, Laptop, Building2, CalendarDays, Handshake,
  type LucideIcon,
} from "lucide-react";

const SOURCE_BADGE: Record<string, { text: string; bg: string; border: string }> = {
  "#247BA0": { text: "#0C4A6E", bg: "#E0F2FE", border: "#BAE6FD" }, // Workday — sky
  "#2D9CDB": { text: "#075985", bg: "#F0F9FF", border: "#BAE6FD" }, // ServiceNow — light blue
  "#27AE60": { text: "#14532D", bg: "#DCFCE7", border: "#86EFAC" }, // Facilities — green
  "#F2994A": { text: "#9A3412", bg: "#FFF7ED", border: "#FED7AA" }, // Outlook — orange
  "#9B51E0": { text: "#581C87", bg: "#FAF5FF", border: "#E9D5FF" }, // Teams — purple
};

/* ─── Progress Stepper ───────────────────────────────────────────────────── */

const STEPS = [
  { label: "Request",        status: "done"    },
  { label: "System Updates", status: "active"  },
  { label: "Confirmation",   status: "pending" },
] as const;

type StepStatus = "done" | "active" | "pending";

function StepDot({ status }: { status: StepStatus }) {
  if (status === "done") {
    return (
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "#247BA0" }}
      >
        <Check size={10} color="#fff" strokeWidth={2.5} />
      </span>
    );
  }
  if (status === "active") {
    return (
      <span
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
        style={{ borderColor: "#247BA0" }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: "#247BA0" }} />
      </span>
    );
  }
  return (
    <span
      className="w-5 h-5 rounded-full border-2 shrink-0"
      style={{ borderColor: "#d4d4d4" }}
    />
  );
}

function ProcessStepper() {
  return (
    <div className="flex items-center gap-0 px-5 py-3.5 border-b" style={{ borderColor: "#f0f0f0" }}>
      {STEPS.map(({ label, status }, i) => (
        <div key={label} className="flex items-center gap-0 flex-1 last:flex-none">
          {/* Dot + label */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <StepDot status={status} />
            <span
              className="text-[9.5px] font-semibold tracking-[0.06em] whitespace-nowrap"
              style={{ color: status === "pending" ? "#6b7280" : "#247BA0" }}
            >
              {label}
            </span>
          </div>

          {/* Connector line (not after last step) */}
          {i < STEPS.length - 1 && (
            <div
              className="flex-1 h-px mx-2 mb-[14px]"
              style={{
                background: status === "done" ? "#247BA0" : "#e5e5e5",
                borderTop: status === "active" ? "1px dashed #b3daea" : undefined,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Effects ────────────────────────────────────────────────────────────── */

const effects: { domain: string; action: string; source: string; Icon: LucideIcon; color: string }[] = [
  {
    domain: "HR / Payroll",
    action: "Start date updated from March 31 → April 7 in Workday",
    source: "Verified via Workday",
    Icon: User,
    color: "#247BA0",
  },
  {
    domain: "IT",
    action: "Laptop delivery rescheduled to arrive April 5",
    source: "Confirmed via ServiceNow",
    Icon: Laptop,
    color: "#2D9CDB",
  },
  {
    domain: "Facilities",
    action: "Desk assignment and access card updated to April 7",
    source: "Confirmed via Facilities Portal",
    Icon: Building2,
    color: "#27AE60",
  },
  {
    domain: "Calendar",
    action: "All onboarding meetings shifted to week of April 7",
    source: "Synced via Outlook",
    Icon: CalendarDays,
    color: "#F2994A",
  },
  {
    domain: "People",
    action: "Buddy Theo Nakamura notified of new start via Teams",
    source: "Sent via Microsoft Teams",
    Icon: Handshake,
    color: "#9B51E0",
  },
];

/* ─── Main component ─────────────────────────────────────────────────────── */

interface Dl02OrchestrationProps {
  onConfirm?: () => void;
}

export function Dl02Orchestration({ onConfirm }: Dl02OrchestrationProps) {
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [actionTexts, setActionTexts] = useState<Record<string, string>>(
    Object.fromEntries(effects.map(({ domain, action }) => [domain, action]))
  );
  const [editingDomain, setEditingDomain] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");

  function toggleConfirm(domain: string) {
    setConfirmed((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) next.delete(domain);
      else next.add(domain);
      return next;
    });
  }

  function startEdit(domain: string) {
    setEditingDomain(domain);
    setDraftText(actionTexts[domain]);
    // Clear confirmed state when editing
    setConfirmed((prev) => {
      const next = new Set(prev);
      next.delete(domain);
      return next;
    });
  }

  function saveEdit(domain: string) {
    setActionTexts((prev) => ({ ...prev, [domain]: draftText.trim() || prev[domain] }));
    setEditingDomain(null);
  }

  function cancelEdit() {
    setEditingDomain(null);
  }

  return (
    <div className="flex flex-col gap-3">
      <Card className="rounded-2xl border border-black/[0.08] shadow-sm bg-white overflow-hidden pt-0">

        {/* Card header */}
        <CardHeader className="px-5 pt-4 pb-3 bg-[#f6fbfd] border-b border-black/[0.06]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse shrink-0"
                  style={{ background: "#247BA0" }}
                />
                <span className="text-[11px] font-bold text-[#247BA0] tracking-[0.12em] uppercase">
                  Orchestrating 5 System Updates
                </span>
              </div>
              <span className="text-[10.5px] text-[oklch(0.556_0_0)] pl-4 tracking-[0.03em]">
                Workflow · Change of Start Date · Dorthe Hansen
              </span>
            </div>
            <Badge
              className="text-[9px] font-semibold tracking-[0.08em] uppercase border px-2 py-0.5 rounded-md shrink-0"
              style={{ background: "#eaf5f9", color: "#247BA0", borderColor: "#b3daea" }}
            >
              All Systems Ready
            </Badge>
          </div>
        </CardHeader>

        {/* Progress stepper */}
        <ProcessStepper />

        {/* Effects list */}
        <CardContent className="px-5 py-3 flex flex-col">
          {effects.map(({ domain, source, Icon, color }, i) => {
            const isConfirmed = confirmed.has(domain);
            const isEditing = editingDomain === domain;
            const currentAction = actionTexts[domain];
            const isEdited = currentAction !== effects.find(e => e.domain === domain)!.action;

            return (
              <div key={domain}>
                <div className="flex items-start gap-3 py-3">
                  <div className="flex items-center gap-1.5 shrink-0 mt-[3px]">
                    <CheckCircle2 size={14} strokeWidth={1.5} style={{ color: SOURCE_BADGE[color]?.text ?? color, flexShrink: 0 }} />
                    <Icon size={14} strokeWidth={1.5} style={{ color: SOURCE_BADGE[color]?.text ?? color, flexShrink: 0 }} />
                  </div>

                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[12px] font-semibold text-[oklch(0.205_0_0)] shrink-0">
                        {domain}
                      </span>
                      <Badge
                        className="text-[9px] font-medium px-1.5 py-0 rounded border leading-relaxed shrink-0"
                        style={{
                          background: SOURCE_BADGE[color]?.bg ?? `${color}12`,
                          color: SOURCE_BADGE[color]?.text ?? color,
                          borderColor: SOURCE_BADGE[color]?.border ?? `${color}30`,
                        }}
                      >
                        {source}
                      </Badge>
                      {isEdited && !isEditing && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-[4px] border shrink-0"
                          style={{ background: "#fff8eb", color: "#a16600", borderColor: "#fdd38a" }}>
                          Edited
                        </span>
                      )}
                    </div>

                    {/* Action text or edit input */}
                    {isEditing ? (
                      <input
                        autoFocus
                        value={draftText}
                        onChange={(e) => setDraftText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(domain);
                          if (e.key === "Escape") cancelEdit();
                        }}
                        className="text-[12px] leading-snug w-full rounded-[6px] border px-2 py-1 outline-none"
                        style={{
                          color: "#171717",
                          borderColor: "#247BA0",
                          boxShadow: "0 0 0 3px rgba(36,123,160,0.12)",
                          fontFamily: "Inter, system-ui, sans-serif",
                        }}
                      />
                    ) : (
                      <span className="text-[12px] text-[oklch(0.4_0_0)] leading-snug">{currentAction}</span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 mt-[1px]">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(domain)}
                          className="flex items-center gap-1 h-7 px-2.5 rounded-[7px] border text-[11px] font-semibold transition-all"
                          style={{ background: "#247BA0", color: "#fff", borderColor: "#247BA0" }}
                        >
                          <Check size={10} strokeWidth={2.5} />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center justify-center w-7 h-7 rounded-[7px] border transition-all hover:bg-[#f5f5f5]"
                          style={{ borderColor: "#e5e5e5", color: "#6b7280" }}
                        >
                          <X size={11} strokeWidth={2} />
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Edit button */}
                        <button
                          onClick={() => startEdit(domain)}
                          className="flex items-center justify-center w-7 h-7 rounded-[7px] border transition-all hover:bg-[#f5f5f5]"
                          style={{ borderColor: "#e5e5e5", color: "#6b7280" }}
                          title="Edit"
                        >
                          <Pencil size={11} strokeWidth={1.75} />
                        </button>

                        {/* Confirm button */}
                        <button
                          onClick={() => toggleConfirm(domain)}
                          className="flex items-center gap-1 h-7 px-2.5 rounded-[7px] border text-[11px] font-semibold transition-all"
                          style={
                            isConfirmed
                              ? { background: "#f0fdf4", color: "#00a275", borderColor: "#a7f3d0" }
                              : { background: "#ffffff", color: "#555", borderColor: "#e5e5e5" }
                          }
                        >
                          {isConfirmed && <Check size={10} strokeWidth={2.5} />}
                          {isConfirmed ? "Confirmed" : "Confirm"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {i < effects.length - 1 && <Separator className="bg-black/[0.05]" />}
              </div>
            );
          })}
        </CardContent>

        {/* Card footer: View History ghost button */}
        <div
          className="px-5 py-3 border-t flex items-center justify-between"
          style={{ borderColor: "#f0f0f0" }}
        >
          <button
            className="flex items-center gap-1.5 text-[11px] font-semibold transition-opacity hover:opacity-70 cursor-pointer"
            style={{ color: "#247BA0" }}
          >
            <Clock size={12} strokeWidth={1.5} style={{ color: "#247BA0", flexShrink: 0 }} />
            View History
          </button>
          <span className="text-[10px] text-[#6b7280]">Last updated just now</span>
        </div>
      </Card>

      {/* Primary CTA */}
      <Button
        className="w-full h-11 text-[13px] font-semibold tracking-[0.04em] rounded-xl text-white shadow-sm hover:opacity-90 transition-opacity"
        style={{ background: "#247BA0" }}
        onClick={onConfirm}
      >
        Confirm All Changes
      </Button>
    </div>
  );
}
