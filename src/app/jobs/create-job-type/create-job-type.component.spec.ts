import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobTypeComponent } from './create-job-type.component';

describe('CreateJobTypeComponent', () => {
  let component: CreateJobTypeComponent;
  let fixture: ComponentFixture<CreateJobTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateJobTypeComponent]
    });
    fixture = TestBed.createComponent(CreateJobTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
