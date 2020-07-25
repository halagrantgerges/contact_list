import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { Contact, AlphaMap } from '../model/contact';
import { Router } from '@angular/router';
import { ContactService } from '../model/contact.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  constructor(private router: Router, public contactSvc: ContactService) {
    this.mapMyAlpha();
  }
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
  alphaMap: AlphaMap[] = [];

  ngOnInit(): void {
    this.contactSvc.sort();
    this.filteredContacts = this.contactSvc.getContacts();
    this.filteredRecentContacts = this.contactSvc.getRecentContacts();
    this.mapMyAlpha();
  }
  mapMyAlpha(): void {
    for (let i = 0; i < this.alpha.length; i++) {
      let index = this.filteredContacts.findIndex(
        (x) => x.firstName.substr(0, 1).toLowerCase() === this.alpha[i]
      );
      this.alphaMap.push({ alpha: this.alpha[i], alphaIndex: index });
    }
  }

  search(): void {
    let term = this.query.toLowerCase();
    this.filteredContacts = [...this.contactSvc.getContacts()].filter(function (
      tag
    ) {
      return (
        (tag.firstName && tag.firstName.toLowerCase().indexOf(term) >= 0) ||
        (tag.lastName && tag.lastName.toLowerCase().indexOf(term) >= 0) ||
        (tag.email && tag.email.toLowerCase().indexOf(term) >= 0) ||
        (tag.firstName + ' ' + tag.lastName != '' &&
          (tag.firstName + ' ' + tag.lastName).toLowerCase().indexOf(term) >= 0)
      );
    });

    this.filteredRecentContacts = [
      ...this.contactSvc.getRecentContacts(),
    ].filter(function (tag) {
      return (
        (tag.firstName && tag.firstName.toLowerCase().indexOf(term) >= 0) ||
        (tag.lastName && tag.lastName.toLowerCase().indexOf(term) >= 0) ||
        (tag.email && tag.email.toLowerCase().indexOf(term) >= 0) ||
        (tag.firstName + ' ' + tag.lastName != '' &&
          (tag.firstName + ' ' + tag.lastName).toLowerCase().indexOf(term) >= 0)
      );
    });
    this.mapMyAlpha();
  }
  //scroll to element in a the page
  scrollToElement(element): void {
    let el = document.getElementById(element);
    el
      ? el.scrollIntoView({
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
