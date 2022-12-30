import { map } from 'rxjs/operators';
import { LoaderService } from '../loader.service';
import { Observable, tap } from 'rxjs';
import { CarsService, ICar, getNewCar } from './cars.service';
import { Component } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';

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
        this.inintLoader && this.loaderService.hide(this.inintLoader);
      })
    );
  inintLoader: number | undefined;
  ref: AngularFireStorageReference | undefined;
  task: AngularFireUploadTask | undefined;
  uploadProgress: Observable<number | undefined> | undefined;
  constructor(
    public loaderService: LoaderService,
    public afStorage: AngularFireStorage,
    public service: CarsService
  ) {
    // this.inintLoader = this.loaderService.show();
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

  async onFileChange(event: any, prop: string) {
    console.log(event.target.files[0], prop);
    const id = prop + '_' + Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    // https://medium.com/codingthesmartway-com-blog/firebase-cloud-storage-with-angular-394566fd529
    // https://github.com/angular/angularfire/blob/master/docs/storage/storage.md
  }

  async saveEdit(editCarModal: ModalDirective) {
    /* if (this.isEdit && this.editCar.id) {
      const loader = this.loaderService.show();
      this.service.update(this.editCar.id, this.editCar);
      this.loaderService.hide(loader);
      editCarModal.hide();
    } else {
      const loader = this.loaderService.show();
      this.service.create(this.editCar);
      this.loaderService.hide(loader);
      editCarModal.hide();
    } */
    console.log(this.editCar);
  }
}
