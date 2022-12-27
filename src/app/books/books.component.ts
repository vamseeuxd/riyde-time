import { PublisherTypeaheadComponent } from './../publisher-typeahead/component';
import { map } from 'rxjs/operators';
import { LoaderService } from './../loader.service';
import { Observable, switchMap, tap } from 'rxjs';
import { BooksService, ICar, getNewCar } from './books.service';
import { Component } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthorTypeaheadComponent } from '../author-typeahead/component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  cars$: Observable<ICar[] | null> = this.service
    .getAll()
    .valueChanges({ idField: 'id' })
    .pipe(
      map((data) => {
        if (data && data.length > 0) {
          return data;
        } else {
          return null;
        }
      }),
      tap((d) => {
        this.loaderService.hide(this.inintLoader);
      })
    );
  inintLoader: number;
  constructor(
    public loaderService: LoaderService,
    private service: BooksService
  ) {
    this.inintLoader = this.loaderService.show();
  }

  isEdit = false;

  getNewCar = getNewCar;

  editBook: ICar = this.getNewCar();

  async deleteBook(car: ICar) {
    if (car && car.id) {
      const isConfirm = confirm('Are you Sure!Do you want to delete Car?');
      if (isConfirm) {
        const loader = this.loaderService.show();
        await this.service.delete(car.id);
        this.loaderService.hide(loader);
      }
    }
  }

  showEditModal(car: ICar, editBookModal: ModalDirective, isEdit = true) {
    this.isEdit = isEdit;
    this.editBook = { ...car };
    editBookModal.show();
  }

  async saveEdit(editBookModal: ModalDirective) {
    if (this.isEdit && this.editBook.id) {
      const loader = this.loaderService.show();
      this.service.update(this.editBook.id, this.editBook);
      this.loaderService.hide(loader);
      editBookModal.hide();
    } else {
      const loader = this.loaderService.show();
      this.service.create(this.editBook);
      this.loaderService.hide(loader);
      editBookModal.hide();
    }
  }
}
