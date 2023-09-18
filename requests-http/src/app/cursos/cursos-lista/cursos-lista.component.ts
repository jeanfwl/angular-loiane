import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  of,
  switchMap,
  take,
} from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CursosService } from '../cursos.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Curso } from '../curso';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  constructor(
    private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  deleteModalRef!: BsModalRef;
  @ViewChild('modalDelete') deleteModalTemplate: any;

  ngOnInit() {
    this.onReload();
  }

  onReload() {
    this.cursos$ = this.cursosService.getAll().pipe(
      catchError((_) => {
        this.showError();
        return of();
      })
    );
  }

  showError() {
    this.alertModalService.showAlert(
      'Não foi possível listar os cursos. Tente novamente mais tarde.',
      'danger'
    );
  }

  onEdit(id: number) {
    this._router.navigate(['editar', id], { relativeTo: this._route });
  }

  onDelete(id: number) {
    const deleteResult$ = this.alertModalService.showConfirm(
      'Excluir curso',
      'Tem certeza que deseja excluir o curso?'
    );

    deleteResult$
      ?.asObservable()
      ?.pipe(
        take(1),
        switchMap((confirmResult) =>
          confirmResult ? this.cursosService.delete(id) : EMPTY
        )
      )
      .subscribe({
        next: () => {
          this.alertModalService.showAlert(
            'Curso excluído com sucesso!',
            'success',
            1500
          );
          this.onReload();
        },
        error: (error) => {
          console.error(error);
          this.alertModalService.showAlert(
            'Não foi possível excluir o curso. Tente novamente.',
            'danger'
          );
        },
      });
  }
}
