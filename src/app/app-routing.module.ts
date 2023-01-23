import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: 'cars', loadChildren: () => import('./cars/cars.module').then((m) => m.CarsModule) },
  { path: 'drivers', loadChildren: () => import('./drivers/drivers.module').then(m => m.DriversModule) },
  { path: 'passengers', loadChildren: () => import('./passengers/passengers.module').then(m => m.PassengersModule) },
  { path: 'bookings', loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
