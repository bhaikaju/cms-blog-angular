import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPostComponent } from './all-post.component';

describe('AllPostComponent', () => {
  let component: AllPostComponent;
  let fixture: ComponentFixture<AllPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
