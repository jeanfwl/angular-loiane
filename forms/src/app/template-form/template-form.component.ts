import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css'],
})
export class TemplateFormComponent {
  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) {}

  usuario: any = {
    nome: 'Jean',
    email: 'jean@gmail.com',
  };

  onSubmit(form: NgForm) {
    this.http
      .post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe((res) => console.log(res));
  }

  getClassesInputInvalidOrValid(input: NgModel) {
    return {
      'is-invalid': !input.valid && input.touched,
      'is-valid': input.valid && input.touched,
    };
  }

  consultarCEP(cep: string, ngForm: NgForm) {
    if (cep !== '' && cep) {
      this.cepService.consultarCEP(cep).subscribe((json) => {
        this.popularDadosCEP(json, ngForm);
      });
    }
  }

  popularDadosCEP(endereco: any, ngForm: NgForm) {
    ngForm.form.patchValue({
      endereco: {
        cep: endereco.cep,
        numero: ngForm.value.endereco.numero,
        complemento: endereco.complemento,
        rua: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        estado: endereco.uf,
      },
    });
  }

  resetaCamposCEP(form: FormGroup) {
    form.patchValue({
      endereco: {
        complemento: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
      },
    });
  }
}
