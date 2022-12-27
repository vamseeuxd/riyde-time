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
export class BooksService {
  private dbPath = '/books';

  booksRef: AngularFirestoreCollection<ICar>;

  constructor(private db: AngularFirestore) {
    this.booksRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<ICar> {
    return this.booksRef;
  }

  create(book: ICar): any {
    return this.booksRef.add({ ...book });
  }

  update(id: string, data: any): Promise<void> {
    delete data.id;
    return this.booksRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.booksRef.doc(id).delete();
  }
}
