import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AssistantMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 items-start">
      <Badge className="text-[10px] font-medium text-foreground/25 bg-transparent border border-border tracking-[0.06em] px-1 py-0 rounded-sm">
        Assistant
      </Badge>
      <div className="max-w-[88%] px-[15px] py-[10.47px] rounded-tl-[14px] rounded-tr-[14px] rounded-br-[14px] rounded-bl-[4px] bg-foreground/[0.07] text-[13.5px] leading-[1.55] text-foreground/90 tracking-[0.01em]">
        {children}
      </div>
    </div>
  );
}

export function UserMsg({
  children,
  sender,
}: {
  children: React.ReactNode;
  sender: string;
}) {
  return (
    <div className="flex flex-col gap-1 items-end">
      <div className="max-w-[88%] px-[15px] py-[10.47px] rounded-tl-[14px] rounded-tr-[14px] rounded-bl-[14px] rounded-br-[4px] bg-chat-user text-[13.5px] leading-[1.55] text-white tracking-[0.01em]">
        {children}
      </div>
      <Badge className="text-[10px] font-medium text-foreground/25 bg-transparent border border-border tracking-[0.06em] px-1 py-0 rounded-sm">
        {sender}
      </Badge>
    </div>
  );
}

export function SuggestionChip({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="outline"
      className="px-[15px] py-[9px] h-auto bg-blue-600/10 border-blue-600/30 text-blue-300 text-[12.5px] w-fit rounded-lg hover:bg-blue-600/20 hover:text-blue-300"
    >
      {children}
    </Button>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-[14px] py-[10px] bg-foreground/[0.05] rounded-[14px] rounded-bl-[4px] w-[51px]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[5px] h-[5px] bg-foreground/40 rounded-[2.5px] opacity-30"
        />
      ))}
    </div>
  );
}
