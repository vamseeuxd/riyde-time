import { TestBed } from '@angular/core/testing';

import { NgFirestoreFormService } from './ng-firestore-form.service';

describe('NgFirestoreFormService', () => {
  let service: NgFirestoreFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgFirestoreFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
