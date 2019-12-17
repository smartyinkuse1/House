import { House } from './house.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class HousesService {
    private houses: House[] = [];
    private housesUpdated = new Subject<{houses: House[], houseCount: number}>();

    constructor(private http: HttpClient, private router: Router) {}
    getHouses(housePerPage: number, currentpage: number) {
        const queryParam = `?pagesize=${housePerPage}&page=${currentpage}`;
        this.http.get<{message: string, houses: any, maxHouses: number}>(
            'http://localhost:4000/api/houses' + queryParam)
            .pipe(map(houseData => {
                return {houses: houseData.houses.map(house => {
                    return {
                        id: house._id,
                        title: house.title,
                        location: house.location,
                        description: house.description,
                        price: house.price,
                        mode: house.mode,
                        landlord: house.landlord,
                        imagePath: house.imagePath
                    };
                }), maxHouses: houseData.maxHouses};
            }))
        .subscribe(transformedhousesdata => {
            this.houses = transformedhousesdata.houses;
            this.housesUpdated.next({houses: [...this.houses], houseCount: transformedhousesdata.maxHouses});
            // console.log(transformedhouses);
        });
    }
    getHouseUpdateListener() {
        return this.housesUpdated.asObservable();
    }
    addHouse(Title: string, Location: string, Description: string, Price: number, Mode: string, Image: File) {
       const houseData = new FormData();
       houseData.append('title', Title);
       houseData.append('location', Location);
       houseData.append('description', Description);
       houseData.append('price', String(Price));
       houseData.append('mode', Mode);
       houseData.append('image', Image );
       // console.log(JSON.stringify(houseData));

    //    const house: House = {id: null, title: Title, location: Location, description: Description, price: Price, mode: Mode };
    //    console.log(house);
       this.http.post<{message: string, house: any}>('http://localhost:4000/api/create', houseData)
       .subscribe(responseData => {
            this.router.navigate(['/']);
       });


    }
    deleteHouse(houseId: string) {
        return this.http.delete<{message: string}>('http://localhost:4000/api/houseDel/' + houseId);
    }
    getHouse(id: string) {
        return this.http.get<{_id: string,
            title: string, location: string, description: string, price: number, mode: string, landlord: string, imagePath: string}>
            ('http://localhost:4000/api/house/' + id);
    }
    updateHouse(Id: string, Title: string, Location: string, Description: string, Price: number, Mode: string, Image: File) {
        // const house: House = {id: Id, title: Title, location: Location, description: Description, price: Price, mode: Mode,
        //     imagePath: null };
        let houseData: House | FormData;
        if (typeof(Image) === 'object') {
            houseData = new FormData();
            houseData.append('id', Id);
            houseData.append('title', Title);
            houseData.append('location', Location);
            houseData.append('description', Description);
            houseData.append('price', String(Price));
            houseData.append('mode', Mode);
            houseData.append('image', Image );
        } else {
            houseData = {id: Id, title: Title, location: Location, description: Description, price: Price, mode: Mode, landlord: null,
                 imagePath: Image };
        }
        this.http.put<{message: string}>('http://localhost:4000/api/houseUp/' + Id, houseData)
        .subscribe(response => {
            this.router.navigate(['/']);
        });
    }
}
