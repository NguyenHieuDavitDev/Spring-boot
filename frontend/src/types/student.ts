export type Gender = "MALE" | "FEMALE" | "OTHER";
export type StudentStatus = "STUDYING" | "PAUSED" | "GRADUATED";

export interface StudentRequest {
  middleName: string;
  firstName: string;
  cccd: string;
  gender: Gender;
  dateOfBirth: string; // yyyy-MM-dd
  status: StudentStatus;
}

export interface StudentResponse {
  id: number;
  fullName: string;
  cccd: string;
  gender: Gender;
  dateOfBirth: string;
  status: StudentStatus;
  imageUrl?: string;
}
