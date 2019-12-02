import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseCreateComponent } from './houses/houses-create/houses-create.component';
import { HouseListComponent } from './houses/houses-list/houses-list.component';
import { RequestCreateComponent } from './requests/requests-create/requests-create.component';
import { RequestListComponent } from './requests/requests-list/requests-list.component';
const routes: Routes = [
    {path: '', component: HouseListComponent },
    {path: 'create', component: HouseCreateComponent},
    {path: 'edit/:houseId', component: HouseCreateComponent},
    {path: 'crequest', component: RequestCreateComponent },
    {path: 'request', component: RequestListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
