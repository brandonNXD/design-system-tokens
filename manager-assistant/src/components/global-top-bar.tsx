"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { avatarColor } from "@/lib/avatar-colors";
import { categoryColor } from "@/lib/category-colors";

const NXD_LOGO = "https://www.figma.com/api/mcp/asset/569ab695-4505-4989-972f-5b80a539d9a3";
const BELL_ICON = "https://www.figma.com/api/mcp/asset/9e15dad2-1eed-4d63-b597-8f6f5411e829";

const TABS = ["My Day", "My Team", "Workflows"] as const;
type Tab = (typeof TABS)[number];

const SUGGESTIONS = [
  {
    intent: "DL-02",
    label: "Update Dorthe's start date",
    description: "Change of Start Date · 5 systems affected",
    match: ["dorthe", "start date", "start", "dl-02", "dl02"],
    module: "Workflow",
  },
  {
    intent: "DL-02",
    label: "Update Theo's start date",
    description: "Change of Start Date · 5 systems affected",
    match: ["theo", "start date", "start", "dl-02", "dl02"],
    module: "Workflow",
  },
  {
    intent: "DL-04",
    label: "Assign buddy for new hire",
    description: "Buddy Assignment · Onboarding flow",
    match: ["buddy", "assign", "pair", "mentor"],
    module: "Workflow",
  },
  {
    intent: "RE-01",
    label: "Draft performance review for Marcus",
    description: "Performance Review · Due in 3 days",
    match: ["marcus", "review", "performance", "feedback"],
    module: "Team Health",
  },
  {
    intent: "FO-03",
    label: "Block focus time this week",
    description: "Focus Block · Calendar management",
    match: ["focus", "block", "deep work", "quiet"],
    module: "Schedule",
  },
];

interface GlobalTopBarProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
  onAction?: (intent: string) => void;
}

export function GlobalTopBar({ activeTab = "My Day", onTabChange, onAction }: GlobalTopBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const utilitiesRef = useRef<HTMLDivElement>(null);
  // Dynamic inset so search bar never overlaps nav or utilities
  const [inset, setInset] = useState({ left: 24, right: 24 });

  useEffect(() => {
    function updateInset() {
      const nav = navRef.current?.getBoundingClientRect();
      const util = utilitiesRef.current?.getBoundingClientRect();
      if (!nav || !util) return;
      const gap = 12;
      // How far the nav intrudes into the search overlay area (which starts at x=88)
      const leftNeeded = Math.max(24, nav.right - 88 + gap);
      // How far the utilities intrude from the right
      const rightNeeded = Math.max(24, window.innerWidth - util.left + gap);
      // Keep both sides equal so search stays centered
      const symmetric = Math.max(leftNeeded, rightNeeded);
      setInset({ left: symmetric, right: symmetric });
    }
    updateInset();
    const ro = new ResizeObserver(updateInset);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  const filtered =
    query.trim().length > 0
      ? SUGGESTIONS.filter(
          (s) =>
            s.match.some((kw) => query.toLowerCase().includes(kw)) ||
            s.label.toLowerCase().includes(query.toLowerCase())
        )
      : SUGGESTIONS.slice(0, 3);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setFocused(true);
      }
      if (e.key === "Escape") setFocused(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function handleSelect(intent: string) {
    setFocused(false);
    setQuery("");
    onAction?.(intent);
  }

  return (
    <div
      className="h-[54px] relative flex items-center border-b shrink-0"
      style={{ background: "#ffffff", borderColor: "#e5e5e5", zIndex: 50 }}
    >
      {/* ── Logo + Nav (left, 88px area matches sidebar) ── */}
      <div ref={navRef} className="flex items-center h-full pl-[28px] shrink-0">
        <img
          alt="NXD"
          src={NXD_LOGO}
          className="w-8 h-8 shrink-0 mr-[28px]"
        />
        <nav className="flex items-stretch h-full gap-0 shrink-0">
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange?.(tab)}
                className="relative flex items-center px-2.5 sm:px-4 text-[12px] sm:text-[13px] font-medium tracking-[0.01em] cursor-pointer transition-colors whitespace-nowrap"
                style={{ color: isActive ? "#247BA0" : "#737373" }}
              >
                {tab}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-t-full"
                    style={{ background: "#247BA0" }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Search bar: absolutely positioned, anchored left-[88px] to mirror content column ── */}
      <div
        ref={containerRef}
        className="absolute inset-y-0 hidden sm:flex items-center pointer-events-none"
        style={{ left: 88, right: 0, paddingLeft: inset.left, paddingRight: inset.right, zIndex: 10 }}
      >
        <div className="w-full max-w-[680px] mx-auto pointer-events-auto relative">
          <div
            className="w-full flex items-center gap-2.5 h-[34px] px-3 rounded-[10px] border transition-all"
            style={{
              background: focused ? "#ffffff" : "#f5f5f5",
              borderColor: focused ? "#247BA0" : "#e5e5e5",
              boxShadow: focused ? "0 0 0 3px rgba(36,123,160,0.12)" : "none",
            }}
          >
            <Search size={13} strokeWidth={1.5} style={{ opacity: 0.35, flexShrink: 0, color: "#171717" }} />

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Ask me anything… try 'Update Theo's start date'"
              className="flex-1 bg-transparent border-none outline-none text-[12.5px] placeholder:text-[#6b7280]"
              style={{ color: "#171717", fontFamily: "Inter, system-ui, sans-serif" }}
            />

            {!focused && (
              <kbd className="text-[9px] text-[#4b5563] font-medium bg-white border border-[#e5e5e5] px-1.5 py-0.5 rounded shrink-0">
                ⌘K
              </kbd>
            )}
            {focused && query.length > 0 && (
              <span
                className="text-[10px] font-bold tracking-[0.08em] uppercase shrink-0"
                style={{ color: "#247BA0" }}
              >
                AI
              </span>
            )}
          </div>

          {/* Dropdown */}
          {focused && (
            <div
              className="absolute top-[calc(100%+6px)] left-0 right-0 rounded-[12px] border overflow-hidden"
              style={{
                background: "#ffffff",
                borderColor: "#e5e5e5",
                boxShadow: "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
                zIndex: 100,
              }}
            >
              <div className="px-3 pt-2.5 pb-1.5">
                <span className="text-[9.5px] font-semibold text-[#6b7280] tracking-[0.12em] uppercase">
                  {query.trim() ? "Suggested actions" : "Recent & suggested"}
                </span>
              </div>

              {filtered.length === 0 && (
                <div className="px-3 py-3 text-[12px] text-[#6b7280]">No matching actions found.</div>
              )}

              {filtered.map((s, i) => {
                const cat = categoryColor(s.module);
                return (
                  <button
                    key={i}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleSelect(s.intent)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                    style={{ background: hovered === i ? "#f5fafd" : "transparent" }}
                  >
                    <span
                      className="text-[8.5px] font-bold tracking-[0.08em] uppercase px-1.5 py-0.5 rounded-[4px] border shrink-0"
                      style={{ background: cat.bg, color: cat.text, borderColor: cat.border }}
                    >
                      {s.module}
                    </span>
                    <div className="flex flex-col gap-[1px] min-w-0">
                      <span className="text-[12.5px] font-medium text-[#171717] leading-tight truncate">
                        {s.label}
                      </span>
                      <span className="text-[11px] text-[#6b7280] leading-tight truncate">
                        {s.description}
                      </span>
                    </div>
                  </button>
                );
              })}

              <div className="px-3 py-2 border-t" style={{ borderColor: "#f0f0f0" }}>
                <span className="text-[10px] text-[#6b7280]">
                  Press{" "}
                  <kbd className="font-mono bg-[#f5f5f5] px-1 rounded text-[9px]">↵</kbd> to
                  execute ·{" "}
                  <kbd className="font-mono bg-[#f5f5f5] px-1 rounded text-[9px]">Esc</kbd> to
                  close
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Right utilities ── */}
      <div ref={utilitiesRef} className="flex items-center gap-3 shrink-0 ml-auto pr-[12px] pl-4" style={{ zIndex: 20, position: "relative" }}>
        {/* Notifications bell */}
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-[8px] transition-colors hover:bg-black/5"
        >
          <img alt="" src={BELL_ICON} className="w-4 h-4" />
          <span
            className="absolute top-[8px] left-[19px] w-[4px] h-[4px] rounded-full"
            style={{ background: "#DA0000" }}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-5" style={{ background: "#e5e5e5" }} />

        {/* Sarah Chen */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[11.5px] font-semibold text-[#171717] leading-tight">
              Sarah Chen
            </span>
            <span className="text-[9.5px] text-[#6b7280] leading-tight">Engineering Manager</span>
          </div>
          <Avatar className="w-7 h-7">
            <AvatarFallback
              className="text-[10px] font-semibold text-white"
              style={{ background: avatarColor("Sarah Chen") }}
            >
              SC
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
