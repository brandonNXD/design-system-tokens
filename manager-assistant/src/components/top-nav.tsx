import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const tabs = ["My Day", "My Team", "My Assistant"] as const;
type Tab = (typeof tabs)[number];

interface TopNavProps {
  activeTab?: Tab;
}

export function TopNav({ activeTab = "My Assistant" }: TopNavProps) {
  return (
    <nav className="flex items-center justify-between px-10 h-[75px] bg-nav border-b border-border shrink-0">
      <span className="text-[12px] font-medium text-foreground/40 tracking-[0.18em] uppercase">
        Manager Assistant
      </span>

      <div className="flex border border-border rounded-md overflow-hidden">
        {tabs.map((tab, i) => (
          <div key={tab} className="flex">
            <Button
              variant="ghost"
              className={`px-7 py-[9px] h-auto text-[11px] font-semibold tracking-[0.16em] uppercase rounded-none transition-colors ${
                tab === activeTab
                  ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                  : "bg-transparent text-foreground/40 hover:bg-transparent hover:text-foreground/60"
              }`}
            >
              {tab}
            </Button>
            {i < tabs.length - 1 && (
              <Separator orientation="vertical" className="bg-border h-auto" />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-[10px]">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback
            className="text-[12px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #4f6ef7 0%, #7c3aed 100%)" }}
          >
            B
          </AvatarFallback>
        </Avatar>
        <span className="text-[13px] text-muted-foreground">Brandon Herdrick</span>
      </div>
    </nav>
  );
}
