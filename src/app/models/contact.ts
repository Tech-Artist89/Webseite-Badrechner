export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  service?: string;
  urgent?: boolean;
}

export interface ContactInfo {
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  phone: string;
  email: string;
  emergencyPhone: string;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}