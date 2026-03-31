"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NxdSidebar } from "@/components/nxd-sidebar";
import { GlobalTopBar } from "@/components/global-top-bar";
import { DeliverPrimed } from "@/components/deliver-primed";
import { ThinkingIndicator } from "@/components/thinking-indicator";
import { Dl02Orchestration } from "@/components/dl02-orchestration";
import { CommandBar } from "@/components/command-bar";
import { MyDayPrioritize } from "@/components/my-day-prioritize";
import { MyDaySchedule } from "@/components/my-day-schedule";
import { MyTeamHealth } from "@/components/my-team-health";
import { MyTeamGrowth } from "@/components/my-team-growth";
import { WorkflowsHistory } from "@/components/workflows-history";

/* ─── Chat bubble primitives ──────────────────────────────────────────────── */

function UserMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 items-end">
      <div
        className="max-w-[82%] px-4 py-3 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[4px] text-[13.5px] leading-[1.55] text-white tracking-[0.01em]"
        style={{ background: "#247BA0" }}
      >
        {children}
      </div>
      <span className="text-[10px] text-[#6b7280] tracking-[0.05em]">Sarah Chen</span>
    </div>
  );
}

function AssistantMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 items-start">
      <span className="text-[10px] text-[#6b7280] tracking-[0.05em]">Assistant</span>
      <div className="max-w-[82%] px-4 py-3 rounded-tl-[4px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] bg-black/[0.05] text-[13.5px] leading-[1.55] text-[#171717] tracking-[0.01em]">
        {children}
      </div>
    </div>
  );
}

/* ─── Sub-header beneath the global nav ─────────────────────────────────── */

type Tab = "My Day" | "My Team" | "Workflows";
type SubItem = "PR" | "SC" | "TH" | "GR" | "AC" | "HI";
type View = "primed" | "dl02_thinking" | "dl02_orchestration" | "dl02_confirmed";

function getSubtitle(tab: Tab, subItem: SubItem, view: View): string {
  if (tab === "My Day" && subItem === "PR") return "Prioritize · 3 must-dos today";
  if (tab === "My Day" && subItem === "SC") return "Schedule · 4 meetings today";
  if (tab === "My Team" && subItem === "TH") return "Team Health · 2 risk signals";
  if (tab === "My Team" && subItem === "GR") return "Growth · 3 engineers on track";
  if (tab === "Workflows" && subItem === "HI") return "History · 4 completed workflows";
  // Workflows / AC
  if (view === "primed") return "New hire pipeline · 3 hires active";
  return "New hire pipeline · 3 hires active";
}

function ContentHeader({
  tab,
  subItem,
  view,
  onBack,
}: {
  tab: Tab;
  subItem: SubItem;
  view: View;
  onBack: () => void;
}) {
  const inDl02Flow = tab === "Workflows" && subItem === "AC" && view !== "primed";

  if (!inDl02Flow) {
    return (
      <div
        className="h-[46px] flex items-center px-7 border-b shrink-0 gap-2"
        style={{ background: "#fafafa", borderColor: "#e5e5e5" }}
      >
        <span className="text-[13px] font-semibold text-[#171717]">{tab}</span>
        <span className="text-[11px] text-[#6b7280]">·</span>
        <span className="text-[11px] text-[#6b7280]">{getSubtitle(tab, subItem, view)}</span>
      </div>
    );
  }

  return (
    <div
      className="h-[46px] flex items-center px-7 border-b shrink-0 gap-2"
      style={{ background: "#fafafa", borderColor: "#e5e5e5" }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[11px] text-[#6b7280] hover:text-[#247BA0] transition-colors cursor-pointer shrink-0"
      >
        ←
      </button>
      <div className="w-px h-3.5 shrink-0" style={{ background: "#e5e5e5" }} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-[11.5px] font-semibold text-[#171717] shrink-0">
          Active Workflows
        </span>
        <span className="text-[11px] text-[#6b7280] shrink-0">/</span>
        <span className="text-[11.5px] text-[#247BA0] font-medium truncate">
          Onboarding: Dorthe Hansen
        </span>
      </div>

      {/* Status badge */}
      <Badge
        className="ml-auto text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px] shrink-0"
        style={{ background: "#eaf5f9", color: "#247BA0", borderColor: "#b3daea" }}
      >
        {view === "dl02_confirmed" ? "Complete" : "In Progress"}
      </Badge>
    </div>
  );
}

/* ─── Default sub-item per tab ───────────────────────────────────────────── */

function defaultSubItem(tab: Tab): SubItem {
  if (tab === "My Day") return "PR";
  if (tab === "My Team") return "TH";
  return "AC";
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

function DeliverPageInner() {
  const searchParams = useSearchParams();
  const initSub = searchParams.get("sub") as SubItem | null;
  const initTab: Tab = initSub && ["PR","SC"].includes(initSub) ? "My Day"
    : initSub && ["TH","GR"].includes(initSub) ? "My Team"
    : "Workflows";
  const initExpanded = searchParams.get("exp") ?? undefined;

  const [view, setView] = useState<View>("primed");
  const [activeTab, setActiveTab] = useState<Tab>(initSub ? initTab : "Workflows");
  const [activeSubItem, setActiveSubItem] = useState<SubItem>(initSub ?? "AC");
  const [cmdBarOpen, setCmdBarOpen] = useState(false);

  /* ── Cmd+K global listener ── */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Focus the search input in the top bar rather than opening overlay
        const searchInput = document.querySelector<HTMLInputElement>("[data-command-bar-input]");
        if (searchInput) {
          searchInput.focus();
        } else {
          setCmdBarOpen((prev) => !prev);
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    const sub = defaultSubItem(tab);
    setActiveSubItem(sub);
    if (tab === "Workflows") {
      setView("primed");
    }
  }

  function handleSubItemChange(code: string) {
    setActiveSubItem(code as SubItem);
    // If switching away from AC in Workflows, keep view state clean
    if (activeTab === "Workflows" && code === "AC") {
      setView("primed");
    }
  }

  function handleAction(intent: string) {
    if (intent === "DL-02") {
      setActiveTab("Workflows");
      setActiveSubItem("AC");
      setView("dl02_thinking");
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>(
        "[data-radix-scroll-area-viewport], .overflow-y-auto"
      );
      els.forEach((el) => {
        if (el.scrollHeight > el.clientHeight) el.scrollTop = el.scrollHeight;
      });
    }, 50);
  }

  /* ── Determine what main content to render ── */
  const showDl02Flow =
    activeTab === "Workflows" && activeSubItem === "AC" && view !== "primed";

  const showDeliverPrimed =
    activeTab === "Workflows" && activeSubItem === "AC" && view === "primed";

  return (
    <div
      className="force-light flex flex-col h-screen overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* ── Global header with nav tabs ── */}
      <GlobalTopBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAction={handleAction}
      />

      {/* ── Sidebar + content ── */}
      <div className="flex flex-1 min-h-0">
        {/* Contextual sidebar */}
        <NxdSidebar
          activeTab={activeTab}
          activeItem={activeSubItem}
          onItemChange={handleSubItemChange}
        />

        {/* Module content */}
        <div className="flex flex-col flex-1 min-w-0 bg-white">

          {/* Sub-header */}
          <ContentHeader
            tab={activeTab}
            subItem={activeSubItem}
            view={view}
            onBack={() => setView("primed")}
          />

          {/* ── MY DAY ── */}
          {activeTab === "My Day" && activeSubItem === "PR" && (
            <ScrollArea className="flex-1 min-h-0">
              <MyDayPrioritize onAction={handleAction} />
            </ScrollArea>
          )}

          {activeTab === "My Day" && activeSubItem === "SC" && (
            <ScrollArea className="flex-1 min-h-0">
              <MyDaySchedule initialExpanded={initExpanded} />
            </ScrollArea>
          )}

          {/* ── MY TEAM ── */}
          {activeTab === "My Team" && activeSubItem === "TH" && (
            <ScrollArea className="flex-1 min-h-0">
              <MyTeamHealth />
            </ScrollArea>
          )}

          {activeTab === "My Team" && activeSubItem === "GR" && (
            <ScrollArea className="flex-1 min-h-0">
              <MyTeamGrowth />
            </ScrollArea>
          )}

          {/* ── WORKFLOWS: Active (Primed) ── */}
          {showDeliverPrimed && (
            <ScrollArea className="flex-1 min-h-0">
              <DeliverPrimed onAction={handleAction} />
            </ScrollArea>
          )}

          {/* ── WORKFLOWS: Active (DL-02 chat flow) ── */}
          {showDl02Flow && (
            <>
              <ScrollArea className="flex-1 min-h-0">
                <div className="max-w-[680px] mx-auto px-6 py-8 flex flex-col gap-5">

                  {/* Use-case pill */}
                  <div className="flex justify-center">
                    <Badge
                      className="text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1 rounded-full border"
                      style={{ background: "#ECEDFB", color: "#4338CA", borderColor: "#C7D2FE" }}
                    >
                      Workflow · Change of Start Date
                    </Badge>
                  </div>

                  <UserMsg>
                    Dorthe Hansen needs to push her start date back by one week — March 31 → April 7.
                    Can you handle all the downstream updates?
                  </UserMsg>

                  <AssistantMsg>
                    On it. Let me check Dorthe&apos;s record across your systems before making any changes.
                  </AssistantMsg>

                  {/* Thinking state */}
                  {view === "dl02_thinking" && (
                    <>
                      <ThinkingIndicator />
                      <div className="flex justify-center">
                        <button
                          onClick={() => { setView("dl02_orchestration"); scrollToBottom(); }}
                          className="text-[11px] text-[#6b7280] underline underline-offset-2 hover:text-[#247BA0] transition-colors cursor-pointer"
                        >
                          Skip to results →
                        </button>
                      </div>
                    </>
                  )}

                  {/* Orchestration */}
                  {(view === "dl02_orchestration" || view === "dl02_confirmed") && (
                    <>
                      <AssistantMsg>
                        I&apos;ve verified Dorthe&apos;s record across all five systems. Here&apos;s
                        everything that will change — no manual work needed on your end.
                      </AssistantMsg>

                      {view === "dl02_orchestration" && (
                        <Dl02Orchestration
                          onConfirm={() => { setView("dl02_confirmed"); scrollToBottom(); }}
                        />
                      )}

                      {view === "dl02_confirmed" && (
                        <div className="flex flex-col gap-4">
                          {/* All-changes summary */}
                          <div
                            className="rounded-2xl border p-4"
                            style={{ background: "#f6fbfd", borderColor: "#b3daea" }}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle2 size={16} strokeWidth={1.6} style={{ color: "#247BA0", flexShrink: 0 }} />
                              <span className="text-[11px] font-bold text-[#247BA0] tracking-[0.1em] uppercase">
                                All Changes Applied
                              </span>
                            </div>
                            <div className="flex flex-col gap-1 pl-6">
                              {[
                                "HR / Payroll: Start date updated in Workday",
                                "IT: Laptop delivery rescheduled to April 5",
                                "Facilities: Desk & access card updated to April 7",
                                "Calendar: All onboarding meetings shifted to week of April 7",
                                "People: Theo Nakamura notified via Teams",
                              ].map((item) => (
                                <div key={item} className="flex items-start gap-2">
                                  <span className="text-[#247BA0] text-[11px] shrink-0 mt-[1px]">✓</span>
                                  <span className="text-[12px] text-[#4a6b7a]">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <AssistantMsg>
                            All done. Dorthe has been notified of her new April 7 start date, and Theo
                            has confirmed he&apos;s available for the buddy session.
                          </AssistantMsg>

                          <div className="flex justify-center">
                            <Button
                              onClick={() => setView("primed")}
                              className="h-9 px-5 text-[12px] font-semibold rounded-[10px] border"
                              style={{ background: "#fff", color: "#555", borderColor: "#e5e5e5" }}
                            >
                              ← Back to Workflows
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ScrollArea>

              {/* Chat input */}
              <div
                className="px-6 pt-[17px] pb-5 border-t shrink-0"
                style={{ borderColor: "#e5e5e5" }}
              >
                <div
                  className="flex items-center gap-3 rounded-[14px] px-[17px] py-px h-[54px] border"
                  style={{ background: "#fafafa", borderColor: "#e5e5e5" }}
                >
                  <input
                    placeholder="Ask about this change…"
                    className="flex-1 border-none outline-none text-[14px] font-normal placeholder:text-[#6b7280]"
                    style={{ backgroundColor: "#fafafa", color: "#171717" }}
                  />
                  <button
                    className="w-8 h-8 rounded-[10px] shrink-0 text-white text-[14px] flex items-center justify-center"
                    style={{ background: "#247BA0" }}
                  >
                    <ArrowUp size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── WORKFLOWS: History ── */}
          {activeTab === "Workflows" && activeSubItem === "HI" && (
            <ScrollArea className="flex-1 min-h-0">
              <WorkflowsHistory />
            </ScrollArea>
          )}

          {/* Footer */}
          <div
            className="flex items-center justify-between h-[38px] px-7 border-t shrink-0"
            style={{ borderColor: "#e5e5e5" }}
          >
            <span className="text-[10px] text-[#6b7280] tracking-[0.08em]">
              Nordic Experience Design
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#6b7280] tracking-[0.08em]">
                Manager Assistant · {activeTab}
              </span>
              <button
                onClick={() => {
                  const searchInput = document.querySelector<HTMLInputElement>("[data-command-bar-input]");
                  if (searchInput) searchInput.focus();
                  else setCmdBarOpen(true);
                }}
                className="flex items-center gap-1 text-[9px] text-[#6b7280] hover:text-[#247BA0] transition-colors"
              >
                <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#e5e5e5] text-[8px] text-[#4b5563]">⌘K</kbd>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Global Command Bar overlay ── */}
      <CommandBar
        open={cmdBarOpen}
        onClose={() => setCmdBarOpen(false)}
        onAction={handleAction}
      />
    </div>
  );
}

export default function DeliverPage() {
  return (
    <Suspense>
      <DeliverPageInner />
    </Suspense>
  );
}
