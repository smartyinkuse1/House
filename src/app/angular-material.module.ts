import { NgModule } from "@angular/core";
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatToolbar,
    MatSelectModule, MatProgressSpinnerModule, MatPaginatorModule, MatDialogModule} from '@angular/material';

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
        MatPaginatorModule,
        MatDialogModule
    ]
})
export class AngularMaterialModule {}