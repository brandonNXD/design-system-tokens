import { cn } from "@/lib/utils";

interface ChatColumnProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function ChatColumn({ label, children, className }: ChatColumnProps) {
  return (
    <div className={cn("flex-1 flex flex-col gap-6 p-8", className)}>
      <p className="text-[10px] font-semibold text-foreground/25 tracking-[0.22em] uppercase shrink-0">
        {label}
      </p>
      <div className="flex flex-col gap-[14px] flex-1">{children}</div>
    </div>
  );
}
