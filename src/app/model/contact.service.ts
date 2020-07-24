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
      if (a.firstName == null && b.firstName == null) return 0;
      if (a.firstName == null) return -1;
      else if (b.firstName == null) return 1;
      else return a.firstName.localeCompare(b.firstName);
    });
    this.recentContact.sort(function (a, b) {
      if (a.firstName == null && b.firstName == null) return 0;
      if (a.firstName == null) return -1;
      else if (b.firstName == null) return 1;
      else return a.firstName.localeCompare(b.firstName);
    });

    for (let i = 0; i < this.contacts.length; i++) {
      if (
        this.contacts[i].firstName == null &&
        this.contacts[i].lastName == null &&
        this.contacts[i].email == null
      ) {
        this.contacts.splice(i, 1);
        break;
      }
    }

    for (let i = 0; i < this.recentContact.length; i++) {
      if (
        this.recentContact[i].firstName == null &&
        this.recentContact[i].lastName == null &&
        this.recentContact[i].email == null
      ) {
        this.recentContact.splice(i, 1);
        break;
      }
    }
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
