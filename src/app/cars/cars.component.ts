import { map } from 'rxjs/operators';
import { LoaderService } from '../loader.service';
import { Observable, tap } from 'rxjs';
import { CarsService, ICar, getNewCar } from './cars.service';
import { Component } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent {
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
    private service: CarsService
  ) {
    this.inintLoader = this.loaderService.show();
  }

  isEdit = false;

  getNewCar = getNewCar;

  editCar: ICar = this.getNewCar();

  async deleteCar(car: ICar) {
    if (car && car.id) {
      const isConfirm = confirm('Are you Sure!Do you want to delete Car?');
      if (isConfirm) {
        const loader = this.loaderService.show();
        await this.service.delete(car.id);
        this.loaderService.hide(loader);
      }
    }
  }

  showEditModal(car: ICar, editCarModal: ModalDirective, isEdit = true) {
    this.isEdit = isEdit;
    this.editCar = { ...car };
    editCarModal.show();
  }

  async saveEdit(editCarModal: ModalDirective) {
    if (this.isEdit && this.editCar.id) {
      const loader = this.loaderService.show();
      this.service.update(this.editCar.id, this.editCar);
      this.loaderService.hide(loader);
      editCarModal.hide();
    } else {
      const loader = this.loaderService.show();
      this.service.create(this.editCar);
      this.loaderService.hide(loader);
      editCarModal.hide();
    }
  }
}
