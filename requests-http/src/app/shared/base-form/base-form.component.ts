import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent {
  form!: FormGroup;

  onSubmit() {
    if (this.form.valid) {
      this.submit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  abstract submit(): void;

  getClassesInputInvalidOrValid(inputName: string) {
    const input = this.form.get(inputName);
    if (input) {
      return {
        'is-invalid': !input.valid && input.touched,
        'is-valid': input.valid && input.touched,
      };
    }

    return null;
  }

  verificaInputRequired(inputName: string): boolean {
    const control = this.form.get(inputName);
    if (control) {
      return control.hasError('required') && (control.touched || control.dirty);
    }

    return false;
  }

  resetarForm() {
    this.form.reset();
  }
}
