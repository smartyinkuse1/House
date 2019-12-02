import { Component, OnInit } from '@angular/core';
import { House } from '../house.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HousesService } from '../houses.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';
@Component({
    selector: 'app-house-create',
    templateUrl: './houses-create.component.html',
    styleUrls: ['./houses-create.component.css']
})
export class HouseCreateComponent implements OnInit {
    modes = [
    {value: 'Rent', display: 'Rent'},
    {value: 'Lease', display: 'Lease'},
    {value: 'sale', display: 'sale'}];
    private mode = 'create';
    private houseId: string;
    house: House;
    isLoading = false;
    form: FormGroup;
    imagePreview: string | ArrayBuffer;
    constructor(public houseService: HousesService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            location: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            description: new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
            price: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            image: new FormControl(null, {validators: [Validators.required ],
            asyncValidators:[mimeType]}),
            mode: new FormControl(null, {validators: [Validators.required] })
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('houseId')) {
              this.mode = 'edit';
              this.houseId = paramMap.get('houseId');
              this.isLoading = true;
              this.houseService.getHouse(this.houseId).subscribe(houseData => {
                this.isLoading = false ;
                this.house = {
                    id: houseData._id,
                    title: houseData.title,
                    location: houseData.location,
                    description: houseData.description,
                    price: houseData.price,
                    mode: houseData.mode};
                this.form.setValue({
                        title: this.house.title,
                        location: this.house.location,
                        description: this.house.description,
                        price: this.house.price,
                        mode: this.house.mode
                    });
              });
            } else {
                this.mode = 'create';
                this.houseId = null;
            }
        });
    }
    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image: file});
        this.form.get('image').updateValueAndValidity();
        console.log(file);
        console.log(this.form);
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }
    onSaveHouse() {
        if (this.form.invalid) {
            return;
        }
        if (this.mode === 'create') {
            this.houseService.addHouse(
                this.form.value.title,
                this.form.value.location, this.form.value.description, this.form.value.price, this.form.value.mode);
        } else {
            // tslint:disable-next-line: max-line-length
            this.houseService.updateHouse(this.houseId, this.form.value.title, this.form.value.location, this.form.value.description, this.form.value.price, this.form.value.mode);
        }

        this.form.reset();
    }
}
