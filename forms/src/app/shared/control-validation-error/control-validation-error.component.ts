import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-control-validation-error',
  templateUrl: './control-validation-error.component.html',
  styleUrls: ['./control-validation-error.component.css'],
})
export class ControlValidationErrorComponent {
  @Input() mensagem: string = 'Campo inválido!';
  @Input() invalido: boolean = false;
}
