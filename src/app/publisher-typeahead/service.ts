import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface IAuthor {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private dbPath = '/publishers';

  authorRef: AngularFirestoreCollection<IAuthor>;

  constructor(private db: AngularFirestore) {
    this.authorRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IAuthor> {
    return this.authorRef;
  }

  create(book: IAuthor): any {
    return this.authorRef.add({ ...book });
  }

  update(id: string, data: any): Promise<void> {
    delete data.id;
    return this.authorRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.authorRef.doc(id).delete();
  }
}
