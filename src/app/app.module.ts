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
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  declarations: [
    AppComponent,
    LogoComponent,
    ComingSoonComponent,
    DashboardComponent,
    MyAccountComponent,
    SupportComponent,
    ManageCarsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
