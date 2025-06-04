export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  description: string;
  email?: string;
  phone?: string;
  image?: string;
  specialties: string[];
  experience: number;
}