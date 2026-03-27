import {
  LayoutDashboard,
  User,
  Stethoscope,
  Users,
  DotIcon,
  LucidePlugZap,
  Dock,
} from "lucide-react";

export type Role = "ADMIN" | "DOCTOR" | "PATIENT";

export type MenuItem = {
  label: string;
  path?: string;
  icon?: any;
  children?: MenuItem[];
};

export const menuConfig: Record<Role, MenuItem[]> = {
  ADMIN: [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Patients",
      path: "/admin/patients",
      icon: LayoutDashboard,
    },
    {
      label: "Management",
      icon: Users,
      children: [
        {
          label: "Users",
          path: "/admin/users",
        },
        {
          label: "Departments",
          path: "/admin/departments",
        },
      ],
    },
  ],

  DOCTOR: [
    {
      label: "Dashboard",
      path: "/doctor",
      icon: LayoutDashboard,
    },
    {
      label: "Patient",
      path: "/doctor/app",
      icon: Stethoscope,
    },
  ],

  PATIENT: [
    {
      label: "Dashboard",
      path: "/patient",
      icon: LayoutDashboard,
    },
    {
      label: "Profiles",
      path: "/patient/profile",
      icon: User,
    },
    {
      label: "Book Appointment",
      path: "/patient/all-doctors",
      icon: Dock
    }
  ],
};