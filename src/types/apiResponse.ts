import type { Role } from "./auth";

export type PatientData = null;

export type DoctorData = null;

export type Department = {
  department_id: string;
  department_name: string;
};

export type User = {
  user_id: string;
  name: string;
  email: string;
  phone_number: string;
  status: "ACTIVE" | string;
  is_active: boolean;
  is_verified: boolean;
};

export type Address = {
  address_id: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};
export type Patient = {
  patient_id: string;
  blood_group: string;
  date_of_birth: string;
  gender: "MALE" | "FEMALE" | string;
  height: string;
  weight: string;
  status: "ACTIVE" | string;
  created_at: string;
  updated_at: string;
  user: User;
  address: Address;
  Role: "PATIENT" | string;
};

export type PatientProfileResponse = {
  patient: Patient;
};

export interface DoctorDataType {
  doctor_id: string,
  qualification: string,
  experience_years: number,
  consultation_fee: number,
  status: string,
  user: User,
  department: Department
}

export type ScheduleResponse = {
  schedule_id: string;
  day_of_week: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  max_patients: number;
}

export type AppointmentCreate = {
  doctor_id: string,
  appointment_date: string
  appointment_time: string
  reason: string
}

export interface DoctorProfileType {
  doctor_id: string,
  qualification: string,
  experience_years: number,
  consultation_fee: number,
  status: string,
  user: User,
  department: Department,
  address: Address
  role: Role,
  is_available: boolean
}

export type Doctor = {
  doctor_id: string,
  qualification: string,
  experience_years: number,
  consultation_fee: string,
  is_available: true,
  status: string,
  user: User,
  department: Department,
  address: Address
  role: Role,
}

export type DoctorProfileResponse = {
  doctor: Doctor;
};

export interface NotificationData{
  notification_id: string
  receiver_id: string
  sender_id: string
  reference_id: string
  created_at: string
  type: string
  title: string
  message: string
  is_read: boolean
}

export interface AppointmentStatus{
  appointment_status_id: string,
  status_name: "APPROVED" | "CANCELLED" | "BOOKED" | "COMPLETED"
}

export interface Appointment{
  appointment_id: string
  appointment_date: string
  appointment_time: string
  reason: string
  created_at: string
  patient: Patient
  doctor: Doctor
  status: AppointmentStatus
}

export type PatientWithSerial = Patient & {
  serial: number
}

export type DoctorWithSerial = DoctorProfileType & {
  serial: number
}

export interface DoctorSchedule{
  schedule_id?: string
  day_of_week: string,
  start_time: string,
  end_time: string,
  slot_duration_minutes: number,
  max_patients: number
  doctor?: Doctor
}
// interface FormData {
//    day_of_week: DayOfWeek
//    start_time: string
//    end_time: string
//    slote_duration: number
//    max_patient: number
//    doctor?: Doctor
// }