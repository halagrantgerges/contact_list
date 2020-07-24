import { Injectable } from '@angular/core';

import { Contact } from './contact';
import ContactsList from '../../assets/contacts.json';
import RecentContactList from '../../assets/recent-contact.json';
// import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public recentContact: Contact[] = RecentContactList.data;
  public contacts: Contact[] = ContactsList.data;
  constructor() {
    this.sort();
  }

  public sort() {
    this.contacts.sort(function (a, b) {
      return a.firstName.localeCompare(b.firstName);
    });
    this.recentContact.sort(function (a, b) {
      return a.firstName.localeCompare(b.firstName);
    });
  }

  public getContacts(): Contact[] {
    this.sort();
    return this.contacts;
  }
  public getRecentContacts(): Contact[] {
    this.sort();
    return this.recentContact;
  }

  public addEntry(contact: Contact) {
    this.contacts.push(contact);
    this.sort();
  }
}
