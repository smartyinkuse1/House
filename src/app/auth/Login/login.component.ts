import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.services';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    constructor(public authService: AuthService) {}
    ngOnInit() {
        this.form = new FormGroup({
            Username: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            Password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
        });
    }
    onLogin() {
        if (this.form.invalid) {
            return;
        }
        this.authService.login(this.form.value.Username, this.form.value.Password);
    }
}
