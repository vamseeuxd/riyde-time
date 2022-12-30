import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFirestoreFormComponent } from './components/ng-firestore-form/ng-firestore-form.component';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [NgFirestoreFormComponent],
  imports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    CommonModule,
    FormsModule,
  ],
  exports: [NgFirestoreFormComponent],
})
export class NgFirestoreFormModule {}
