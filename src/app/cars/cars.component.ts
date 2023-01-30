import { NgForm } from '@angular/forms';
import { IFirestoreFormControl } from './../../../projects/ng-firestore-form/src/lib/components/ng-firestore-form/ng-firestore-form.component';
import { map } from 'rxjs/operators';
import { LoaderService } from '../loader.service';
import { Observable, tap } from 'rxjs';
import { CarsService, ICar, getNewCar } from './cars.service';
import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent {
  readonly COLUMN = { lg: '', md: '6', sm: '', xl: '', xxl: '' };
  readonly OFFSET = { lg: '', md: '', sm: '', xl: '', xxl: '' };
  previewImageTitle = 'AP-39M-9747 Polution Certificate';
  previewImageUrl = '';
  @ViewChild('imagePreview')
  imagePreview!: ModalDirective;

  // prettier-ignore
  controls: IFirestoreFormControl[] = [
    { id: 'title', placeholder: 'Enter Title', label: 'Title', type: 'text', defaultValue: 'Vamsee Kalyan CAR', name: 'title', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'brand', placeholder: 'Enter Brand', label: 'Brand', type: 'text', defaultValue: 'Maruti Celerio', name: 'brand', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'model', placeholder: 'Enter Model', label: 'Model', type: 'text', defaultValue: '2000', name: 'model', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'type', placeholder: 'Enter Type', label: 'Type', type: 'text', defaultValue: 'Petrol', name: 'type', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'noOfSeats', placeholder: 'Enter No Of Seats', label: 'No Of Seats', type: 'number', defaultValue: '4', name: 'noOfSeats', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'registrationNumber', placeholder: 'Enter Registration Number', label: 'Registration Number', type: 'text', defaultValue: 'AP-39M-9747', name: 'registrationNumber', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'color', placeholder: 'Enter Color', label: 'Color', type: 'color', defaultValue: '#d5d5d5', name: 'color', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    /* ---------------------- */
    { id: 'rcPhoto', placeholder: 'Upload RC Photo', accept: 'image/*', label: 'RC Photo', type: 'image', defaultValue: '', name: 'rcPhoto', pattern: '', required: true, disabled: false, hide: false, image:true, offset: this.OFFSET, column: this.COLUMN },
    { id: 'polutionPhoto', imageHeight:350.8, imageWidth:248, placeholder: 'Upload Polution Photo', accept: 'image/*', label: 'Polution Photo', type: 'image', defaultValue: '', name: 'polutionPhoto', pattern: '', required: true, disabled: false, hide: false, image:true, maxMessage:'File should less than 150KB', offset: this.OFFSET, column: this.COLUMN },
    { id: 'insurancePhoto', imageHeight:350.8, imageWidth:248, placeholder: 'Upload Insurance Photo', accept: 'image/*',  label: 'Insurance Photo', type: 'image', defaultValue: '', name: 'insurancePhoto', pattern: '', required: true, disabled: false, hide: false, image:true, maxMessage:'File should less than 150KB', offset: this.OFFSET, column: this.COLUMN },
    /* ---------------------- */
    { id: 'chassieNumber', placeholder: 'Enter Chassie Number', label: 'Chassie Number', type: 'text', defaultValue: '12345', name: 'chassieNumber', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, maxMessage:'File should less than 150KB', offset: this.OFFSET, column: this.COLUMN },
    { id: 'engineNumber', placeholder: 'Enter Engine Number', label: 'Engine Number', type: 'text', defaultValue: '54321', name: 'engineNumber', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
  ];

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
    public storage: AngularFireStorage,
    public service: CarsService
  ) {
    // this.inintLoader = this.loaderService.show();
  }

  isEdit = false;

  getNewCar = getNewCar;

  editCar: ICar = this.getNewCar();

  async deleteCar(car: ICar) {
    /* if (car && car.id) {
      const isConfirm = confirm('Are you Sure!Do you want to delete Car?');
      if (isConfirm) {
        const loader = this.loaderService.show();
        await this.service.delete(car.id);
        this.loaderService.hide(loader);
      }
    } */
  }

  showEditModal(car: ICar, editCarModal: ModalDirective, isEdit = true) {
    this.isEdit = isEdit;
    this.editCar = { ...car };
    editCarModal.show();
  }

  async saveEdit(editCarModal: ModalDirective, form: NgForm) {
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
    const loader = this.loaderService.show();
    await this.service.create(form.value);
    editCarModal.hide();
    this.loaderService.hide(loader);
  }

  openPhoto(path: string, title: string) {
    this.previewImageTitle = title;
    const loader = this.loaderService.show();
    const sub = this.storage
      .ref(path)
      .getDownloadURL()
      .subscribe((val) => {
        this.previewImageUrl = val;
        this.imagePreview.show();
        sub.unsubscribe();
        setTimeout(() => {
          this.loaderService.hide(loader);
        }, 1000);
      });
  }
}
