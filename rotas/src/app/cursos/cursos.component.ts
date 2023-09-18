import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit, OnDestroy {
  constructor(
    private cursosService: CursosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  queryParamsSubscription: Subscription | undefined;
  cursos: any = undefined;
  pagina: number = 1;

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.pagina = params['pagina'];
      }
    );
    this.cursos = this.cursosService.getCursos();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  handleChangePage(command: 'PREV' | 'NEXT') {
    this.router.navigate(['/cursos'], {
      queryParams: {
        pagina: command === 'PREV' ? --this.pagina : ++this.pagina,
      },
    });
  }
}
