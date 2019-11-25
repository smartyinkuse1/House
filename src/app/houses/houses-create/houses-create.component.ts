import { Component } from '@angular/core';
import { House } from '../house.model';
import { NgForm } from '@angular/forms';
import { HousesService } from '../houses.service';
@Component({
    selector: 'app-house-create',
    templateUrl: './houses-create.component.html'
})
export class HouseCreateComponent {
    modes = [
    {value: 'Rent', display: 'Rent'},
    {value: 'Lease', display: 'Lease'},
    {value: 'sale', display: 'sale'}];
    constructor(public houseService: HousesService) {}
    onAddHouse(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.houseService.addHouse(form.value.title, form.value.location, form.value.description, form.value.price, form.value.mode);
        form.resetForm();
    }
}
