"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { categoryColor } from "@/lib/category-colors";

const SUGGESTIONS = [
  {
    intent: "DL-02",
    label: "Update Dorthe's start date",
    description: "Change of Start Date · 5 systems affected",
    match: ["dorthe", "start date", "start", "dl-02", "dl02"],
    module: "Workflow",
    color: "#247BA0",
  },
  {
    intent: "DL-02",
    label: "Update Theo's start date",
    description: "Change of Start Date · 5 systems affected",
    match: ["theo", "start date", "start", "dl-02", "dl02"],
    module: "Workflow",
    color: "#247BA0",
  },
  {
    intent: "DL-04",
    label: "Assign buddy for new hire",
    description: "Buddy Assignment · Onboarding flow",
    match: ["buddy", "assign", "pair", "mentor"],
    module: "Workflow",
    color: "#247BA0",
  },
  {
    intent: "RE-01",
    label: "Draft performance review for Marcus",
    description: "Performance Review · Due in 3 days",
    match: ["marcus", "review", "performance", "feedback"],
    module: "Team Health",
    color: "#7C3AED",
  },
  {
    intent: "FO-03",
    label: "Block focus time this week",
    description: "Focus Block · Calendar management",
    match: ["focus", "block", "deep work", "quiet"],
    module: "Schedule",
    color: "#059669",
  },
];

interface CommandBarProps {
  open: boolean;
  onClose: () => void;
  onAction?: (intent: string) => void;
}

export function CommandBar({ open, onClose, onAction }: CommandBarProps) {
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered =
    query.trim().length > 0
      ? SUGGESTIONS.filter(
          (s) =>
            s.match.some((kw) => query.toLowerCase().includes(kw)) ||
            s.label.toLowerCase().includes(query.toLowerCase())
        )
      : SUGGESTIONS.slice(0, 4);

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setQuery("");
      setHovered(null);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleSelect = useCallback(
    (intent: string) => {
      onClose();
      onAction?.(intent);
    },
    [onClose, onAction]
  );

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
      style={{ background: "rgba(0,0,0,0.40)", backdropFilter: "blur(2px)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Panel */}
      <div
        className="w-full max-w-[580px] mx-4 rounded-[20px] overflow-hidden"
        style={{
          background: "#ffffff",
          boxShadow: "0 24px 64px rgba(0,0,0,0.20), 0 4px 16px rgba(0,0,0,0.10)",
        }}
      >
        {/* Search row */}
        <div
          className="flex items-center gap-3 px-5 border-b"
          style={{ borderColor: "#f0f0f0", height: 58 }}
        >
          {/* Search icon */}
          <Search size={16} strokeWidth={1.5} style={{ flexShrink: 0, opacity: 0.4, color: "#171717" }} />

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything… try 'update Dorthe's start date'"
            className="flex-1 border-none outline-none text-[14px] bg-transparent"
            style={{ color: "#171717", fontFamily: "Inter, system-ui, sans-serif" }}
          />

          <kbd
            className="text-[10px] text-[#4b5563] font-medium px-2 py-1 rounded-[6px] border border-[#e5e5e5] shrink-0"
            style={{ background: "#ffffff" }}
          >
            Esc
          </kbd>
        </div>

        {/* Suggestions */}
        <div className="py-2">
          <div className="px-4 pb-1.5 pt-0.5">
            <span className="text-[9.5px] font-bold text-[#6b7280] tracking-[0.12em] uppercase">
              {query.trim() ? "Matching actions" : "Suggested actions"}
            </span>
          </div>

          {filtered.length === 0 && (
            <div className="px-4 py-3 text-[13px] text-[#6b7280]">No matching actions found.</div>
          )}

          {filtered.map((s, i) => {
            const cat = categoryColor(s.module);
            return (
            <button
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleSelect(s.intent)}
              className="w-full flex items-center gap-3.5 px-4 py-3 text-left transition-colors"
              style={{ background: hovered === i ? "#f6fbfd" : "transparent" }}
            >
              {/* Module badge */}
              <span
                className="text-[9px] font-bold tracking-[0.08em] uppercase px-2 py-1 rounded-[6px] border shrink-0 min-w-[60px] text-center"
                style={{ background: cat.bg, color: cat.text, borderColor: cat.border }}
              >
                {s.module}
              </span>

              <div className="flex flex-col gap-[2px] min-w-0 flex-1">
                <span className="text-[13px] font-medium text-[#171717] leading-tight truncate">
                  {s.label}
                </span>
                <span className="text-[11.5px] text-[#6b7280] leading-tight truncate">
                  {s.description}
                </span>
              </div>

              {/* Arrow hint */}
              <span className="text-[#d4d4d4] text-[12px] shrink-0">→</span>
            </button>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-t"
          style={{ borderColor: "#f0f0f0", background: "#fafafa" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#6b7280]">
              <kbd className="font-mono bg-white border border-[#e5e5e5] px-1.5 py-0.5 rounded text-[9px] mr-1">↵</kbd>
              to run
            </span>
            <span className="text-[10px] text-[#6b7280]">
              <kbd className="font-mono bg-white border border-[#e5e5e5] px-1.5 py-0.5 rounded text-[9px] mr-1">Esc</kbd>
              to close
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#247BA0" }} />
            <span className="text-[10px] font-semibold" style={{ color: "#247BA0" }}>
              NXD Assistant ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
