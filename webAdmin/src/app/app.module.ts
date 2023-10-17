import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PackageFormComponent } from './package-form/package-form.component';
import { HttpClientModule } from '@angular/common/http';
import { DeliveryComponent } from './delivery-form/delivery-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ListComponent },
  { path: 'create-delivery', component: DeliveryComponent },
  { path: 'create-package', component: PackageFormComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PackageFormComponent,
    DeliveryComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
