import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
    declarations: [HeaderComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule,  
        AngularMaterialModule  
    ], 
    exports:[
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        HeaderComponent
]
})
export class HeaderModule {}