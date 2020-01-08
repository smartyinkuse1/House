import { NgModule } from "@angular/core";
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatToolbar,
    MatSelectModule, MatProgressSpinnerModule, MatPaginatorModule} from '@angular/material';

@NgModule({
    imports: [
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
    ],
    exports: [
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule 
    ]
})
export class AngularMaterialModule {}