import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Curso } from '../curso';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent extends BaseFormComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _cursosService: CursosService,
    private _alertService: AlertModalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    super();
  }

  override submit(): void {
    let actionSuccess = 'criado';
    let actionError = 'criar';
    if (this.form.value.id) {
      actionSuccess = 'atualizado';
      actionError = 'atualizar';
    }

    this._cursosService.save(this.form.value).subscribe({
      next: () => {
        this._alertService.showAlert(
          `Curso ${actionSuccess} com sucesso!`,
          'success',
          1500
        );
        this._router.navigate(['cursos']);
      },
      error: (error) => {
        console.error(error);
        this._alertService.showAlert(
          `Não foi possível ${actionError} o curso.`,
          'danger'
        );
      },
    });
  }

  ngOnInit() {
    // this._route.params
    //   .pipe(
    //     map((params) => params['id']),
    //     switchMap((id) => this._cursosService.getCurso(id))
    //   )
    //   .subscribe((curso) => this.populateForm(curso));

    const curso = this._route.snapshot.data['curso'];

    this.form = this._fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3)]],
    });
  }

  populateForm(curso: Curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
    });
  }
}
