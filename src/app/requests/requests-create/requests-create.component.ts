import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-request-create',
    templateUrl: './requests-create.component.html',
    styleUrls: ['./requests-create.componenet.css']
})

export class RequestCreateComponent implements OnInit {
    form: FormGroup;
    constructor() {}
    ngOnInit() {
        this.form = new FormGroup({
            FirstName: new FormControl(null, {validators: [Validators.required, Validators.minLength(5) ]}),
            LastName: new FormControl(null, {validators: [Validators.required, Validators.minLength(5) ]}),
            Telephone: new FormControl(null, {validators: [Validators.required, Validators.minLength(11) ]}),
            Address: new FormControl(null, {validators: [Validators.required, Validators.minLength(5) ]}),
            Email: new FormControl(null, {validators: [Validators.required, Validators.email]})
        });
    }

}
