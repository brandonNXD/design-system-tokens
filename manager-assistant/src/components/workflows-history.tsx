import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, FileText } from "lucide-react";
import { categoryColor } from "@/lib/category-colors";

const auditTrail = [
  {
    id: "at1",
    code: "Workflow",
    name: "Start Date Change",
    person: "Dorthe Hansen",
    meta: "Completed March 22, 2026 · 5 systems updated · Approved by Sarah Chen",
  },
  {
    id: "at2",
    code: "Workflow",
    name: "New Hire Onboarding",
    person: "Marcus Lee",
    meta: "Completed March 1, 2026 · 7 systems updated",
  },
  {
    id: "at3",
    code: "Team Health",
    name: "Sick Day Coverage",
    person: "Jonas Eriksson",
    meta: "Completed March 18, 2026 · Calendar + Jira updated",
  },
  {
    id: "at4",
    code: "Workflow",
    name: "Buddy Assignment",
    person: "Theo Nakamura",
    meta: "Completed Feb 14, 2026 · Teams notification sent",
  },
];

const documents = [
  {
    id: "doc1",
    name: "Dorthe Hansen",
    docType: "Amended Contract (Start Date)",
    date: "March 22, 2026",
  },
  {
    id: "doc2",
    name: "Marcus Lee",
    docType: "Onboarding Confirmation",
    date: "March 1, 2026",
  },
  {
    id: "doc3",
    name: "Priya Sharma",
    docType: "Promotion Letter Draft",
    date: "March 10, 2026",
  },
];

export function WorkflowsHistory() {
  return (
    <div className="flex flex-col gap-5 max-w-[720px] mx-auto px-6 py-8">

      {/* Section: Audit Trail */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Audit Trail
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span
          className="text-[9px] font-semibold tracking-[0.06em] border px-2 py-0.5 rounded-[6px]"
          style={{ background: "#F0FDF4", color: "#065f46", borderColor: "#A7F3D0" }}
        >
          4 completed
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {auditTrail.map(({ id, code, name, person, meta }) => {
          const cat = categoryColor(code);
          return (
          <div
            key={id}
            className="rounded-[16px] border overflow-hidden transition-shadow hover:shadow-sm"
            style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
          >
            {/* Left accent border via inner layout */}
            <div className="flex">
              {/* Accent bar */}
              <div
                className="w-[3px] shrink-0 rounded-l-[16px]"
                style={{ background: "#247BA0" }}
              />
              <div className="flex-1 px-4 py-3.5 flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    {/* Checkmark */}
                    <CheckCircle2 size={20} strokeWidth={1.5} style={{ color: "#247BA0", flexShrink: 0 }} />
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="text-[9px] font-bold tracking-[0.08em] uppercase px-1.5 py-0.5 rounded-[4px] border shrink-0"
                        style={{ background: cat.bg, color: cat.text, borderColor: cat.border }}
                      >
                        {code}
                      </span>
                      <span className="text-[12.5px] font-semibold text-[#171717] truncate">{name}</span>
                      <span className="text-[11.5px] text-[#6b7280] shrink-0">· {person}</span>
                    </div>
                  </div>
                  <span className="text-[11.5px] text-[#555] pl-7 leading-snug">{meta}</span>
                </div>
                <Button
                  size="sm"
                  className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border shrink-0 transition-opacity hover:opacity-85"
                  style={{ background: "#fff", color: "#555", borderColor: "#e5e5e5" }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {/* Section: Documents */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.14em] uppercase shrink-0">
          Documents
        </span>
        <Separator className="flex-1" style={{ background: "#efefef" }} />
        <span className="text-[10px] text-[#6b7280]">Recent generated</span>
      </div>

      <div className="flex flex-col gap-2">
        {documents.map(({ id, name, docType, date }) => (
          <div
            key={id}
            className="rounded-[16px] border px-4 py-3 flex items-center justify-between gap-3 transition-shadow hover:shadow-sm"
            style={{ background: "#ffffff", borderColor: "#e5e5e5" }}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Document icon */}
              <div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 border"
                style={{ background: "#f6fbfd", borderColor: "#b3daea" }}
              >
                <FileText size={15} strokeWidth={1.4} style={{ color: "#247BA0" }} />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[12.5px] font-semibold text-[#171717] truncate">
                  {name} — {docType}
                </span>
                <span className="text-[11px] text-[#6b7280]">{date}</span>
              </div>
            </div>
            <Button
              size="sm"
              className="h-7 px-3 text-[11.5px] font-semibold rounded-[8px] border shrink-0 transition-opacity hover:opacity-85"
              style={{ background: "#247BA0", color: "#fff", borderColor: "#247BA0" }}
            >
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
