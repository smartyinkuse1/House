import { PipeTransform, Pipe } from "@angular/core";
import { House } from './houses/house.model';
@Pipe({
    name: 'filter'
})
export class SearchFilter implements PipeTransform {
    transText: string[] = [];
    result: House[] = [];
    transform(houses: House[], text: string): any[] {
        if (!houses) return [];
        if (!text) return houses;
        this.transText = text.trim().toLowerCase().split(' ');
        for (const house of houses) {
            for (const search of this.transText) {
                if(house.location.toLowerCase().includes(search)) {
                    if(this.result.includes(house)){
                        continue;
                    }
                    this.result.push(house)
                }
            }
        }
        return this.result;
    }
}