import { VerificaEmailService } from './services/verifica-email.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { Estado } from '../shared/models/estado';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import {
  Observable,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
  scheduled,
  asyncScheduler,
  of,
} from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  cidades!: Array<Cidade>;
  estados!: Array<Estado>;
  cargos: any[] = [];
  tecnologias: any[] = [];
  newsletterOptions: any[] = [];
  frameworks = ['Angular', 'React', 'Svelte', 'HTMX'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService,
    private emailService: VerificaEmailService
  ) {
    super();
  }

  ngOnInit() {
    this.dropdownService
      .getEstadosBR()
      .subscribe((estados) => (this.estados = estados));
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOptions = this.dropdownService.getNewsletterOptions();

    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [
        null,
        [Validators.required, Validators.email],
        this.validarEmail.bind(this),
      ],
      confirmacaoEmail: [
        null,
        [Validators.required, FormValidations.equalsTo('email')],
      ],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: [null],
      termos: [null, Validators.requiredTrue],
      frameworks: this.buildControlsFrameworks(),
    });

    this.form
      .get('endereco.cep')
      ?.statusChanges.pipe(
        distinctUntilChanged(),
        tap(console.log),
        switchMap((status) =>
          status === 'VALID'
            ? this.cepService.consultarCEP(this.form.get('endereco.cep')?.value)
            : scheduled(of(null), asyncScheduler)
        )
      )
      .subscribe((dados) => (dados ? this.popularDadosCEP(dados) : {}));

    this.form
      .get('endereco.estado')
      ?.valueChanges.pipe(
        map((sigla) => this.estados.filter((e) => e.sigla === sigla)),
        map((estados) =>
          estados && estados.length
            ? estados[0].id
            : scheduled(of(null), asyncScheduler)
        ),
        switchMap((estadoId: any) => this.dropdownService.getCidades(estadoId))
      )
      .subscribe((cidades) => (this.cidades = cidades));
  }

  get frameworksForms() {
    return this.form.get('frameworks') as FormArray;
  }

  buildControlsFrameworks() {
    const controls = this.frameworks.map((_) => new FormControl(false));
    return this.formBuilder.array(
      controls,
      FormValidations.requiredMinCheckbox(1)
    );
  }

  submit() {
    let formCopy = structuredClone(this.form.value);

    formCopy = Object.assign(formCopy, {
      frameworks: formCopy.frameworks
        .map((f: boolean, i: number) => (f ? this.frameworks[i] : null))
        .filter((f: any) => f !== null),
    });

    console.log(formCopy);

    this.http
      .post('https://httpbin.org/post', JSON.stringify(this.form.value))
      .subscribe(
        (res) => {
          console.log(res);
          // this.resetarForm();
        },
        (error: any) => alert('Erro no envio do form.')
      );
  }

  consultarCEP() {
    let cep = this.form.get('endereco.cep')?.value;

    if (cep !== '' && cep) {
      this.cepService.consultarCEP(cep).subscribe((json) => {
        this.popularDadosCEP(json);
      });
    }
  }

  popularDadosCEP(endereco: any) {
    this.form.patchValue({
      endereco: {
        // cep: endereco.cep,
        numero: this.form.get('endereco.numero')?.value,
        complemento: endereco.complemento,
        rua: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        estado: endereco.uf,
      },
    });
  }

  resetaCamposCEP() {
    this.form.patchValue({
      endereco: {
        //cep: '',
        //numero: '',
        complemento: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
      },
    });
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl.' };
    //const cargo = this.cargos[1];
    this.form.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any): boolean {
    if (obj1 && obj2) {
      return obj1.nome === obj2.nome && obj1.nivel === obj2.nivel;
    } else {
      return obj1 === obj2;
    }
  }

  setarTecnologias() {
    this.form.get('tecnologias')?.setValue(['java', 'javascript', 'html']);
  }

  validarEmail(formControl: FormControl) {
    return this.emailService
      .verificarEmail(formControl.value)
      .pipe(
        map((existente: boolean) =>
          existente ? { emailInvalido: true } : null
        )
      );
  }
}
