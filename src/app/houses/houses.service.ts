import { House } from './house.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HousesService {
    private houses: House[] = [];
    private housesUpdated = new Subject<House[]>();

    constructor(private http: HttpClient) {}
    getHouses() {
        this.http.get<{message: string, houses: House[]}>('http://localhost:4000/api/houses')
        .subscribe(housedata => {
            this.houses = housedata.houses;
            this.housesUpdated.next([...this.houses]);
            console.log(housedata);
        });
    }
    getHouseUpdateListener() {
        return this.housesUpdated.asObservable();
    }
    addHouse(Title: string, Location: string, Description: string, Price: number, Mode: string) {
       const house: House = {id: 1, title: Title, location: Location, description: Description, price: Price, mode: Mode };
       console.log(house);
       this.http.post<{message: string}>('http://localhost:4000/api/create', house)
       .subscribe(responseData => {
            console.log(responseData);
            this.houses.push(house);
            this.housesUpdated.next([...this.houses]);
       });


    }
}
