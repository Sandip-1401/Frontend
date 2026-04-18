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
  created_at: string
};

export type UserWithSerial = User & {
  serial: number
}

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
  is_available: Boolean,
  status: string,
  user: User,
  department: Department,
  address: Address
  role: Role,
}

export type DoctorProfileResponse = {
  doctor: Doctor;
};

export interface NotificationData {
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

export interface AppointmentStatus {
  appointment_status_id: string,
  status_name: "APPROVED" | "CANCELLED" | "BOOKED" | "COMPLETED"
}

export interface Appointment {
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

export type DoctorWithSerial = Doctor & {
  serial: number
}

export interface DoctorSchedule {
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

export interface MedicalRecordCard {
  medical_record_id: string;
  diagnosis: string;
  notes: string;
  appointment: {
    appointment_date: string;
    appointment_time: string;
    reason: string;
  };
  patient: {
    user: {
      name: string;
    };
    gender: string;
    blood_group: string;
  };
}

export interface PrescriptionOfDoctor {
  prescription_id: string,
  prescribed_date: string,
  patient: {
    user: {
      name: string;
      email: string
    };
    gender: string;
    blood_group: string;
  },
  medical_record: {
    record_date: string
  }
}

export type PrescriptionsWithSerial = PrescriptionOfDoctor & {
  serial: number
}


export interface UserP {
  user_id: string;
  name: string;
  email: string;
  phone_number: string;
  status: string;
  is_active: boolean;
  is_verified: boolean;
}

export interface MedicineP {
  prescription_medicine_id: string;
  medicine_name: string;
  dosage: string;
  frequency: string; // e.g., "1-1-1"
  duration_days: number;
  unit_price: string;
}

export interface DoctorP {
  doctor_id: string;
  qualification: string;
  experience_years: number;
  consultation_fee: string;
  user: User;
}

export interface PatientP {
  patient_id: string;
  blood_group: string;
  date_of_birth: string;
  gender: string;
  height: string;
  weight: string;
  user: User;
}

export interface AppointmentP {
  appointment_id: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
}

export interface MedicalRecordP {
  medical_record_id: string;
  diagnosis: string;
  notes: string;
  record_date: string;
  appointment: AppointmentP;
}

export interface PrescriptionData {
  prescription_id: string;
  prescribed_date: string;
  notes: string;
  medicines: MedicineP[];
  doctor: DoctorP;
  patient: PatientP;
  medical_record: MedicalRecordP;
}

export interface BillOfDoctor {
  bill_id: string
  bill_number: string
  bill_date: string
  net_amount: string
  status: string
  appointment: {
    appointment_id: string
  }
  patient: {
    user: {
      name: string
      email: string
    }
  }
}

export type BillWithSerial = BillOfDoctor & {
  serial: number
}

export interface Item{
  bill_item_id: string
  item_type: string
  quantity: number
  unit_price: string
  amount: string
}
export interface Bill extends BillOfDoctor{
  total_amount: string
  discount_amount: string
  items: Item[]
  patient: PatientP
}