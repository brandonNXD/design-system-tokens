"use client";

import { ReactNode } from "react";
import { EmployeeDrawerProvider } from "@/context/employee-drawer-context";
import { EmployeeDrawerSheet } from "@/components/employee-drawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <EmployeeDrawerProvider>
      {children}
      {/* Global employee drawer — rendered once at root, triggered from anywhere */}
      <EmployeeDrawerSheet />
    </EmployeeDrawerProvider>
  );
}
