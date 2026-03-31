import { TopNav } from "@/components/top-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/* ─── Data ─────────────────────────────────────────────────── */

type Priority = "urgent-action" | "wait-action" | "ai-handles";

interface Task {
  id: number;
  title: string;
  time: string;
  tag: string;
  priority: Priority;
  canApprove?: boolean;
}

const tasks: Task[] = [
  { id: 1, title: "Review Q1 performance reports",  time: "9:00 AM",  tag: "Review",         priority: "urgent-action" },
  { id: 2, title: "Approve vacation requests",       time: "11:00 AM", tag: "Administrative", priority: "urgent-action",  canApprove: true },
  { id: 3, title: "Review hiring pipeline",          time: "2:00 PM",  tag: "Strategic",      priority: "urgent-action",  canApprove: true },
  { id: 4, title: "1:1 with Sarah Jensen",           time: "10:30 AM", tag: "Meeting",        priority: "wait-action" },
  { id: 5, title: "Budget planning for Q2",          time: "3:30 PM",  tag: "Planning",       priority: "wait-action",    canApprove: true },
  { id: 6, title: "Team lunch – New project kickoff",time: "12:00 PM", tag: "Meeting",        priority: "ai-handles" },
  { id: 7, title: "Sign off on marketing materials", time: "4:00 PM",  tag: "Review",         priority: "ai-handles",     canApprove: true },
];

const upcomingEvents = [
  { title: "Department All-Hands",   when: "Tomorrow, 2:00 PM" },
  { title: "Leadership Offsite",     when: "Friday, All day" },
  { title: "Performance Reviews Due",when: "March 1st" },
];

/* ─── Priority config ───────────────────────────────────────── */

const priorityConfig: Record<Priority, { label: string; labelColor: string; cardBg: string; cardRing: string }> = {
  "urgent-action": {
    label: "Urgent — Requires your action",
    labelColor: "text-red-400",
    cardBg: "bg-red-500/[0.04]",
    cardRing: "ring-red-500/20",
  },
  "wait-action": {
    label: "Requires your action, but can wait",
    labelColor: "text-amber-400",
    cardBg: "bg-amber-500/[0.04]",
    cardRing: "ring-amber-500/20",
  },
  "ai-handles": {
    label: "Urgent — I can do this",
    labelColor: "text-teal-400",
    cardBg: "bg-teal-500/[0.04]",
    cardRing: "ring-teal-500/20",
  },
};

const priorityOrder: Priority[] = ["urgent-action", "wait-action", "ai-handles"];

/* ─── Sub-components ────────────────────────────────────────── */

function TaskCard({ task }: { task: Task }) {
  const { cardBg, cardRing } = priorityConfig[task.priority];
  return (
    <Card className={`${cardBg} ${cardRing} rounded-xl`}>
      <CardContent className="px-5 py-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <p className="text-[14px] font-medium text-foreground leading-snug">{task.title}</p>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-muted-foreground flex items-center gap-1">
              <span className="opacity-60">⏰</span> {task.time}
            </span>
            <Badge className="text-[10px] bg-foreground/[0.06] text-foreground/50 border-transparent px-2 py-0 rounded-md">
              {task.tag}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm"
            className="h-7 px-3 text-[11px] bg-transparent border-border text-foreground/60 hover:text-foreground hover:bg-foreground/[0.06] gap-1.5">
            <span className="opacity-60">👁</span> Review
          </Button>
          <Button variant="outline" size="sm"
            className="h-7 px-3 text-[11px] bg-transparent border-border text-foreground/60 hover:text-foreground hover:bg-foreground/[0.06] gap-1.5">
            <span className="opacity-60">🚫</span> Ignore Today
          </Button>
          {task.canApprove && (
            <>
              <Button size="sm"
                className="h-7 px-3 text-[11px] bg-chat-user hover:bg-blue-700 text-white border-none gap-1.5">
                ✓ Approve
              </Button>
              <Button variant="outline" size="sm"
                className="h-7 px-3 text-[11px] bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/[0.08] hover:text-red-300 gap-1.5">
                ✕ Decline
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function MyDayPage() {
  const tasksByPriority = (p: Priority) => tasks.filter((t) => t.priority === p);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-[family-name:var(--font-sans)]">
      <TopNav activeTab="My Day" />

      {/* Hero */}
      <div
        className="relative h-[200px] shrink-0 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a2e1a 0%, #0f2820 40%, #152a25 70%, #1a1f1a 100%)",
        }}
      >
        {/* Subtle organic texture overlay */}
        <div className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(74,222,128,0.15) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 30% 70%, rgba(52,211,153,0.1) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 flex flex-col justify-end px-10 pb-8 h-full">
          <h1 className="text-[28px] font-semibold text-white mb-1">Good morning, Brandon</h1>
          <p className="text-[14px] text-white/60">You have 5 tasks and 2 meetings today</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-8 px-10 py-8 min-h-0">

        {/* ── Left: Task list ── */}
        <div className="flex-1 flex flex-col gap-8 min-w-0">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[16px] font-semibold text-foreground">Today&apos;s Tasks</h2>
            <span className="text-[12px] text-muted-foreground">{tasks.length} pending</span>
          </div>

          {priorityOrder.map((priority) => {
            const group = tasksByPriority(priority);
            if (!group.length) return null;
            const { label, labelColor } = priorityConfig[priority];
            return (
              <div key={priority} className="flex flex-col gap-3">
                <p className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${labelColor}`}>
                  {label}
                </p>
                {group.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            );
          })}
        </div>

        {/* ── Right: Sidebar ── */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">

          {/* Upcoming */}
          <Card className="bg-foreground/[0.04] ring-border rounded-xl">
            <CardHeader className="px-5 pt-5 pb-0">
              <CardTitle className="text-[13px] font-semibold text-foreground/80 flex items-center gap-2">
                <span className="text-[15px]">📅</span> Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4 pt-3 flex flex-col">
              {upcomingEvents.map((ev, i) => (
                <div key={i}>
                  <div className="py-3">
                    <p className="text-[13px] text-foreground/80 font-medium">{ev.title}</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">{ev.when}</p>
                  </div>
                  {i < upcomingEvents.length - 1 && <Separator className="bg-border/50" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Daily Insight */}
          <Card
            className="rounded-xl ring-0 border-0"
            style={{ background: "linear-gradient(135deg, #2d4a3e 0%, #1e3a32 100%)" }}
          >
            <CardHeader className="px-5 pt-5 pb-0">
              <CardTitle className="text-[13px] font-semibold text-teal-300 flex items-center gap-2">
                <span>✦</span> Daily Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-3">
              <p className="text-[13px] text-white/75 leading-relaxed">
                Your team&apos;s productivity increased by 12% this week. Consider scheduling a team
                appreciation moment during today&apos;s lunch.
              </p>
            </CardContent>
          </Card>

          {/* Quote card */}
          <div
            className="rounded-xl overflow-hidden relative h-[160px]"
            style={{
              background: "linear-gradient(135deg, #1a2e1a 0%, #0f2820 60%, #162820 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-15"
              style={{
                background: "radial-gradient(ellipse 80% 80% at 60% 30%, rgba(74,222,128,0.25) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 flex items-end h-full px-5 pb-5">
              <p className="text-[13px] text-white/60 italic leading-snug">
                &ldquo;The best time for planning is when you&apos;re at peace&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-10 py-[13px] border-t border-border">
        <span className="text-[10px] text-foreground/20 tracking-[0.08em]">Nordic Experience Design</span>
        <span className="text-[10px] text-foreground/20 tracking-[0.08em]">Manager Assistant · My Day</span>
      </div>
    </div>
  );
}
