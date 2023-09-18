import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownService } from './services/dropdown.service';
import { ControlValidationErrorComponent } from './control-validation-error/control-validation-error.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormDebugComponent,
    ControlValidationErrorComponent,
    ErrorMessageComponent,
    InputFieldComponent,
  ],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [
    FormDebugComponent,
    ControlValidationErrorComponent,
    ErrorMessageComponent,
    InputFieldComponent,
  ],
  providers: [DropdownService],
})
export class SharedModule {}
