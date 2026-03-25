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
