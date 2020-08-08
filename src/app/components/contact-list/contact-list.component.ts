import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/common/contact';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
    contacts: Contact[];
    thePageNumber: number = 1;
    thePageSize: number = 10;
    theTotalElements: number = 0;
    constructor(
        private contactService: ContactService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.listContacts();
        });
    }

    listContacts() {
        this.contactService
            .getContactsList(this.thePageNumber - 1, this.thePageSize)
            .subscribe(this.processResults());
    }

    processResults() {
        return (data) => {
            console.log(data);
            this.contacts = data.content;
            this.thePageNumber = data.number + 1;
            this.thePageSize = data.size;
            this.theTotalElements = data.totalElements;
        };
    }

    updatePageSize(size: number) {
        console.log(size);
        this.thePageSize = size;
        this.thePageNumber = 1;
        this.listContacts();
    }

    deleteContact(id: number) {
        if (confirm('Are you sure to delete this contact?')) {
            this.contactService.deleteContact(id).subscribe(() => {
                console.log("Deleted id: "+id);
                this.listContacts();
            });
        }
    }
}
