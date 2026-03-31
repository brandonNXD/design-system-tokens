"use client";

import { useEffect } from "react";
import { X, Mail, Phone, Calendar, TrendingUp, ArrowLeftRight, Palmtree } from "lucide-react";
import { useEmployeeDrawer } from "@/context/employee-drawer-context";
import { avatarColor } from "@/lib/avatar-colors";
import { Employee } from "@/lib/employee-data";

const statusConfig = {
  overloaded: { label: "Overloaded", dot: "#DA0000", text: "#991b1b", bg: "#FEF2F2", border: "#FECACA" },
  watch:      { label: "Watch",      dot: "#c97f00", text: "#a16600", bg: "#fff8eb", border: "#fdd38a" },
  healthy:    { label: "Healthy",    dot: "#00A275", text: "#065f46", bg: "#F0FDF4", border: "#A7F3D0" },
};

export function DrawerContent({ employee, onClose }: { employee: Employee; onClose: () => void }) {
  const cfg = statusConfig[employee.status];
  const initials = employee.name.split(" ").map((n) => n[0]).join("");

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b shrink-0" style={{ borderColor: "#e5e5e5" }}>
        <span className="text-[11px] font-bold text-[#6b7280] tracking-[0.12em] uppercase">Employee Profile</span>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center text-[#6b7280] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto">

        {/* Profile section */}
        <div className="px-5 pt-5 pb-4 flex flex-col gap-4">
          {/* Avatar + name/role */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-[18px] font-bold text-white"
              style={{ background: avatarColor(employee.name) }}
            >
              {initials}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[15px] font-semibold text-[#171717] leading-tight">{employee.name}</span>
              <span className="text-[12px] text-[#6b7280]">{employee.role}</span>
              {/* Status badge */}
              <div
                className="flex items-center gap-1 mt-1 w-fit px-2 py-0.5 rounded-[6px] border"
                style={{ background: cfg.bg, borderColor: cfg.border }}
              >
                <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: cfg.dot }} />
                <span className="text-[9px] font-semibold" style={{ color: cfg.text }}>{cfg.label}</span>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${employee.email}`}
              className="flex items-center gap-2.5 text-[11.5px] text-[#555] hover:text-[#247BA0] transition-colors group"
            >
              <Mail size={13} className="shrink-0 text-[#9ca3af] group-hover:text-[#247BA0] transition-colors" />
              {employee.email}
            </a>
            <a
              href={`tel:${employee.phone}`}
              className="flex items-center gap-2.5 text-[11.5px] text-[#555] hover:text-[#247BA0] transition-colors group"
            >
              <Phone size={13} className="shrink-0 text-[#9ca3af] group-hover:text-[#247BA0] transition-colors" />
              {employee.phone}
            </a>
          </div>
        </div>

        <div className="mx-5 border-t" style={{ borderColor: "#f0f0f0" }} />

        {/* Quick Stats */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.12em] uppercase">Quick Stats</span>
          <div className="grid grid-cols-2 gap-2">
            {/* Vacation balance */}
            <div
              className="rounded-[12px] border p-3 flex flex-col gap-1"
              style={{ background: "#f9fafb", borderColor: "#e5e5e5" }}
            >
              <div className="flex items-center gap-1.5">
                <Palmtree size={12} className="text-[#9ca3af]" />
                <span className="text-[10px] text-[#9ca3af] font-medium">Vacation</span>
              </div>
              <span className="text-[15px] font-bold text-[#171717]">{employee.vacationBalance}</span>
              <span className="text-[10px] text-[#6b7280]">days left</span>
            </div>
            {/* Start date */}
            <div
              className="rounded-[12px] border p-3 flex flex-col gap-1"
              style={{ background: "#f9fafb", borderColor: "#e5e5e5" }}
            >
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-[#9ca3af]" />
                <span className="text-[10px] text-[#9ca3af] font-medium">Start Date</span>
              </div>
              <span className="text-[13px] font-bold text-[#171717] leading-tight">{employee.startDate}</span>
            </div>
          </div>

          {/* Capacity bar */}
          <div
            className="rounded-[12px] border p-3 flex flex-col gap-2"
            style={{ background: "#f9fafb", borderColor: "#e5e5e5" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#6b7280] font-medium">Current Capacity</span>
              <span className="text-[11px] font-bold tabular-nums" style={{ color: cfg.text }}>{employee.capacity}%</span>
            </div>
            <div className="h-[6px] rounded-full bg-[#e5e5e5] overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${employee.capacity}%`, background: cfg.dot }}
              />
            </div>
          </div>
        </div>

        <div className="mx-5 border-t" style={{ borderColor: "#f0f0f0" }} />

        {/* Status Insights */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.12em] uppercase">Status Insights</span>
          <div
            className="rounded-[12px] border px-3 py-3 flex flex-col gap-2"
            style={{ background: "#f9fafb", borderColor: "#e5e5e5" }}
          >
            {employee.evidenceBullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-[5px] h-[5px] rounded-full shrink-0"
                  style={{ background: cfg.dot }}
                />
                <span className="text-[11.5px] text-[#171717] leading-snug">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-5 border-t" style={{ borderColor: "#f0f0f0" }} />

        {/* Action Buttons */}
        <div className="px-5 py-4 flex flex-col gap-2.5">
          <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.12em] uppercase">Actions</span>

          <button
            type="button"
            className="flex items-center gap-2.5 w-full h-[38px] px-3.5 rounded-[10px] text-[12px] font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer shrink-0"
            style={{ background: "#247BA0" }}
          >
            <Calendar size={14} />
            Schedule 1:1
          </button>

          <button
            type="button"
            className="flex items-center gap-2.5 w-full h-[40px] px-3.5 rounded-[10px] text-[12px] font-semibold border transition-colors hover:bg-[#f5f5f5] cursor-pointer shrink-0"
            style={{ color: "#247BA0", borderColor: "#b3daea", background: "#ffffff" }}
          >
            <TrendingUp size={14} />
            View Growth Plan
          </button>

          <button
            type="button"
            className="flex items-center gap-2.5 w-full h-[40px] px-3.5 rounded-[10px] text-[12px] font-semibold border transition-colors hover:bg-[#f5f5f5] cursor-pointer shrink-0"
            style={{ color: "#555", borderColor: "#e5e5e5", background: "#ffffff" }}
          >
            <ArrowLeftRight size={14} />
            Reassign Tasks
          </button>
        </div>

        {/* Bottom padding */}
        <div className="h-4" />
      </div>
    </div>
  );
}

export function EmployeeDrawerSheet() {
  const { open, employee, closeDrawer } = useEmployeeDrawer();

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeDrawer]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-200"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        aria-hidden="true"
      />

      {/* Panel — font-sans ensures Inter is used regardless of portal/stacking context */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Employee profile"
        className="fixed inset-y-0 right-0 z-50 w-[340px] bg-white shadow-2xl transition-transform duration-250 ease-in-out font-sans"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        {employee && <DrawerContent employee={employee} onClose={closeDrawer} />}
      </div>
    </>
  );
}
