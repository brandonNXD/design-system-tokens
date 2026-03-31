import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Item = { text: string; bold?: string; suffix?: string };

const items: Item[] = [
  { text: "Start date updated to April 7, 2025 in ",  bold: "HCM" },
  { text: "Start date synced with ",                  bold: "Payroll" },
  { text: "Onboarding schedule updated in ",          bold: "HR Core" },
  { text: "Buddy meeting with Lars booked for ",      bold: "April 5, 14:00" },
  { text: "Welcome lunch invitation updated" },
  { text: "Reminder set for ", bold: "April 6", suffix: " – day before Dorthe arrives" },
];

export function ChangesApplied() {
  return (
    <Card className="bg-green-400/[0.06] ring-green-400/20 rounded-xl my-2">
      <CardHeader className="px-4 pt-4 pb-0">
        <CardTitle className="text-[11px] font-semibold text-green-400 tracking-[0.14em] uppercase">
          Changes Applied
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 flex flex-col">
        {items.map(({ text, bold, suffix }, i) => (
          <div
            key={i}
            className="text-[12.5px] text-foreground/70 py-[5px] pl-4 leading-[17.5px] whitespace-nowrap"
          >
            {text}
            {bold && <strong className="font-bold">{bold}</strong>}
            {suffix}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
