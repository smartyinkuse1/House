import { Component, OnInit, OnDestroy } from '@angular/core';
import { House } from '../house.model';
import { HousesService } from '../houses.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.services';
@Component({
    selector: 'app-house-list',
    templateUrl: './houses-list.component.html',
    styleUrls: ['./houses-list.component.css']
})
export class HouseListComponent implements OnInit, OnDestroy {
    houses: House[] = [];
    HousesSub: Subscription;
    AuthSub: Subscription;
    userIsAuthenticated = false;
    userId: string;
    totalLength = 0;
    housePerPage = 3;
    currentPage = 1;
    pageSizeOptions = [1, 3, 5, 10];
    constructor(public housesService: HousesService, public authService: AuthService) {

    }
    ngOnInit() {
        this.housesService.getHouses(this.housePerPage, this.currentPage);
        this.userId = this.authService.getUserId();
        this.HousesSub = this.housesService.getHouseUpdateListener()
        .subscribe((housesData: {houses: House[], houseCount: number}) => {
            this.houses = housesData.houses;
            this.totalLength = housesData.houseCount;
        });
        this.userIsAuthenticated = this.authService.getAuth();
        this.AuthSub = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
        });
    }
    onChangedPage(pageData: PageEvent) {
        console.log(pageData);
        // this.currentPage = pageData.pageIndex + 1;
        // this.housesService.getHouses(this.housePerPage, this.currentPage);

    }
    onDelete(houseId: string) {
        this.housesService.deleteHouse(houseId).subscribe(() => {
            this.housesService.getHouses(this.housePerPage, this.currentPage);
        });
    }
    ngOnDestroy() {
        this.HousesSub.unsubscribe();
        this.AuthSub.unsubscribe();
    }
}


