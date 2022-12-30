import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFirestoreFormComponent } from './ng-firestore-form.component';

describe('NgFirestoreFormComponent', () => {
  let component: NgFirestoreFormComponent;
  let fixture: ComponentFixture<NgFirestoreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgFirestoreFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgFirestoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
