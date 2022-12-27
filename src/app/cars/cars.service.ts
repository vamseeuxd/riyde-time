import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

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

  constructor(private db: AngularFirestore) {
    this.carsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<ICar> {
    return this.carsRef;
  }

  create(car: ICar): any {
    return this.carsRef.add({ ...car });
  }

  update(id: string, data: any): Promise<void> {
    delete data.id;
    return this.carsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.carsRef.doc(id).delete();
  }
}
