import { House } from './house.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class HousesService {
    private houses: House[] = [];
    private housesUpdated = new Subject<House[]>();

    constructor(private http: HttpClient, private router: Router) {}
    getHouses() {
        this.http.get<{message: string, houses: any }>(
            'http://localhost:4000/api/houses')
            .pipe(map(houseData => {
                return houseData.houses.map(house => {
                    return {
                        id: house._id,
                        title: house.title,
                        location: house.location,
                        description: house.description,
                        price: house.price,
                        mode: house.mode
                    };
                });
            }))
        .subscribe(transformedhouses => {
            this.houses = transformedhouses;
            this.housesUpdated.next([...this.houses]);
            console.log(transformedhouses);
        });
    }
    getHouseUpdateListener() {
        return this.housesUpdated.asObservable();
    }
    addHouse(Title: string, Location: string, Description: string, Price: number, Mode: string) {
       const house: House = {id: null, title: Title, location: Location, description: Description, price: Price, mode: Mode };
       console.log(house);
       this.http.post<{message: string}>('http://localhost:4000/api/create', house)
       .subscribe(responseData => {
            console.log(responseData);
            this.houses.push(house);
            this.housesUpdated.next([...this.houses]);
            this.router.navigate(['/']);
       });


    }
    deleteHouse(houseId: string) {
        console.log(houseId);
        this.http.delete<{message: string}>('http://localhost:4000/api/houseDel/' + houseId)
        .subscribe(() => {
            const updatedHouses = this.houses.filter(house => house.id !== houseId);
            this.houses = updatedHouses;
            this.housesUpdated.next([...this.houses]);
        });
    }
    getHouse(id: string) {
        return this.http.get<{_id: string,
            title: string, location: string, description: string, price: number, mode: string}>
            ('http://localhost:4000/api/house/' + id);
    }
    updateHouse(Id: string, Title: string, Location: string, Description: string, Price: number, Mode: string) {
        const house: House = {id: Id, title: Title, location: Location, description: Description, price: Price, mode: Mode };
        this.http.put<{message: string}>('http://localhost:4000/api/houseDel/' + Id, house)
        .subscribe(response => {
            console.log(response);
            const updatedHouse = [...this.houses];
            const oldhouseIndex = updatedHouse.findIndex(p => p.id === house.id);
            updatedHouse[oldhouseIndex] = house;
            this.houses = updatedHouse;
            this.housesUpdated.next([...this.houses]);
            this.router.navigate(['/']);
        });
    }
}
