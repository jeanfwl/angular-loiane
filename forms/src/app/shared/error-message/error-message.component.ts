import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent {
  @Input() label!: string;
  @Input() control!: FormControl;

  get mensagemErro() {
    if (this.control.touched) {
      for (let property of Object.keys(this.control.errors ?? {})) {
        return FormValidations.getMensagemErro(
          this.label,
          property,
          this.control.errors ? this.control.errors[property] : null
        );
      }
    }

    return null;
  }
}
