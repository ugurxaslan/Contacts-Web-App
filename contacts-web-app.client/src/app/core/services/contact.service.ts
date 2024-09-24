import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { AddContactRequestDTO } from '../models/addContactRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'https://localhost:44377/api/Contact';

  constructor(private http: HttpClient) {}

  getContacts(userId: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/${userId}`);
  }
  addContact(userId: string, dto: AddContactRequestDTO): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/${userId}`, dto);
  }
  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}`, contact);
  }
  deleteContact(contactId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${contactId}`);
  }
}
