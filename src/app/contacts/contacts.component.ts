import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { Router } from '@angular/router';
import { ContactService } from '../model/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  constructor(private router: Router, public contactSvc: ContactService) {}
  filteredContacts: Contact[] = this.contactSvc.getContacts();
  filteredRecentContacts: Contact[] = this.contactSvc.getRecentContacts();
  searchTerm;
  query: any;
  alpha: string[] = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  ngOnInit(): void {
    this.contactSvc.sort();
    this.filteredContacts = this.contactSvc.getContacts();
    this.filteredRecentContacts = this.contactSvc.getRecentContacts();
  }

  search(): void {
    let term = this.query.toLowerCase();
    this.filteredContacts = [...this.contactSvc.getContacts()].filter(function (
      tag
    ) {
      return (
        tag.firstName &&
        (tag.firstName.toLowerCase().indexOf(term) >= 0 ||
          tag.lastName.toLowerCase().indexOf(term) >= 0 ||
          tag.email.toLowerCase().indexOf(term) >= 0 ||
          (tag.firstName + ' ' + tag.lastName).toLowerCase().indexOf(term) >= 0)
      );
    });

    this.filteredRecentContacts = [
      ...this.contactSvc.getRecentContacts(),
    ].filter(function (tag) {
      return (
        tag.firstName &&
        (tag.firstName.toLowerCase().indexOf(term) >= 0 ||
          tag.lastName.toLowerCase().indexOf(term) >= 0 ||
          tag.email.toLowerCase().indexOf(term) >= 0 ||
          (tag.firstName + ' ' + tag.lastName).toLowerCase().indexOf(term) >= 0)
      );
    });
  }

  scrollToElement(element): void {
    console.log(element);

    element
      ? element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      : null;
  }

  btnClick = function () {
    this.router.navigateByUrl('/add');
  };
}
