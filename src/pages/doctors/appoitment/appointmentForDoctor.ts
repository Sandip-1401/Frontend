export interface User {
   user_id: string,
   name: string,
   email: string,
   phone_number: string
}

export interface Patient {
   patient_id: string,
   blood_group: string,
   date_of_birth: string,
   gender: string
   height: string
   weight: string
   user: User
}

export interface Status {
   appointment_status_id: string,
   status_name: string,
}

export interface Doctor {
   doctor_id: string,
   qualification: string,
   experience_years: number,
   consultation_fee: string,
   is_available: true,
   status: string,
}

export interface AppointmentForDoctor {
   appointment_id?: string,
   appointment_date: string,
   appointment_time: string,
   reason?: string,
   created_at: string,
   patient: Patient
   status: Status,
   doctor?: Doctor
}

export type AppointmentWithSerial = AppointmentForDoctor & {
  serial: number;
}