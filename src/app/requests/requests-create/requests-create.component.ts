import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsService } from '../requests.service';
// import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-request-create',
    templateUrl: './requests-create.component.html',
    styleUrls: ['./requests-create.componenet.css']
})

export class RequestCreateComponent implements OnInit {
    form: FormGroup;
    isLoading = false;
    constructor(public requestsService: RequestsService) {}
    ngOnInit() {
        this.form = new FormGroup({
            FirstName: new FormControl(null, {validators: [Validators.required, Validators.minLength(5) ]}),
            LastName: new FormControl(null, {validators: [Validators.required, Validators.minLength(5) ]}),
            Telephone: new FormControl(null, {validators: [Validators.required, Validators.minLength(11) ]}),
            Address: new FormControl(null, {validators: [Validators.required, Validators.minLength(5) ]}),
            Email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
            Username: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            Password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
        });
    }
    onAdd() {
        this.isLoading = true;
        this.requestsService.addRequest(this.form.value.FirstName, this.form.value.LastName, this.form.value.Telephone,
             this.form.value.Address, this.form.value.Email, this.form.value.Username, this.form.value.Password);
        this.form.reset();
    }

}
