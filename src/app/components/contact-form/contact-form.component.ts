import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/common/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
    contactForm: FormGroup;

    contact: Contact = new Contact();

    constructor(
        private builder: FormBuilder,
        private route: ActivatedRoute,
        private router:Router,
        private contactService: ContactService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.contactForm = this.builder.group({
                firstName: [''],
                lastName: [''],
                email: [''],
                phoneNumber: [''],
            });
            this.showContactInfo();
        });
    }
    showContactInfo() {
        let hasContactId: boolean = this.route.snapshot.paramMap.has('id');
        if (hasContactId) {
            this.contact.id = this.route.snapshot.paramMap.get('id');
            this.contactService
                .getContactInfo(+this.contact.id)
                .subscribe((data) => {
                    this.contactForm.controls.firstName.setValue(
                        data.firstName
                    );
                    this.contactForm.controls.lastName.setValue(data.lastName);
                    this.contactForm.controls.email.setValue(data.email);
                    this.contactForm.controls.phoneNumber.setValue(
                        data.phoneNumber
                    );
                });
        }
    }

    onSubmit() {
        this.contact.firstName = this.contactForm.get('firstName').value;
        this.contact.lastName = this.contactForm.get('lastName').value;
        this.contact.email = this.contactForm.get('email').value;
        this.contact.phoneNumber = this.contactForm.get('phoneNumber').value;

        if (this.contact.id == null) {
            console.log('Create new contact!');
            this.createNewContact();
        } else {
            console.log(`Update contact: ${this.contact}`);
            this.updateContact();
        }
    }
    createNewContact() {
        this.contactService.createNewContact(this.contact).subscribe((data) => {
            console.log(`Added contact: ${data}`);
            this.router.navigate(['/']);
        });
    }
    updateContact() {
        this.contactService.updateContact(this.contact).subscribe((data) => {
            console.log(`Updated contact: ${data}`);
             this.router.navigate(['/']);
        });
    }

}
