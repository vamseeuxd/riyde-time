import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherTypeaheadComponent } from './component';

describe('AuthorTypeaheadComponent', () => {
  let component: PublisherTypeaheadComponent;
  let fixture: ComponentFixture<PublisherTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherTypeaheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublisherTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
