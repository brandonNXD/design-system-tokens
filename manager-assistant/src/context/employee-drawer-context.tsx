"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Employee, getEmployeeById } from "@/lib/employee-data";

interface EmployeeDrawerContextValue {
  open: boolean;
  employee: Employee | null;
  openDrawer: (employeeId: string) => void;
  closeDrawer: () => void;
}

const EmployeeDrawerContext = createContext<EmployeeDrawerContextValue>({
  open: false,
  employee: null,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export function EmployeeDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState<Employee | null>(null);

  // Support ?drawer=<employeeId> for deep-linking / Figma captures
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("drawer");
    if (id) {
      const emp = getEmployeeById(id);
      if (emp) { setEmployee(emp); setOpen(true); }
    }
  }, []);

  function openDrawer(employeeId: string) {
    const emp = getEmployeeById(employeeId);
    if (emp) {
      setEmployee(emp);
      setOpen(true);
    }
  }

  function closeDrawer() {
    setOpen(false);
  }

  return (
    <EmployeeDrawerContext.Provider value={{ open, employee, openDrawer, closeDrawer }}>
      {children}
    </EmployeeDrawerContext.Provider>
  );
}

export function useEmployeeDrawer() {
  return useContext(EmployeeDrawerContext);
}
