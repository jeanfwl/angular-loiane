import { Component, Input } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-debug',
  templateUrl: './form-debug.component.html',
  styleUrls: ['./form-debug.component.css'],
})
export class FormDebugComponent {
  @Input() form!: NgForm | FormGroup;

  getFormEnviado(): boolean {
    if (this.form instanceof NgForm) {
      return this.form.submitted;
    } else {
      return false;
    }
  }
}
