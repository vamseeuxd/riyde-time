import {
  MOCK_EMAIL,
  MOCK_TEXT,
  MOCK_NUMBER,
  MOCK_DATE,
  MOCK_TEXT_AREA,
  MOCK_SELECT,
  MOCK_MULTI_SELECT,
  MOCK_FILE,
  MOCK_RADIO,
  MOCK_CHECK_BOXES,
} from './../../../projects/ng-firestore-form/src/lib/components/ng-firestore-form/mock-controls-config';
import { IFirestoreFormControl } from './../../../projects/ng-firestore-form/src/lib/components/ng-firestore-form/ng-firestore-form.component';
import { map } from 'rxjs/operators';
import { LoaderService } from '../loader.service';
import { Observable, tap } from 'rxjs';
import { CarsService, ICar, getNewCar } from './cars.service';
import { Component } from '@angular/core';
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
  // prettier-ignore
  controls: IFirestoreFormControl[] = [
    { id: 'title', placeholder: 'Enter Title', label: 'Title', type: 'text', defaultValue: '1122', name: 'title', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'brand', placeholder: 'Enter Brand', label: 'Brand', type: 'text', defaultValue: '', name: 'brand', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'model', placeholder: 'Enter Model', label: 'Model', type: 'text', defaultValue: '', name: 'model', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'type', placeholder: 'Enter Type', label: 'Type', type: 'text', defaultValue: '', name: 'type', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'noOfSeats', placeholder: 'Enter No Of Seats', label: 'No Of Seats', type: 'number', defaultValue: '', name: 'noOfSeats', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'registrationNumber', placeholder: 'Enter Registration Number', label: 'Registration Number', type: 'text', defaultValue: '', name: 'registrationNumber', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    { id: 'color', placeholder: 'Enter Color', label: 'Color', type: 'color', defaultValue: '#ff0000', name: 'color', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    /* ---------------------- */
    { id: 'rcPhoto', placeholder: 'Upload RC Photo', accept: 'image/*', label: 'RC Photo', type: 'image', defaultValue: '', name: 'rcPhoto', pattern: '', required: true, disabled: false, hide: false, image:true, offset: this.OFFSET, column: this.COLUMN },
    { id: 'polutionPhoto', placeholder: 'Upload Polution Photo', accept: 'image/*', label: 'Polution Photo', type: 'image', defaultValue: '', name: 'polutionPhoto', pattern: '', required: true, disabled: false, hide: false, image:true, maxMessage:'File should less than 150KB', offset: this.OFFSET, column: this.COLUMN },
    { id: 'insurancePhoto', placeholder: 'Upload Insurance Photo', accept: 'image/*',  label: 'Insurance Photo', type: 'image', defaultValue: '', name: 'insurancePhoto', pattern: '', required: true, disabled: false, hide: false, image:true, maxMessage:'File should less than 150KB', offset: this.OFFSET, column: this.COLUMN },
    /* ---------------------- */
    { id: 'chassieNumber', placeholder: 'Enter Chassie Number', label: 'Chassie Number', type: 'text', defaultValue: '', name: 'chassieNumber', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, maxMessage:'File should less than 150KB', offset: this.OFFSET, column: this.COLUMN },
    { id: 'engineNumber', placeholder: 'Enter Engine Number', label: 'Engine Number', type: 'text', defaultValue: '', name: 'engineNumber', pattern: '', required: true, disabled: false, hide: false, min: 3, max: 30, offset: this.OFFSET, column: this.COLUMN },
    /* MOCK_EMAIL,
    MOCK_TEXT,
    MOCK_NUMBER,
    MOCK_DATE,
    MOCK_TEXT_AREA,
    MOCK_SELECT,
    MOCK_MULTI_SELECT,
    MOCK_FILE,
    MOCK_RADIO,
    MOCK_CHECK_BOXES, */
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
