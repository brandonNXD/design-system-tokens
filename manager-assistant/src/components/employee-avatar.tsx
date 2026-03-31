"use client";

import { avatarColor } from "@/lib/avatar-colors";
import { nameToId } from "@/lib/employee-data";
import { useEmployeeDrawer } from "@/context/employee-drawer-context";

interface EmployeeAvatarProps {
  name: string;
  /** sm = 24px · md = 28px · lg = 40px */
  size?: "sm" | "md" | "lg";
  /** When true, renders the name text next to the avatar */
  showName?: boolean;
  nameClassName?: string;
}

const sizeMap = {
  sm: { wrapper: "w-6 h-6", text: "text-[9px]" },
  md: { wrapper: "w-7 h-7", text: "text-[10px]" },
  lg: { wrapper: "w-10 h-10", text: "text-[13px]" },
};

export function EmployeeAvatar({
  name,
  size = "md",
  showName = false,
  nameClassName = "text-[12.5px] font-semibold text-[#171717]",
}: EmployeeAvatarProps) {
  const { openDrawer } = useEmployeeDrawer();
  const initials = name.split(" ").map((n) => n[0]).join("");
  const { wrapper, text } = sizeMap[size];

  function handleClick() {
    openDrawer(nameToId(name));
  }

  if (showName) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div
          className={`${wrapper} rounded-full flex items-center justify-center shrink-0 font-bold text-white ${text} transition-opacity group-hover:opacity-80`}
          style={{ background: avatarColor(name) }}
        >
          {initials}
        </div>
        <span className={`${nameClassName} group-hover:underline underline-offset-2 decoration-[#999]`}>
          {name}
        </span>
      </button>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      // hover:opacity-80 — when the avatar itself is hovered
      // group-hover:opacity-80 — when a parent wrapper has class "group" and is hovered
      className={`${wrapper} rounded-full flex items-center justify-center shrink-0 font-bold text-white ${text} cursor-pointer transition-opacity hover:opacity-80 group-hover:opacity-80`}
      style={{ background: avatarColor(name) }}
    >
      {initials}
    </div>
  );
}

/** Standalone clickable name — triggers the same drawer without the avatar. */
export function EmployeeName({
  name,
  className = "text-[12.5px] font-semibold text-[#171717]",
}: {
  name: string;
  className?: string;
}) {
  const { openDrawer } = useEmployeeDrawer();
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={() => openDrawer(nameToId(name))}
      onKeyDown={(e) => e.key === "Enter" && openDrawer(nameToId(name))}
      // hover:underline — when the name itself is hovered
      // group-hover:underline — when a parent wrapper has class "group" and is hovered
      className={`${className} cursor-pointer hover:underline group-hover:underline underline-offset-2 decoration-[#999]`}
    >
      {name}
    </span>
  );
}
