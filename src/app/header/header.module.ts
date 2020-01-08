import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { SearchFilter } from '../filter.searchPipe';

@NgModule({
    declarations: [HeaderComponent, SearchFilter],
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