import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { SearchFilter } from './filter.searchPipe';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HeaderComponent, SearchFilter],
    imports:[
        CommonModule,
        ReactiveFormsModule,  
        AngularMaterialModule,
        RouterModule  
    ], 
    exports:[
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterModule,
        HeaderComponent
]
})
export class HeaderModule {}