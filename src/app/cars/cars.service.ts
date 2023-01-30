import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { base64ToFile } from 'ngx-image-cropper';
import { lastValueFrom } from 'rxjs';
export interface ICar {
  id?: string;
  title: string;
  brand: string;
  model: string;
  type: string;
  noOfSeats: string;
  registrationNumber: string;
  color: string;
  rcPhoto: string;
  polutionPhoto: string;
  insurancePhoto: string;
  chassieNumber: string;
  engineNumber: string;
  open?: boolean;
}

export const getNewCar = (): ICar => {
  return {
    title: '',
    id: '',
    brand: '',
    model: '',
    type: '',
    noOfSeats: '',
    registrationNumber: '',
    color: '',
    rcPhoto: '',
    polutionPhoto: '',
    insurancePhoto: '',
    chassieNumber: '',
    engineNumber: '',
  };
};

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private dbPath = '/cars';

  carsRef: AngularFirestoreCollection<ICar>;

  constructor(
    public storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.carsRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<ICar> {
    return this.carsRef;
  }

  async create(car: ICar): Promise<void> {
    const doc = this.carsRef.doc();
    const id = doc.ref.id;
    const fileName = `${id}_${new Date().getTime()}`;
    await this.updateImage(car.rcPhoto, fileName + '_rc');
    await this.updateImage(car.polutionPhoto, fileName + '_polution');
    await this.updateImage(car.insurancePhoto, fileName + '_insurance');
    car.rcPhoto = fileName + '_rc';
    car.polutionPhoto = fileName + '_polution';
    car.insurancePhoto = fileName + '_insurance';
    return doc.set({ ...car });
    // return this.carsRef.add({ ...car });
  }

  update(id: string, data: any): Promise<void> {
    delete data.id;
    return this.carsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.carsRef.doc(id).delete();
  }

  updateImage(
    imageBase64: string,
    path: string
  ): Promise<UploadTaskSnapshot | undefined> {
    const file = base64ToFile(imageBase64);
    const task = this.storage.upload(path, file);
    return lastValueFrom(task.snapshotChanges());
  }

  /* updateInsurance(
    imageBase64: string,
    path: string
  ): Promise<UploadTaskSnapshot | undefined> {
    const file = base64ToFile(imageBase64);
    const task = this.storage.upload(path, file);
    return lastValueFrom(task.snapshotChanges());
  }

  updatePolution(
    imageBase64: string,
    path: string
  ): Promise<UploadTaskSnapshot | undefined> {
    const file = base64ToFile(imageBase64);
    const task = this.storage.upload(path, file);
    return lastValueFrom(task.snapshotChanges());
  } */
}
