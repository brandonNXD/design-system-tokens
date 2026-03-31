import { Badge } from "@/components/ui/badge";

const queries = [
  { system: "Workday", detail: "Fetching employee record for Dorthe Hansen…" },
  { system: "Outlook", detail: "Scanning onboarding calendar events…" },
  { system: "Jira", detail: "Reviewing open onboarding tickets…" },
];

export function ThinkingIndicator() {
  return (
    <div className="flex flex-col gap-1 items-start">
      <Badge className="text-[10px] font-medium text-[oklch(0.556_0_0)] bg-transparent border border-[oklch(0.922_0_0)] tracking-[0.06em] px-1.5 py-0 rounded-sm">
        Assistant
      </Badge>
      <div className="max-w-[88%] px-4 py-3.5 rounded-tl-[14px] rounded-tr-[14px] rounded-br-[14px] rounded-bl-[4px] bg-black/[0.04] border border-black/[0.06]">
        {/* Animated dots + label */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-[4px] items-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block w-[5px] h-[5px] rounded-full bg-[#247BA0] opacity-60 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-[#247BA0] tracking-[0.08em] uppercase">
            Thinking
          </span>
        </div>

        {/* System queries */}
        <div className="flex flex-col gap-[6px]">
          {queries.map(({ system, detail }) => (
            <div key={system} className="flex items-start gap-2">
              <span
                className="mt-[2px] w-[6px] h-[6px] rounded-full shrink-0"
                style={{ background: "#247BA0", opacity: 0.35 }}
              />
              <div className="flex flex-col gap-[1px]">
                <span className="text-[11px] font-semibold text-[oklch(0.205_0_0)] leading-tight">
                  {system}
                </span>
                <span className="text-[11px] text-[oklch(0.556_0_0)] leading-tight">{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
