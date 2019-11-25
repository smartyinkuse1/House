import { Component, OnInit, OnDestroy } from '@angular/core';
import { House } from '../house.model';
import { HousesService } from '../houses.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-house-list',
    templateUrl: './houses-list.component.html',
    styleUrls: ['./houses-list.component.css']
})
export class HouseListComponent implements OnInit, OnDestroy {
    houses: House[] = [];
    HousesSub: Subscription;
    constructor(public housesService: HousesService) {

    }
    ngOnInit() {
        this.housesService.getHouses();
        this.HousesSub = this.housesService.getHouseUpdateListener()
        .subscribe((houses: House[]) => {
            this.houses = houses;
        });
    }
    ngOnDestroy() {
        this.HousesSub.unsubscribe();
    }
}


