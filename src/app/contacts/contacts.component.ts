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
  @ViewChild('target') nameElementRef: ElementRef;
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
  target: string = 'target';

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
    console.log(this.alphaMap);
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
    // this.mapMyAlpha();
  }

  scrollToElement(element): void {
    //  @ViewChild('element') myelem: ElementRef ;
    console.log('here', element);

    let el = document.getElementById(element);
    // this.nameElementRef.nativeElement.focus();
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
