"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, ChevronDown } from "lucide-react";

const meetings = [
  {
    id: "m1",
    time: "09:30",
    duration: "30 min",
    title: "Team standup",
    attendees: "12 attendees",
    aiTag: "Agenda ready",
    expandable: false,
    detail: null,
  },
  {
    id: "m2",
    time: "11:00",
    duration: "45 min",
    title: "1:1 with Theo Nakamura",
    attendees: "2 attendees",
    aiTag: "Prep card ready",
    expandable: true,
    detail: {
      lines: [
        "Last check-in: 3 weeks ago",
        "Theo flagged: high utilization, no vacation booked",
        "Suggested topics: workload review, Q2 goals",
      ],
    },
  },
  {
    id: "m3",
    time: "14:00",
    duration: "60 min",
    title: "Engineering sync",
    attendees: "8 attendees",
    aiTag: "Agenda draft ready",
    expandable: true,
    detail: {
      lines: [
        "1. Sprint 24 retro",
        "2. Dorthe Hansen onboarding update",
        "3. Q2 roadmap",
      ],
    },
  },
  {
    id: "m4",
    time: "16:30",
    duration: "90 min",
    title: "Focus Block",
    attendees: null,
    aiTag: "AI-protected",
    expandable: false,
    detail: null,
    focusBlock: true,
  },
];

export function MyDaySchedule({ initialExpanded }: { initialExpanded?: string }) {
  const [expanded, setExpanded] = useState<string | null>(initialExpanded ?? null);

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
            Assistant · Today&apos;s Schedule
          </span>
          <span className="text-[12.5px] text-[#4a6b7a] leading-snug">
            You have <strong>4 meetings</strong> today. I&apos;ve prepared briefings for <strong>3 of them</strong>.
          </span>
        </div>
      </div>

      {/* Section: Today's Timeline */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Today&apos;s Timeline
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span className="text-[10px] text-[#6b7280]">Monday, March 23</span>
      </div>

      {/* Vertical timeline */}
      <div className="flex flex-col">
        {meetings.map(({ id, time, duration, title, attendees, aiTag, expandable, detail, focusBlock }, idx) => {
          const isExpanded = expanded === id;
          const isLast = idx === meetings.length - 1;

          return (
            <div key={id} className="flex gap-4">
              {/* Timeline spine */}
              <div className="flex flex-col items-center shrink-0 w-[50px]">
                <div
                  className="w-2 h-2 rounded-full shrink-0 mt-[18px]"
                  style={{ background: focusBlock ? "#b3daea" : "#247BA0" }}
                />
                {!isLast && (
                  <div
                    className="w-px flex-1 mt-1"
                    style={{ background: "#e5e5e5", minHeight: "24px" }}
                  />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 mb-3">
                <div
                  className="rounded-[16px] border transition-shadow hover:shadow-sm overflow-hidden"
                  style={{
                    background: focusBlock ? "#f6fbfd" : "#ffffff",
                    borderColor: focusBlock ? "#b3daea" : "#e5e5e5",
                  }}
                >
                  <div className="px-4 pt-3.5 pb-3 flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11.5px] font-bold text-[#6b7280] tabular-nums shrink-0">
                          {time}
                        </span>
                        <span className="text-[10px] text-[#6b7280]">{duration}</span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#171717] leading-tight">
                        {title}
                      </span>
                      {attendees && (
                        <span className="text-[11px] text-[#6b7280]">{attendees}</span>
                      )}
                      {focusBlock && (
                        <span className="text-[11.5px] text-[#4a6b7a] leading-snug mt-0.5">
                          No meetings scheduled. Use for deep work.
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="text-[9px] font-semibold tracking-[0.06em] px-2 py-0.5 rounded-[6px] border"
                        style={{ background: "#eaf5f9", color: "#247BA0", borderColor: "#b3daea" }}
                      >
                        {aiTag}
                      </span>
                      {expandable && (
                        <button
                          onClick={() => setExpanded(isExpanded ? null : id)}
                          className="text-[11px] text-[#6b7280] hover:text-[#247BA0] transition-colors cursor-pointer"
                        >
                          {isExpanded ? <ChevronUp size={12} strokeWidth={2} /> : <ChevronDown size={12} strokeWidth={2} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {expandable && isExpanded && detail && (
                    <>
                      <div style={{ background: "#f5f5f5", height: "1px" }} />
                      <div className="px-4 py-3 flex flex-col gap-1.5">
                        {detail.lines.map((line, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span
                              className="w-1 h-1 rounded-full shrink-0 mt-[6px]"
                              style={{ background: "#247BA0" }}
                            />
                            <span className="text-[12px] text-[#555] leading-snug">{line}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section: Focus Blocks */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Focus Blocks
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
      </div>

      <div
        className="rounded-[16px] border px-4 py-4 flex items-center justify-between gap-3"
        style={{ background: "#f6fbfd", borderColor: "#b3daea" }}
      >
        <div className="flex items-start gap-3 min-w-0">
          <span
            className="mt-[3px] w-2 h-2 rounded-full shrink-0"
            style={{ background: "#247BA0" }}
          />
          <div className="flex flex-col gap-1">
            <span className="text-[12.5px] font-semibold text-[#247BA0]">AI suggestion</span>
            <span className="text-[12.5px] text-[#4a6b7a] leading-snug">
              You have <strong>3 hours</strong> of unblocked time Wed–Thu. Block for Q2 planning?
            </span>
          </div>
        </div>
        <Button
          size="sm"
          className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border shrink-0 transition-opacity hover:opacity-85"
          style={{ background: "#247BA0", color: "#fff", borderColor: "#247BA0" }}
        >
          Block Time
        </Button>
      </div>
    </div>
  );
}
