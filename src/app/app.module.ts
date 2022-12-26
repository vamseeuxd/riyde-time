import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SupportComponent } from './support/support.component';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ManageCarsComponent } from './manage-cars/manage-cars.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './toasts/toasts.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';

export const routes: Routes = [
  { path: '', redirectTo: 'coming-soon', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'account', component: MyAccountComponent },
  { path: 'support', component: SupportComponent },
  { path: 'coming-soon', component: ComingSoonComponent },
  { path: 'manage-cars', component: ManageCarsComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbToastModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [
    AppComponent,
    LogoComponent,
    ComingSoonComponent,
    DashboardComponent,
    MyAccountComponent,
    SupportComponent,
    ManageCarsComponent,
    ToastsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
