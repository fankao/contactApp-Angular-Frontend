import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../common/contact';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private baseUrl =
        'https://contact-spring-backend.herokuapp.com/api/contacts';
    constructor(private httpClient: HttpClient) {}

    getContactsList(
        thePageNumber: number,
        thePageSize: number
    ): Observable<GetResponseContact> {
        const url = `${this.baseUrl}?page=${thePageNumber}&size=${thePageSize}`;
        return this.httpClient.get<GetResponseContact>(url);
    }

    createNewContact(contact: Contact): Observable<Object> {
        return this.httpClient.post(this.baseUrl, contact);
    }

    updateContact(contact: Contact): Observable<Contact> {
        return this.httpClient.put<Contact>(this.baseUrl, contact);
    }

    getContactInfo(id: number): Observable<Contact> {
        const url = `${this.baseUrl}/${id}`;
        return this.httpClient.get<Contact>(url);
    }

    deleteContact(id: number): Observable<Object> {
        const url = `${this.baseUrl}/${id}`;
        return this.httpClient.delete(url);
    }
}

interface GetResponseContact {
    content: Contact[];
    number: number;
    size: number;
    totalElements: number;
}
