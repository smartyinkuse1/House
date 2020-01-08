import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.services';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HousesService } from '../houses/houses.service';
import { House } from '../houses/house.model';
import { SearchFilter } from '../filter.searchPipe';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [ SearchFilter]
})
export class HeaderComponent implements OnInit, OnDestroy {
    userIsAuthenticated = true;
    private authListenerSub: Subscription;
    houses: House[] = [];
    pipedHouse: House[] = [];
    private housesListenerSub: Subscription;
    form: FormGroup
    constructor(private authService: AuthService, private houseService: HousesService, private filter: SearchFilter) {}

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
        this.houseService.getAllHousesUpdateListener()
        .subscribe(houseData => {
            this.houses = houseData.houses;
        })
    }
    ngOnDestroy() {
        this.authListenerSub.unsubscribe();
        this.housesListenerSub.unsubscribe();
    }
    onLogout() {
        this.authService.logout();
    }
    onSearch() {
        this.pipedHouse = this.filter.transform(this.houses, this.form.value.search)
    }
}
