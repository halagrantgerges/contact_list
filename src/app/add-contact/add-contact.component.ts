import { Component, OnInit } from '@angular/core';
import { ContactService } from '../model/contact.service';
import { Contact } from '../model/contact';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  constructor(private router: Router, public contactSvc: ContactService) {}
  model: Contact;
  ngOnInit(): void {
    this.model = {
      userId: '',
      email: '',
      userName: '',
      mobileNumber: null,
      firstName: '',
      lastName: '',
    };
  }

  save() {
    this.contactSvc.addEntry(this.model);
    this.router.navigateByUrl('/home');
  }
  cancel() {
    this.router.navigateByUrl('/home');
  }
}
