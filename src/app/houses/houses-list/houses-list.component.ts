import { Component, OnInit, OnDestroy } from '@angular/core';
import { House } from '../house.model';
import { HousesService } from '../houses.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.services';
@Component({
    selector: 'app-house-list',
    templateUrl: './houses-list.component.html',
    styleUrls: ['./houses-list.component.css']
})
export class HouseListComponent implements OnInit, OnDestroy {
    houses: House[] = [];
    locat: any = {};
    currentHouseLocation: string;
    HousesSub: Subscription;
    AuthSub: Subscription;
    userIsAuthenticated = false;
    userId: string;
    totalLength = 10;
    housePerPage = 3;
    currentPage = 1;
    constructor(public housesService: HousesService, public authService: AuthService, private http: HttpClient) {

    }
    ngOnInit() {
        this.housesService.getHouses(this.housePerPage, this.currentPage);
        this.userId = this.authService.getUserId();
        this.HousesSub = this.housesService.getHouseUpdateListener()
        .subscribe((housesData: {houses: House[], houseCount: number}) => {
            this.houses = housesData.houses;
            this.currentHouseLocation = this.houses[0].location;
            this.totalLength = housesData.houseCount;
            this.getLongLat(this.currentHouseLocation)
            .subscribe(result => {
                this.locat = result[0]['geometry']['location']
            })
        });
        this.userIsAuthenticated = this.authService.getAuth();
        this.AuthSub = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
        });
    }
    onChangedPage(pageData: PageEvent) {
        // console.log(pageData);
        this.currentPage = this.currentPage + 1;
        this.housesService.getHouses(this.housePerPage, this.currentPage);
        this.housesService.getRevHouses(this.housePerPage, this.currentPage);

    }
    onDelete(houseId: string) {
        this.housesService.deleteHouse(houseId).subscribe(() => {
            this.housesService.getHouses(this.housePerPage, this.currentPage);
        });
    }
    isFirst(house: House) {
        if (this.houses[0] === house) {
            return true;
        }
        return false;
    }
    isMode(house: House, mode: string) {
        if(house.mode === mode ) {
            return true
        }
        return false
    }
    ngOnDestroy() {
        this.HousesSub.unsubscribe();
        this.AuthSub.unsubscribe();
    }
    getLongLat(address:string) {
        const Query = `${address.trim().split(' ').join('+')}`
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +Query+'&key=AIzaSyBi8Dukb03vKnXpK5qAgUf4IPcDXp450aU')
    }

}


