import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css'],
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute) {}

  paramsSubscription: Subscription | undefined;
  id: number = 0;

  aluno: Aluno = new Aluno();
  editarAluno() {
    this.router.navigate(['/alunos', this.id, 'editar']);
  }

  ngOnInit(): void {
    console.log('OnInit AlunoDetalheComponent');
    this.paramsSubscription = this.route.data.subscribe((data: any) => {
      console.log('Get data', data);
      this.aluno = data.aluno;
      this.id = this.aluno?.id;
    });
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
}
