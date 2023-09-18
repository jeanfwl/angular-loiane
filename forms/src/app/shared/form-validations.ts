import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

export class FormValidations {
  static requiredMinCheckbox(minChecks = 1) {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        const totalChecked = formArray.controls.filter((v) => v.value).length;
        return totalChecked >= minChecks ? null : { required: true };
      }

      throw new Error(typeof formArray + ' is not FormArray.');
    };
    return validator;
  }

  static equalsTo(otherControl: string) {
    const validator: ValidatorFn = (currentControl: AbstractControl) => {
      if (!otherControl) {
        throw new Error('Other control is missing to compare to.');
      }

      if (!currentControl.root || !(<FormGroup>currentControl.root).controls) {
        return null;
      }

      if (currentControl instanceof FormControl) {
        const otherControlValue = currentControl.root.get(otherControl)?.value;
        return otherControlValue === currentControl.value
          ? null
          : { equalsTo: true };
      }

      throw new Error(typeof currentControl + ' is not FormControl.');
    };
    return validator;
  }

  static getMensagemErro(
    label: string,
    validatorName: string,
    validatorValue?: any
  ) {
    const validationConfig: any = {
      required: `${label} é obrigatório.`,
      minlength: `${label} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${label} só pode ter no máximo ${validatorValue.requiredLength} caracteres.`,
      cepInvalido: 'CEP inválido.',
      equalsTo: 'Os campos não são iguais.',
    };

    return validationConfig[validatorName];
  }
}
