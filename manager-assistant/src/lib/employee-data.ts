/**
 * Centralised employee data — single source of truth for the drawer,
 * heatmap, prioritize list, and any other surface that references team members.
 */

export type EmployeeStatus = "overloaded" | "watch" | "healthy";

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  capacity: number;
  status: EmployeeStatus;
  /** Days of vacation remaining this year */
  vacationBalance: number;
  /** Formatted month + year, e.g. "March 2022" */
  startDate: string;
  /** Bullet-point evidence shown in the drawer's Status Insights section */
  evidenceBullets: string[];
}

export const employees: Employee[] = [
  {
    id: "theo-nakamura",
    name: "Theo Nakamura",
    role: "Product Designer",
    email: "theo.nakamura@nxd.com",
    phone: "+1 (415) 555-0142",
    capacity: 100,
    status: "overloaded",
    vacationBalance: 14,
    startDate: "January 2021",
    evidenceBullets: [
      "12 hours of meetings this week",
      "Late-night commits 4 nights this week",
      "No vacation in 90+ days",
      "Sprint load at 140% of target",
    ],
  },
  {
    id: "anna-lindqvist",
    name: "Anna Lindqvist",
    role: "Senior Engineer",
    email: "anna.lindqvist@nxd.com",
    phone: "+1 (415) 555-0186",
    capacity: 78,
    status: "watch",
    vacationBalance: 22,
    startDate: "March 2022",
    evidenceBullets: [
      "Utilization at 78% for 3 consecutive weeks",
      "2 deliverables overlapping next sprint",
      "Last 1:1 was 18 days ago",
    ],
  },
  {
    id: "marcus-lee",
    name: "Marcus Lee",
    role: "Data Engineer",
    email: "marcus.lee@nxd.com",
    phone: "+1 (415) 555-0231",
    capacity: 62,
    status: "healthy",
    vacationBalance: 18,
    startDate: "June 2022",
    evidenceBullets: [
      "Capacity stable at 62% for 4 weeks",
      "All sprint tasks on track",
    ],
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Frontend Engineer",
    email: "priya.sharma@nxd.com",
    phone: "+1 (415) 555-0309",
    capacity: 75,
    status: "healthy",
    vacationBalance: 10,
    startDate: "September 2021",
    evidenceBullets: [
      "Utilization healthy at 75%",
      "Completed 3 of 4 Q1 goals",
    ],
  },
  {
    id: "jonas-eriksson",
    name: "Jonas Eriksson",
    role: "Backend Engineer",
    email: "jonas.eriksson@nxd.com",
    phone: "+1 (415) 555-0417",
    capacity: 95,
    status: "overloaded",
    vacationBalance: 7,
    startDate: "November 2020",
    evidenceBullets: [
      "Utilization >90% for 3 consecutive weeks",
      "On-call rotation added 6 extra hours",
      "Zero PTO taken in 4 months",
    ],
  },
  {
    id: "camille-dupont",
    name: "Camille Dupont",
    role: "ML Engineer",
    email: "camille.dupont@nxd.com",
    phone: "+1 (415) 555-0523",
    capacity: 60,
    status: "healthy",
    vacationBalance: 20,
    startDate: "May 2023",
    evidenceBullets: [
      "Capacity at 60%, well within target range",
      "Model training pipeline shipped on time",
    ],
  },
  {
    id: "liam-brennan",
    name: "Liam Brennan",
    role: "DevOps",
    email: "liam.brennan@nxd.com",
    phone: "+1 (415) 555-0674",
    capacity: 71,
    status: "healthy",
    vacationBalance: 16,
    startDate: "August 2022",
    evidenceBullets: [
      "Infra incidents down 40% this quarter",
      "All CI pipelines green for 2 weeks",
    ],
  },
  {
    id: "sofia-andersen",
    name: "Sofia Andersen",
    role: "QA Engineer",
    email: "sofia.andersen@nxd.com",
    phone: "+1 (415) 555-0788",
    capacity: 48,
    status: "healthy",
    vacationBalance: 25,
    startDate: "February 2023",
    evidenceBullets: [
      "Capacity comfortable at 48%",
      "Test coverage increased to 84% this sprint",
    ],
  },
  {
    id: "dorthe-hansen",
    name: "Dorthe Hansen",
    role: "Senior Engineer",
    email: "dorthe.hansen@nxd.com",
    phone: "+1 (415) 555-0851",
    capacity: 0,
    status: "healthy",
    vacationBalance: 22,
    startDate: "April 2026",
    evidenceBullets: [
      "Start date change requested · March 31 → April 7",
      "Buddy assignment pending confirmation",
      "5 systems will update on start date",
    ],
  },
];

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find((e) => e.id === id);
}

export function getEmployeeByName(name: string): Employee | undefined {
  return employees.find((e) => e.name === name);
}

/** Converts a display name to the kebab-case id used in the employees array. */
export function nameToId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
