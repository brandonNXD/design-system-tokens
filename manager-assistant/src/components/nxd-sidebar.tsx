import { cn } from "@/lib/utils";
import {
  ListChecks, CalendarDays, Activity, TrendingUp, Zap, History,
  type LucideIcon,
} from "lucide-react";

/* ─── Contextual sidebar items per top-level tab ─────────────────────────── */

const SIDEBAR_MAP: Record<string, { code: string; label: string; Icon: LucideIcon }[]> = {
  "My Day": [
    { code: "PR", label: "Prioritize", Icon: ListChecks },
    { code: "SC", label: "Schedule",   Icon: CalendarDays },
  ],
  "My Team": [
    { code: "TH", label: "Team Health", Icon: Activity },
    { code: "GR", label: "Growth",      Icon: TrendingUp },
  ],
  Workflows: [
    { code: "AC", label: "Active",  Icon: Zap },
    { code: "HI", label: "History", Icon: History },
  ],
};

type Tab = "My Day" | "My Team" | "Workflows";

interface NxdSidebarProps {
  activeTab?: Tab;
  activeItem?: string;
  onItemChange?: (code: string) => void;
}

export function NxdSidebar({ activeTab = "Workflows", activeItem, onItemChange }: NxdSidebarProps) {
  const items = SIDEBAR_MAP[activeTab] ?? SIDEBAR_MAP["Workflows"];
  const resolvedActive = activeItem ?? items[0]?.code;

  return (
    <aside className="w-[76px] sm:w-[88px] flex flex-col items-center pt-5 gap-1 border-r border-border bg-[#fafafa] shrink-0">
      {/* Section label */}
      <span className="text-[8px] font-bold tracking-[0.14em] uppercase text-[#6b7280] mb-1 px-2 text-center leading-tight">
        {activeTab}
      </span>

      {items.map(({ code, label, Icon }) => {
        const isActive = code === resolvedActive;
        return (
          <button
            key={code}
            onClick={() => onItemChange?.(code)}
            className={cn(
              "w-[60px] sm:w-[68px] h-[52px] sm:h-[58px] rounded-[14px] flex flex-col items-center justify-center gap-[5px] transition-all cursor-pointer select-none",
              isActive
                ? "text-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]"
                : "text-[#737373] hover:bg-black/5 hover:text-[#171717]"
            )}
            style={isActive ? { background: "#247BA0" } : {}}
          >
            <Icon size={18} strokeWidth={1.75} />
            <span className="text-[8.5px] font-medium leading-none whitespace-nowrap">
              {label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
