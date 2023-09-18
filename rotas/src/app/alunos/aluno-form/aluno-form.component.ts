import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlunosService } from '../alunos.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/guards/form-can-deactivate';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css'],
})
export class AlunoFormComponent
  implements IFormCanDeactivate, OnInit, OnDestroy
{
  constructor(
    private alunosService: AlunosService,
    private activatedRoute: ActivatedRoute
  ) {}

  paramsSubscription: Subscription | undefined;
  id: number = 0;
  aluno: Aluno = new Aluno();
  formMudou: boolean = false;

  onInput() {
    this.formMudou = true;
  }

  podeDesativar(): boolean {
    return this.formMudou;
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.aluno = this.alunosService.getAluno(this.id) ?? new Aluno();
    });
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
}
