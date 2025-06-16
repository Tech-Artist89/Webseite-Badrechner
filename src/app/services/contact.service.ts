import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ContactForm } from '../models/contact';

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitContact(contactData: ContactForm): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.apiUrl}/contact`, contactData);
  }
}