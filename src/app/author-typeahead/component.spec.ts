import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorTypeaheadComponent } from './component';

describe('AuthorTypeaheadComponent', () => {
  let component: AuthorTypeaheadComponent;
  let fixture: ComponentFixture<AuthorTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorTypeaheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
