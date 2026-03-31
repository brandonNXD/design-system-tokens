export function PageHeader() {
  return (
    <div className="flex flex-col gap-[6px] px-10 pt-8 pb-6 border-b border-border shrink-0">
      <p className="text-[11px] text-foreground/35 tracking-[0.2em] uppercase">
        My Assistant
      </p>
      <p className="text-[13px] font-medium text-muted-foreground tracking-[0.08em] uppercase">
        Example: Orchestration of change to start date
      </p>
    </div>
  );
}
