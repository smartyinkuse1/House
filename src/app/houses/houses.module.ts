import { NgModule } from "@angular/core";
import { HouseCreateComponent } from './houses-create/houses-create.component';
import { HouseListComponent } from './houses-list/houses-list.component';
import { ReactiveFormsModule }  from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from '../app-routing.module';
import { HeaderModule } from '../header/header.module';
@NgModule({
    declarations: [
    HouseCreateComponent,
    HouseListComponent,
    ],
    imports: [
        ReactiveFormsModule,
        AngularMaterialModule,
        CommonModule,
        AppRoutingModule,
        HeaderModule
        
    ]
})
export class HousesModule {}