import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css'],
})
export class CursoDetalheComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {}

  id: number | undefined;
  paramsSubscription: Subscription | undefined;
  curso: any;

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.curso = this.cursosService.getCurso(this.id ?? 0);

      if (!this.curso) {
        this.router.navigate(['cursos/naoEncontrado']);
      }
    });
  }
}
