"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowUp, CheckCircle2 } from "lucide-react";
import { GlobalTopBar } from "@/components/global-top-bar";
import { NxdSidebar } from "@/components/nxd-sidebar";
import { MyDayPrioritize } from "@/components/my-day-prioritize";
import { MyTeamHealth } from "@/components/my-team-health";
import { Dl02Orchestration } from "@/components/dl02-orchestration";
import { ThinkingIndicator } from "@/components/thinking-indicator";
import { DrawerContent } from "@/components/employee-drawer";
import { getEmployeeById } from "@/lib/employee-data";

/* ─── Layout constants ───────────────────────────────────────────────────── */

const FRAME_W = 1440;
const FRAME_H = 900;
const TOPBAR_H = 54;
const SUBHEADER_H = 46;
const FOOTER_H = 38;
// content area = FRAME_H - TOPBAR_H - SUBHEADER_H - FOOTER_H = 762

/* ─── Frame wrapper — exactly 1440 × 900, clips overflow ─────────────────── */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: FRAME_W,
        height: FRAME_H,
        background: "#ffffff",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, system-ui, sans-serif",
        boxShadow: "0 0 0 1px #e5e5e5",
        borderRadius: "8px",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Frame label above each container ──────────────────────────────────── */

function Label({ index, title }: { index: number; title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#171717",
          color: "#fff",
          fontSize: 10,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {index}
      </span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#6b7280",
        }}
      >
        {title}
      </span>
    </div>
  );
}

/* ─── Sub-header ─────────────────────────────────────────────────────────── */

function SubHeader({ tab, subtitle }: { tab: string; subtitle: string }) {
  return (
    <div
      style={{
        height: SUBHEADER_H,
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

function BreadcrumbHeader({ confirmed = false }: { confirmed?: boolean }) {
  return (
    <div
      style={{
        height: SUBHEADER_H,
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
      <span style={{ fontSize: 11.5, fontWeight: 500, color: "#247BA0" }}>
        Onboarding: Dorthe Hansen
      </span>
      <Badge
        className="ml-auto text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px]"
        style={
          confirmed
            ? { background: "#f0fdf4", color: "#065f46", borderColor: "#a7f3d0" }
            : { background: "#eaf5f9", color: "#247BA0", borderColor: "#b3daea" }
        }
      >
        {confirmed ? "Complete" : "In Progress"}
      </Badge>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

function Footer({ tab }: { tab: string }) {
  return (
    <div
      style={{
        height: FOOTER_H,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        borderTop: "1px solid #e5e5e5",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.08em" }}>
        Nordic Experience Design
      </span>
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

/* ─── Chat bubbles ───────────────────────────────────────────────────────── */

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

/* ─── Workflow badge pill ─────────────────────────────────────────────────── */

function WorkflowPill() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Badge
        className="text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1 rounded-full border"
        style={{ background: "#ECEDFB", color: "#4338CA", borderColor: "#C7D2FE" }}
      >
        Workflow · Change of Start Date
      </Badge>
    </div>
  );
}

/* ─── Chat input (static) ────────────────────────────────────────────────── */

function ChatInput() {
  return (
    <div
      style={{
        padding: "14px 24px 18px",
        borderTop: "1px solid #e5e5e5",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderRadius: 14,
          padding: "0 17px",
          height: 50,
          border: "1px solid #e5e5e5",
          background: "#fafafa",
        }}
      >
        <input
          readOnly
          placeholder="Ask about this change…"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: 14,
            background: "transparent",
            color: "#171717",
            fontFamily: "Inter, system-ui, sans-serif",
            cursor: "text",
          }}
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
            cursor: "pointer",
          }}
        >
          <ArrowUp size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

/* ─── All-changes summary card ────────────────────────────────────────────── */

function ChangesAppliedCard() {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid #b3daea",
        padding: 16,
        background: "#f6fbfd",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <CheckCircle2
          size={16}
          strokeWidth={1.6}
          style={{ color: "#247BA0", flexShrink: 0 }}
        />
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
      <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingLeft: 24 }}>
        {[
          "HR / Payroll: Start date updated in Workday",
          "IT: Laptop delivery rescheduled to April 5",
          "Facilities: Desk & access card updated to April 7",
          "Calendar: All onboarding meetings shifted to week of April 7",
          "People: Theo Nakamura notified via Teams",
        ].map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span
              style={{ color: "#247BA0", fontSize: 11, flexShrink: 0, marginTop: 1 }}
            >
              ✓
            </span>
            <span style={{ fontSize: 12, color: "#4a6b7a" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Reusable content shell ─────────────────────────────────────────────── */

function Shell({
  activeTab,
  activeItem,
  header,
  children,
  footer,
}: {
  activeTab: "My Day" | "My Team" | "Workflows";
  activeItem: string;
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <>
      <GlobalTopBar activeTab={activeTab} />
      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
        <NxdSidebar activeTab={activeTab} activeItem={activeItem} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
            background: "#fff",
            overflow: "hidden",
          }}
        >
          {header}
          <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
          {footer ?? <Footer tab={activeTab} />}
        </div>
      </div>
    </>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function FigmaExport() {
  const theo = getEmployeeById("theo-nakamura")!;

  return (
    <div
      style={{
        background: "#f0f0f0",
        padding: "56px 72px",
        display: "flex",
        flexDirection: "column",
        gap: 72,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >

      {/* ── 1 · My Day (Prioritize) ──────────────────────────────────────── */}
      <div>
        <Label index={1} title="My Day (Prioritize)" />
        <Frame>
          <Shell
            activeTab="My Day"
            activeItem="PR"
            header={<SubHeader tab="My Day" subtitle="Prioritize · 3 must-dos today" />}
          >
            <MyDayPrioritize />
          </Shell>
        </Frame>
      </div>

      {/* ── 2 · My Team (Heatmap) ────────────────────────────────────────── */}
      <div>
        <Label index={2} title="My Team (Heatmap)" />
        <Frame>
          <Shell
            activeTab="My Team"
            activeItem="TH"
            header={<SubHeader tab="My Team" subtitle="Team Health · 2 risk signals" />}
          >
            <MyTeamHealth />
          </Shell>
        </Frame>
      </div>

      {/* ── 3 · My Team (Theo's Drawer Open) ────────────────────────────── */}
      <div>
        <Label index={3} title="My Team (Theo's Drawer Open)" />
        <Frame>
          <GlobalTopBar activeTab="My Team" />
          <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden", position: "relative" }}>
            <NxdSidebar activeTab="My Team" activeItem="TH" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minWidth: 0,
                background: "#fff",
                overflow: "hidden",
              }}
            >
              <SubHeader tab="My Team" subtitle="Team Health · 2 risk signals" />
              <div style={{ flex: 1, overflow: "hidden" }}>
                <MyTeamHealth />
              </div>
              <Footer tab="My Team" />
            </div>

            {/* Backdrop */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.20)",
                zIndex: 40,
                pointerEvents: "none",
              }}
            />
            {/* Drawer panel */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 340,
                background: "#fff",
                zIndex: 50,
                boxShadow: "-4px 0 32px rgba(0,0,0,0.12)",
                overflow: "hidden",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              <DrawerContent employee={theo} onClose={() => {}} />
            </div>
          </div>
        </Frame>
      </div>

      {/* ── 4 · Assistant (Thinking State) ───────────────────────────────── */}
      <div>
        <Label index={4} title="Assistant (Thinking State)" />
        <Frame>
          <Shell
            activeTab="Workflows"
            activeItem="AC"
            header={<BreadcrumbHeader />}
            footer={
              <>
                <ChatInput />
                <Footer tab="Workflows" />
              </>
            }
          >
            <div
              style={{
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                maxWidth: 680,
                margin: "0 auto",
                width: "100%",
              }}
            >
              <WorkflowPill />
              <UserMsg>
                Dorthe Hansen needs to push her start date back by one week — March 31 → April 7.
                Can you handle all the downstream updates?
              </UserMsg>
              <AssistantMsg>
                On it. Let me check Dorthe&apos;s record across your systems before making any
                changes.
              </AssistantMsg>
              <ThinkingIndicator />
            </div>
          </Shell>
        </Frame>
      </div>

      {/* ── 5 · Workflows (Orchestration Card) ───────────────────────────── */}
      <div>
        <Label index={5} title="Workflows (Orchestration Card)" />
        <Frame>
          <Shell
            activeTab="Workflows"
            activeItem="AC"
            header={<BreadcrumbHeader />}
            footer={
              <>
                <ChatInput />
                <Footer tab="Workflows" />
              </>
            }
          >
            <div
              style={{
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                maxWidth: 680,
                margin: "0 auto",
                width: "100%",
              }}
            >
              <WorkflowPill />
              <UserMsg>
                Dorthe Hansen needs to push her start date back by one week — March 31 → April 7.
                Can you handle all the downstream updates?
              </UserMsg>
              <AssistantMsg>
                I&apos;ve verified Dorthe&apos;s record across all five systems. Here&apos;s
                everything that will change — no manual work needed on your end.
              </AssistantMsg>
              <Dl02Orchestration onConfirm={() => {}} />
            </div>
          </Shell>
        </Frame>
      </div>

      {/* ── 6 · Workflows (Success / Confirmed State) ────────────────────── */}
      <div>
        <Label index={6} title="Workflows (Success / Confirmed State)" />
        <Frame>
          <Shell
            activeTab="Workflows"
            activeItem="AC"
            header={<BreadcrumbHeader confirmed />}
            footer={
              <>
                <ChatInput />
                <Footer tab="Workflows" />
              </>
            }
          >
            <div
              style={{
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                maxWidth: 680,
                margin: "0 auto",
                width: "100%",
              }}
            >
              <WorkflowPill />
              <UserMsg>
                Dorthe Hansen needs to push her start date back by one week — March 31 → April 7.
                Can you handle all the downstream updates?
              </UserMsg>
              <AssistantMsg>
                I&apos;ve verified Dorthe&apos;s record across all five systems. Here&apos;s
                everything that will change — no manual work needed on your end.
              </AssistantMsg>
              <ChangesAppliedCard />
              <AssistantMsg>
                All done. Dorthe has been notified of her new April 7 start date, and Theo has
                confirmed he&apos;s available for the buddy session.
              </AssistantMsg>
            </div>
          </Shell>
        </Frame>
      </div>

    </div>
  );
}
