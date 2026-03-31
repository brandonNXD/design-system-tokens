import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const rows = [
  { label: "Employee",          value: "Dorthe Hansen",      className: "text-foreground/85" },
  { label: "Current start date", value: "March 24, 2025",    className: "text-foreground/85" },
  { label: "New start date",    value: "April 7, 2025",      className: "text-green-400" },
  { label: "Buddy meeting",     value: "To be rescheduled",  className: "text-amber-400" },
  { label: "Welcome lunch",     value: "To be rescheduled",  className: "text-amber-400" },
];

export function ProposedChanges() {
  return (
    <Card className="bg-foreground/[0.04] ring-border rounded-xl my-2">
      <CardHeader className="px-4 pt-4 pb-0">
        <CardTitle className="text-[10px] font-semibold text-foreground/30 tracking-[0.14em] uppercase">
          Proposed Changes
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {rows.map(({ label, value, className }, i) => (
          <div key={i}>
            <div className="flex justify-between items-center py-2 text-[12.5px]">
              <span className="text-muted-foreground">{label}</span>
              <span className={`font-medium ${className}`}>{value}</span>
            </div>
            {i < rows.length - 1 && <Separator className="bg-border/50" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
