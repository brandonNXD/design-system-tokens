"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowUp, Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GlobalTopBar } from "@/components/global-top-bar";
import { NxdSidebar } from "@/components/nxd-sidebar";
import { MyDayPrioritize } from "@/components/my-day-prioritize";
import { MyDaySchedule } from "@/components/my-day-schedule";
import { MyTeamHealth } from "@/components/my-team-health";
import { MyTeamGrowth } from "@/components/my-team-growth";
import { WorkflowsHistory } from "@/components/workflows-history";
import { Dl02Orchestration } from "@/components/dl02-orchestration";
import { categoryColor } from "@/lib/category-colors";
import { avatarColor } from "@/lib/avatar-colors";

/* ─── Shell helpers ─────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#6b7280",
        marginBottom: "12px",
        fontFamily: "Inter, system-ui, sans-serif",
        paddingLeft: "2px",
      }}
    >
      {children}
    </div>
  );
}

function Frame({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <div
      style={{
        width: "1440px",
        minHeight: height ?? 900,
        background: "#fff",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, system-ui, sans-serif",
        boxShadow: "0 0 0 1px #e5e5e5",
        borderRadius: "8px",
      }}
    >
      {children}
    </div>
  );
}

/* Simple sub-header row used in every frame */
function SubHeader({
  tab,
  subtitle,
}: {
  tab: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        height: 46,
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        borderBottom: "1px solid #e5e5e5",
        background: "#fafafa",
        gap: 8,
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 600, color: "#171717" }}>{tab}</span>
      <span style={{ fontSize: 11, color: "#6b7280" }}>·</span>
      <span style={{ fontSize: 11, color: "#6b7280" }}>{subtitle}</span>
    </div>
  );
}

function BreadcrumbHeader() {
  return (
    <div
      style={{
        height: 46,
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        borderBottom: "1px solid #e5e5e5",
        background: "#fafafa",
        gap: 8,
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 11, color: "#6b7280" }}>←</span>
      <div style={{ width: 1, height: 14, background: "#e5e5e5" }} />
      <span style={{ fontSize: 11.5, fontWeight: 600, color: "#171717" }}>Active Workflows</span>
      <span style={{ fontSize: 11, color: "#6b7280" }}>/</span>
      <span style={{ fontSize: 11.5, fontWeight: 500, color: "#247BA0" }}>Onboarding: Dorthe Hansen</span>
      <Badge
        className="ml-auto text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px]"
        style={{ background: "#eaf5f9", color: "#247BA0", borderColor: "#b3daea" }}
      >
        In Progress
      </Badge>
    </div>
  );
}

function Footer({ tab }: { tab: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 38,
        padding: "0 28px",
        borderTop: "1px solid #e5e5e5",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.08em" }}>Nordic Experience Design</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.08em" }}>
          Manager Assistant · {tab}
        </span>
        <kbd
          style={{
            fontFamily: "monospace",
            background: "#fff",
            padding: "2px 6px",
            borderRadius: 4,
            border: "1px solid #e5e5e5",
            fontSize: 8,
            color: "#4b5563",
          }}
        >
          ⌘K
        </kbd>
      </div>
    </div>
  );
}

/* Chat bubbles (for the orchestration screen) */
function UserMsg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
      <div
        style={{
          maxWidth: "82%",
          padding: "12px 16px",
          borderRadius: "16px 16px 4px 16px",
          fontSize: 13.5,
          lineHeight: 1.55,
          color: "#fff",
          background: "#247BA0",
        }}
      >
        {children}
      </div>
      <span style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.05em" }}>Sarah Chen</span>
    </div>
  );
}

function AssistantMsg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
      <span style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.05em" }}>Assistant</span>
      <div
        style={{
          maxWidth: "82%",
          padding: "12px 16px",
          borderRadius: "4px 16px 16px 16px",
          fontSize: 13.5,
          lineHeight: 1.55,
          color: "#171717",
          background: "rgba(0,0,0,0.05)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Inline suggestion row for the command-bar open state */
const SUGGESTIONS = [
  { label: "Update Dorthe's start date",      description: "Change of Start Date · 5 systems affected", module: "Workflow" },
  { label: "Update Theo's start date",        description: "Change of Start Date · 5 systems affected", module: "Workflow" },
  { label: "Assign buddy for new hire",       description: "Buddy Assignment · Onboarding flow",        module: "Workflow" },
  { label: "Draft performance review for Marcus", description: "Performance Review · Due in 3 days",    module: "Team Health" },
  { label: "Block focus time this week",      description: "Focus Block · Calendar management",         module: "Schedule" },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function CapturePage() {
  return (
    <div
      style={{
        background: "#f4f4f5",
        padding: "60px 80px",
        display: "flex",
        flexDirection: "column",
        gap: "80px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >

      {/* ── 1 · My Day / Prioritize ──────────────────────────────────────── */}
      <div>
        <SectionLabel>1 · My Day / Prioritize — Full Dashboard</SectionLabel>
        <Frame>
          <GlobalTopBar activeTab="My Day" />
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <NxdSidebar activeTab="My Day" activeItem="PR" />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "#fff" }}>
              <SubHeader tab="My Day" subtitle="Prioritize · 3 must-dos today" />
              <div style={{ flex: 1, overflowY: "auto" }}>
                <MyDayPrioritize />
              </div>
              <Footer tab="My Day" />
            </div>
          </div>
        </Frame>
      </div>

      {/* ── 2 · My Team / Health ─────────────────────────────────────────── */}
      <div>
        <SectionLabel>2 · My Team / Health — Capacity Heatmap &amp; Theo&apos;s Alert</SectionLabel>
        <Frame>
          <GlobalTopBar activeTab="My Team" />
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <NxdSidebar activeTab="My Team" activeItem="TH" />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "#fff" }}>
              <SubHeader tab="My Team" subtitle="Team Health · 2 risk signals" />
              <div style={{ flex: 1, overflowY: "auto" }}>
                <MyTeamHealth />
              </div>
              <Footer tab="My Team" />
            </div>
          </div>
        </Frame>
      </div>

      {/* ── 3 · Workflows / Active — Dorthe Hansen orchestration ─────────── */}
      <div>
        <SectionLabel>3 · Workflows / Active — Dorthe Hansen Orchestration</SectionLabel>
        <Frame height={1000}>
          <GlobalTopBar activeTab="Workflows" />
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <NxdSidebar activeTab="Workflows" activeItem="AC" />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "#fff" }}>
              <BreadcrumbHeader />

              {/* Chat conversation */}
              <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px", display: "flex", flexDirection: "column", gap: 20, maxWidth: 680, margin: "0 auto", width: "100%" }}>
                {/* Use-case pill */}
                <div style={{ display: "flex", justifyContent: "center" }}>
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

                <AssistantMsg>
                  I&apos;ve verified Dorthe&apos;s record across all five systems. Here&apos;s everything
                  that will change — no manual work needed on your end.
                </AssistantMsg>

                <Dl02Orchestration onConfirm={() => {}} />
              </div>

              {/* Chat input */}
              <div style={{ padding: "17px 24px 20px", borderTop: "1px solid #e5e5e5", flexShrink: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    borderRadius: 14,
                    padding: "0 17px",
                    height: 54,
                    border: "1px solid #e5e5e5",
                    background: "#fafafa",
                  }}
                >
                  <input
                    placeholder="Ask about this change…"
                    readOnly
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "#fafafa", color: "#171717" }}
                  />
                  <button
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: "#247BA0",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    <ArrowUp size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
              <Footer tab="Workflows" />
            </div>
          </div>
        </Frame>
      </div>

      {/* ── 4a · Assistant — Empty / Command Bar Open ─────────────────────── */}
      <div>
        <SectionLabel>4a · Assistant — Empty State (Command Bar Open)</SectionLabel>
        <Frame>
          <GlobalTopBar activeTab="My Day" />
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <NxdSidebar activeTab="My Day" activeItem="PR" />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "#fff" }}>
              <SubHeader tab="My Day" subtitle="Prioritize · 3 must-dos today" />

              {/* Command bar overlay */}
              <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                {/* Dimmed background */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.15)",
                    backdropFilter: "blur(2px)",
                    zIndex: 10,
                  }}
                />
                {/* Command bar panel */}
                <div
                  style={{
                    position: "absolute",
                    top: "48px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 620,
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06)",
                    zIndex: 20,
                    overflow: "hidden",
                  }}
                >
                  {/* Search row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "14px 18px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <Search size={15} strokeWidth={1.75} style={{ color: "#6b7280", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#9ca3af", flex: 1 }}>Ask me anything… try &apos;Update Theo&apos;s start date&apos;</span>
                    <kbd
                      style={{
                        fontFamily: "monospace",
                        background: "#fff",
                        padding: "2px 7px",
                        borderRadius: 5,
                        border: "1px solid #e5e5e5",
                        fontSize: 9,
                        color: "#4b5563",
                      }}
                    >
                      Esc
                    </kbd>
                  </div>
                  {/* Suggestions */}
                  <div style={{ padding: "8px 0 12px" }}>
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#9ca3af",
                        padding: "0 18px",
                        marginBottom: 4,
                      }}
                    >
                      Suggested
                    </div>
                    {SUGGESTIONS.map((s, i) => {
                      const cat = categoryColor(s.module);
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "9px 18px",
                            cursor: "default",
                            background: i === 0 ? "#f9fafb" : "transparent",
                          }}
                        >
                          <Search size={13} strokeWidth={1.5} style={{ color: "#9ca3af", flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, color: "#171717", fontWeight: 500 }}>{s.label}</div>
                            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{s.description}</div>
                          </div>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 600,
                              letterSpacing: "0.06em",
                              padding: "2px 7px",
                              borderRadius: 5,
                              border: `1px solid ${cat.border}`,
                              background: cat.bg,
                              color: cat.text,
                              flexShrink: 0,
                            }}
                          >
                            {s.module}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <Footer tab="My Day" />
            </div>
          </div>
        </Frame>
      </div>

      {/* ── 4b · Assistant — Full Conversation (confirmed) ───────────────── */}
      <div>
        <SectionLabel>4b · Assistant — Full Conversation State</SectionLabel>
        <Frame height={1100}>
          <GlobalTopBar activeTab="Workflows" />
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <NxdSidebar activeTab="Workflows" activeItem="AC" />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "#fff" }}>
              <BreadcrumbHeader />

              {/* Full conversation */}
              <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px", display: "flex", flexDirection: "column", gap: 20, maxWidth: 680, margin: "0 auto", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
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

                <AssistantMsg>
                  I&apos;ve verified Dorthe&apos;s record across all five systems. Here&apos;s everything
                  that will change — no manual work needed on your end.
                </AssistantMsg>

                {/* Confirmed state */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div
                    style={{
                      borderRadius: 16,
                      border: "1px solid #b3daea",
                      padding: 16,
                      background: "#f6fbfd",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <CheckCircle2 size={16} strokeWidth={1.6} style={{ color: "#247BA0", flexShrink: 0 }} />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#247BA0",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        All Changes Applied
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 24 }}>
                      {[
                        "HR / Payroll: Start date updated in Workday",
                        "IT: Laptop delivery rescheduled to April 5",
                        "Facilities: Desk & access card updated to April 7",
                        "Calendar: All onboarding meetings shifted to week of April 7",
                        "People: Theo Nakamura notified via Teams",
                      ].map((item) => (
                        <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                          <span style={{ color: "#247BA0", fontSize: 11, flexShrink: 0, marginTop: 1 }}>✓</span>
                          <span style={{ fontSize: 12, color: "#4a6b7a" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <AssistantMsg>
                    All done. Dorthe has been notified of her new April 7 start date, and Theo has
                    confirmed he&apos;s available for the buddy session.
                  </AssistantMsg>
                </div>
              </div>

              {/* Chat input */}
              <div style={{ padding: "17px 24px 20px", borderTop: "1px solid #e5e5e5", flexShrink: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    borderRadius: 14,
                    padding: "0 17px",
                    height: 54,
                    border: "1px solid #e5e5e5",
                    background: "#fafafa",
                  }}
                >
                  <input
                    placeholder="Ask about this change…"
                    readOnly
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "#fafafa", color: "#171717" }}
                  />
                  <button
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: "#247BA0",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    <ArrowUp size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
              <Footer tab="Workflows" />
            </div>
          </div>
        </Frame>
      </div>

      {/* ── 5 · My Day / Schedule ─────────────────────────────────────────── */}
      <div>
        <SectionLabel>5 · My Day / Schedule — Daily Calendar View</SectionLabel>
        <Frame>
          <GlobalTopBar activeTab="My Day" />
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <NxdSidebar activeTab="My Day" activeItem="SC" />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "#fff" }}>
              <SubHeader tab="My Day" subtitle="Schedule · 4 meetings today" />
              <div style={{ flex: 1, overflowY: "auto" }}>
                <MyDaySchedule />
              </div>
              <Footer tab="My Day" />
            </div>
          </div>
        </Frame>
      </div>

      {/* ── 6 · My Team / Growth ──────────────────────────────────────────── */}
      <div>
        <SectionLabel>6 · My Team / Growth — Skill Gaps &amp; Promotion Tracker</SectionLabel>
        <Frame>
          <GlobalTopBar activeTab="My Team" />
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <NxdSidebar activeTab="My Team" activeItem="GR" />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "#fff" }}>
              <SubHeader tab="My Team" subtitle="Growth · 3 engineers on track" />
              <div style={{ flex: 1, overflowY: "auto" }}>
                <MyTeamGrowth />
              </div>
              <Footer tab="My Team" />
            </div>
          </div>
        </Frame>
      </div>

      {/* ── 7 · Workflows / History ───────────────────────────────────────── */}
      <div>
        <SectionLabel>7 · Workflows / History — Completed Workflows</SectionLabel>
        <Frame>
          <GlobalTopBar activeTab="Workflows" />
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <NxdSidebar activeTab="Workflows" activeItem="HI" />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "#fff" }}>
              <SubHeader tab="Workflows" subtitle="History · 4 completed workflows" />
              <div style={{ flex: 1, overflowY: "auto" }}>
                <WorkflowsHistory />
              </div>
              <Footer tab="Workflows" />
            </div>
          </div>
        </Frame>
      </div>

      {/* ── 8 · Search / Ask Bar — Focused with Suggestions ──────────────── */}
      <div>
        <SectionLabel>8 · Ask Bar — Focused State with Suggestions</SectionLabel>
        <Frame>
          {/* Custom top bar showing focused search state */}
          <div
            style={{
              height: 54,
              display: "flex",
              alignItems: "center",
              padding: "0 12px 0 20px",
              borderBottom: "1px solid #e5e5e5",
              background: "#fff",
              position: "relative",
              zIndex: 50,
              gap: 0,
            }}
          >
            {/* Logo placeholder */}
            <div style={{ width: 28, height: 32, marginRight: 20, flexShrink: 0 }}>
              <img
                alt="NXD"
                src="https://www.figma.com/api/mcp/asset/bdb8a941-3dbf-4aa1-8e1f-7f316e2e4330"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            {/* Nav tabs */}
            <nav style={{ display: "flex", alignItems: "stretch", height: "100%", marginRight: 24, flexShrink: 0 }}>
              {(["My Day", "My Team", "Workflows"] as const).map((tab) => (
                <div
                  key={tab}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: tab === "My Day" ? "#247BA0" : "#737373",
                    cursor: "default",
                  }}
                >
                  {tab}
                  {tab === "My Day" && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 16,
                        right: 16,
                        height: 2,
                        borderRadius: "2px 2px 0 0",
                        background: "#247BA0",
                      }}
                    />
                  )}
                </div>
              ))}
            </nav>
            {/* Focused search bar */}
            <div style={{ flex: 1, maxWidth: 640, margin: "0 auto", position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  height: 34,
                  padding: "0 12px",
                  borderRadius: 10,
                  border: "1px solid #247BA0",
                  background: "#fff",
                  boxShadow: "0 0 0 3px rgba(36,123,160,0.12)",
                }}
              >
                <Search size={13} strokeWidth={1.5} style={{ opacity: 0.35, flexShrink: 0, color: "#171717" }} />
                <span style={{ flex: 1, fontSize: 12.5, color: "#9ca3af" }}>Ask me anything… try &apos;Update Theo&apos;s start date&apos;</span>
              </div>
              {/* Dropdown */}
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  right: 0,
                  borderRadius: 12,
                  border: "1px solid #e5e5e5",
                  background: "#fff",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
                  zIndex: 100,
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: "10px 12px 6px" }}>
                  <span style={{ fontSize: 9.5, fontWeight: 600, color: "#6b7280", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Recent &amp; suggested
                  </span>
                </div>
                {SUGGESTIONS.map((s, i) => {
                  const cat = categoryColor(s.module);
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 12px",
                        background: i === 0 ? "#f5fafd" : "transparent",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 8.5,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "2px 6px",
                          borderRadius: 4,
                          border: `1px solid ${cat.border}`,
                          background: cat.bg,
                          color: cat.text,
                          flexShrink: 0,
                        }}
                      >
                        {s.module}
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 500, color: "#171717", lineHeight: 1.3 }}>{s.label}</span>
                        <span style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.3 }}>{s.description}</span>
                      </div>
                    </div>
                  );
                })}
                <div style={{ padding: "8px 12px", borderTop: "1px solid #f0f0f0" }}>
                  <span style={{ fontSize: 10, color: "#6b7280" }}>
                    Press{" "}
                    <kbd style={{ fontFamily: "monospace", background: "#f5f5f5", padding: "1px 4px", borderRadius: 3, fontSize: 9 }}>↵</kbd>
                    {" "}to execute ·{" "}
                    <kbd style={{ fontFamily: "monospace", background: "#f5f5f5", padding: "1px 4px", borderRadius: 3, fontSize: 9 }}>Esc</kbd>
                    {" "}to close
                  </span>
                </div>
              </div>
            </div>
            {/* Right utilities */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto", paddingLeft: 16, flexShrink: 0 }}>
              <div style={{ position: "relative", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bell size={16} strokeWidth={1.25} style={{ color: "#737373" }} />
                <span style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: "50%", background: "#ef4444", border: "2px solid #fff" }} />
              </div>
              <div style={{ width: 1, height: 20, background: "#e5e5e5" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#171717", lineHeight: 1 }}>Sarah Chen</span>
                  <span style={{ fontSize: 10.5, color: "#6b7280", lineHeight: 1 }}>Engineering Manager</span>
                </div>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: avatarColor("Sarah Chen"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  SC
                </div>
              </div>
            </div>
          </div>

          {/* Body beneath the open dropdown */}
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <NxdSidebar activeTab="My Day" activeItem="PR" />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "#fff" }}>
              <SubHeader tab="My Day" subtitle="Prioritize · 3 must-dos today" />
              <div style={{ flex: 1, overflowY: "hidden", position: "relative" }}>
                {/* Dim the content below */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.04)", zIndex: 1 }} />
                <MyDayPrioritize />
              </div>
              <Footer tab="My Day" />
            </div>
          </div>
        </Frame>
      </div>

    </div>
  );
}
