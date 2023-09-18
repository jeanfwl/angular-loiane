import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlValidationErrorComponent } from './control-validation-error.component';

describe('ControlValidationErrorComponent', () => {
  let component: ControlValidationErrorComponent;
  let fixture: ComponentFixture<ControlValidationErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlValidationErrorComponent]
    });
    fixture = TestBed.createComponent(ControlValidationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
