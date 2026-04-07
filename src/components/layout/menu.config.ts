import {
  LayoutDashboard,
  User,
  Stethoscope,
  CalendarClock,
  Calendar,
  User2,
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
      label: "All Users",
      path: "/admin/allUsers",
      icon: User2,
    },
    {
      label: "Unverified Users",
      path: "/admin/unverified-users",
      icon: User2,
    },
    {
      label: "Patients",
      path: "/admin/patients",
      icon: User,
    },
    {
      label: "Doctors",
      path: "/admin/doctors",
      icon: Stethoscope,
    },
    {
      label: "Pending Doctors",
      path: "/admin/pending-doctors",
      icon: Stethoscope,
    },
  ],

  DOCTOR: [
    {
      label: "Dashboard",
      path: "/doctor",
      icon: LayoutDashboard,
    },
    {
      label: "My Profile",
      path: "/doctor/profile",
      icon: Stethoscope,
    },
    {
      label: "Appointments",
      icon: CalendarClock,
      children: [
        {
          label: "Pending",
          path: "/doctor/appointments/pending-appointment",
        },
        {
          label: "Approved",
          path: "/doctor/appointments/approved-appointment",
        },
        {
          label: "Completed",
          path: "/doctor/appointments/completed-appointment",
        },
        {
          label: "Cancelled",
          path: "/doctor/appointments/canclled-appointment",
        },
      ]
    },
    {
      label: "My Schedules",
      icon: Calendar,
      path: "/doctor/my-schedules"
    }
  ],

  PATIENT: [
    {
      label: "Dashboard",
      path: "/patient",
      icon: LayoutDashboard,
    },
    {
      label: "My Profile",
      path: "/patient/profile",
      icon: User,
    },
    {
      label: "Book Appointment",
      path: "/patient/all-doctors",
      icon: CalendarClock
    }
  ],
};