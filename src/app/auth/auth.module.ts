import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "@angular/common";
import { LoginComponent } from '../auth/Login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        AngularMaterialModule,
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule

    ]
})
export class AuthModule {}