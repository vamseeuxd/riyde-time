import { PublisherTypeaheadComponent } from './component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [PublisherTypeaheadComponent],
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [PublisherTypeaheadComponent],
})
export class PublisherTypeaheadModule {}
