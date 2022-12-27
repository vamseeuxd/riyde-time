import { PublisherTypeaheadModule } from '../publisher-typeahead/module';
import { AuthorTypeaheadModule } from '../author-typeahead/module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [CarsComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthorTypeaheadModule,
    PublisherTypeaheadModule,
    CarsRoutingModule,
    ModalModule.forRoot(),
  ],
})
export class CarsModule {}
