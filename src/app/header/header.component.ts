import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.services';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    userIsAuthenticated = true;
    private authListenerSub: Subscription;
    form: FormGroup
    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.userIsAuthenticated = this.authService.getAuth();
        this.authListenerSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
        this.form = new FormGroup({
            search: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
        })
    }
    ngOnDestroy() {
        this.authListenerSub.unsubscribe();
    }
    onLogout() {
        this.authService.logout();
    }
}
