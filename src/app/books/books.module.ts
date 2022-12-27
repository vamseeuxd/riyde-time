import { PublisherTypeaheadModule } from './../publisher-typeahead/module';
import { AuthorTypeaheadModule } from '../author-typeahead/module';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthorTypeaheadModule,
    PublisherTypeaheadModule,
    BooksRoutingModule,
    ModalModule.forRoot(),
  ],
})
export class BooksModule {}
